import { Bot, ChevronDown, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { withBasePath } from "@/lib/base-path";

const FAQ = [
  ["services", "Kathanika works across content strategy, reels, podcasts, YouTube, production, distribution, IP development, brand building and personal branding."],
  ["course", "The video editing course is ₹5,000, runs for 5 weeks with 2 classes per week (10 sessions), and covers CapCut, Premiere Pro and DaVinci Resolve."],
  ["career", "Use the Career Inquiry page for creator, editorial, production and media opportunities."],
  ["business", "Use Business Inquiry for brand, production or media-property requirements."],
] as const;

export function FaqAssistant() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof FAQ)[number][0] | null>(null);
  const [answer, setAnswer] = useState("Choose a common question below. For anything specific, the Kathanika team can take over.");

  return (
    <div className={`v71-faq-assistant ${open ? "is-open" : ""}`}>
      <button
        className="v71-faq-launch v79-faq-launch"
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close Kathanika assistant" : "Open Kathanika assistant"}
        aria-expanded={open}
      >
        {open ? <X /> : <MessageCircle />}
        <span><strong>Ask Kathanika</strong><small>Quick answers</small></span>
        <ChevronDown className="v79-faq-chevron" aria-hidden="true" />
      </button>

      {open ? (
        <div className="v71-faq-panel v79-faq-panel">
          <div className="v71-faq-head">
            <Bot />
            <div><strong>Kathanika Assistant</strong><span>Quick answers · human handoff available</span></div>
          </div>

          <p>{answer}</p>

          <div className="v71-faq-actions v79-faq-actions" aria-label="Quick questions">
            {FAQ.map(([key, text]) => (
              <button
                key={key}
                type="button"
                className={selected === key ? "is-selected" : ""}
                onClick={() => { setSelected(key); setAnswer(text); }}
              >
                <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </div>

          <div className="v71-faq-handoff v79-faq-handoff">
            <a href={withBasePath('/contact')}>Business inquiry</a>
            <a href={withBasePath('/creators')}>Career inquiry</a>
            <a href={withBasePath('/courses')}>Course inquiry</a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
