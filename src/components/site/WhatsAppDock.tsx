import { MessageCircle } from "lucide-react";

import { useContent } from "@/content/store";
import { whatsappHref } from "@/lib/site";

export function WhatsAppDock() {
  const { content } = useContent();

  return (
    <a
      href={whatsappHref(content.settings.whatsappNumber)}
      target="_blank"
      rel="noreferrer"
      className="fixed right-4 bottom-4 z-40 flex h-12 items-center gap-2 rounded-full border border-border bg-background/85 px-4 text-[12px] font-medium tracking-[0.08em] text-foreground uppercase backdrop-blur-xl transition-colors hover:bg-secondary sm:right-6 sm:bottom-6"
    >
      <MessageCircle className="size-4" strokeWidth={1.75} />
      Talk to Kathanika
    </a>
  );
}