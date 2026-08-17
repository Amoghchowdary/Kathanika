import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { defaultContent } from "./defaults";
import type { Enquiry, SiteContent } from "./types";
import {
  fetchPublicContent,
  isBackendConfigured,
  submitInquiry,
  type InquirySubmission,
} from "@/lib/api";

type ContentContextValue = {
  content: SiteContent;
  hydrated: boolean;
  backendConnected: boolean;
  refresh: () => Promise<void>;
  addEnquiry: (
    enquiry: Omit<Enquiry, "id" | "timestamp" | "status"> & Partial<InquirySubmission>,
  ) => Promise<{ id: string; timestamp: string }>;
};

const ContentContext = createContext<ContentContextValue | null>(null);

function compactRemote<T extends object>(value: T | undefined): Partial<T> {
  if (!value) return {};
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).filter(([, item]) => item !== undefined && item !== null && item !== ""),
  ) as Partial<T>;
}

function mergeRemoteContent(base: SiteContent, remote: Awaited<ReturnType<typeof fetchPublicContent>>): SiteContent {
  return {
    ...base,
    services: remote.services?.length ? remote.services : base.services,
    topTenChannels: remote.topTenChannels?.length ? remote.topTenChannels : base.topTenChannels,
    social: { ...base.social, ...compactRemote(remote.social) },
    settings: { ...base.settings, ...compactRemote(remote.settings) },
  };
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [hydrated, setHydrated] = useState(false);
  const [backendConnected, setBackendConnected] = useState(false);

  const refresh = useCallback(async () => {
    if (!isBackendConfigured()) {
      setContent(defaultContent);
      setBackendConnected(false);
      setHydrated(true);
      return;
    }

    try {
      const remote = await fetchPublicContent();
      setContent((current) => mergeRemoteContent({ ...defaultContent, ...current }, remote));
      setBackendConnected(true);
    } catch (error) {
      console.warn("Kathanika API unavailable; using bundled production fallback.", error);
      setContent(defaultContent);
      setBackendConnected(false);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const addEnquiry = useCallback<ContentContextValue["addEnquiry"]>(async (enquiry) => {
    const inquiryType: "business" | "career" =
      enquiry.inquiryType ?? (enquiry.sourcePage === "/creators" ? "career" : "business");

    const { profileUrl, platform, audienceStage, category, website, ...baseEnquiry } = enquiry;

    const payload: InquirySubmission = {
      ...baseEnquiry,
      inquiryType,
      ...(profileUrl !== undefined ? { profileUrl } : {}),
      ...(platform !== undefined ? { platform } : {}),
      ...(audienceStage !== undefined ? { audienceStage } : {}),
      ...(category !== undefined ? { category } : {}),
      ...(website !== undefined ? { website } : {}),
    };

    return submitInquiry(payload);
  }, []);

  const value = useMemo(
    () => ({ content, hydrated, backendConnected, refresh, addEnquiry }),
    [content, hydrated, backendConnected, refresh, addEnquiry],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used inside ContentProvider");
  return ctx;
}

export function sortActive<T extends { active: boolean; order: number }>(items: T[]): T[] {
  return items.filter((i) => i.active).sort((a, b) => a.order - b.order);
}
