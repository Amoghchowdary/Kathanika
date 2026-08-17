import type { Enquiry, ServiceItem, SiteSettings, SocialLinks, TopTenChannel } from "@/content/types";

const API_URL = (import.meta.env["VITE_KATHANIKA_API_URL"] || "").trim();
const API_TIMEOUT_MS = 10_000;

export type PublicContentPayload = {
  settings?: Partial<SiteSettings>;
  social?: Partial<SocialLinks>;
  services?: ServiceItem[];
  topTenChannels?: TopTenChannel[];
};

type ApiEnvelope<T> = {
  ok: boolean;
  data?: T;
  error?: string;
  requestId?: string;
};

export type InquirySubmission = Omit<Enquiry, "id" | "timestamp" | "status"> & {
  inquiryType: "business" | "career";
  profileUrl?: string;
  platform?: string;
  audienceStage?: string;
  category?: string;
  website?: string;
};

function withTimeout(): { signal: AbortSignal; clear: () => void } {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), API_TIMEOUT_MS);
  return { signal: controller.signal, clear: () => window.clearTimeout(timer) };
}

async function parseEnvelope<T>(response: Response): Promise<T> {
  const envelope = (await response.json()) as ApiEnvelope<T>;
  if (!response.ok || !envelope.ok || envelope.data === undefined) {
    throw new Error(envelope.error || `Request failed (${response.status})`);
  }
  return envelope.data;
}

export function isBackendConfigured() {
  return Boolean(API_URL);
}

export async function fetchPublicContent(): Promise<PublicContentPayload> {
  if (!API_URL) throw new Error("Backend is not configured");
  const { signal, clear } = withTimeout();
  try {
    const url = new URL(API_URL);
    url.searchParams.set("action", "content");
    url.searchParams.set("v", "30");
    const response = await fetch(url.toString(), {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      signal,
    });
    return await parseEnvelope<PublicContentPayload>(response);
  } finally {
    clear();
  }
}

export async function submitInquiry(payload: InquirySubmission): Promise<{ id: string; timestamp: string }> {
  if (!API_URL) throw new Error("Inquiry backend is not configured");
  const { signal, clear } = withTimeout();
  try {
    // text/plain keeps the request in the CORS "simple request" class, avoiding
    // a browser OPTIONS preflight that Apps Script web apps do not expose.
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({
        action: payload.inquiryType === "career" ? "careerInquiry" : "businessInquiry",
        payload,
      }),
      redirect: "follow",
      cache: "no-store",
      credentials: "omit",
      signal,
    });
    return await parseEnvelope<{ id: string; timestamp: string }>(response);
  } finally {
    clear();
  }
}
