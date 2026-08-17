import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";

export function InquiryModal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="v41-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="v41-modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="v41-modal-head">
          <div><span>Inquiry form</span><h2>{title}</h2></div>
          <button type="button" onClick={onClose} aria-label="Close inquiry form"><X /></button>
        </div>
        <div className="v41-modal-body">{children}</div>
      </section>
    </div>
  );
}
