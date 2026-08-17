import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useState } from "react";

import { InquiryModal } from "@/components/site/InquiryModal";
import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { useContent } from "@/content/store";

const title = "Career Inquiry — Kathanika Media";
const description = "Come build what people will watch next.";

export const Route = createFileRoute("/creators")({
  head: () => ({ meta: [{ title }, { name: "description", content: description }] }),
  component: CareerInquiryPage,
});

function CareerInquiryPage() {
  const { addEnquiry } = useContent();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const close = useCallback(() => setOpen(false), []);

  return (
    <SiteLayout>
      <PageHead eyebrow="Career Inquiry" title="Come build what people will watch next." intro="Creators, writers, editors, researchers, designers, producers and strategists — bring a point of view and the willingness to build." />

      <section className="v41-inquiry-intro">
        <div className="v41-inquiry-tags">
          {["Creators", "Writers", "Editors", "Researchers", "Designers", "Producers", "Strategists"].map((role) => <span key={role}>{role}</span>)}
        </div>
        <div className="v41-inquiry-closed-card">
          <span>Career form</span>
          <h2>Your point of view matters more than your job title.</h2>
          <p>The application stays closed until you choose to open it. No permanent form wall, no layout break.</p>
          <button type="button" onClick={() => { setState("idle"); setOpen(true); }}>Start Career Inquiry <ArrowUpRight /></button>
        </div>
      </section>

      <InquiryModal open={open} onClose={close} title="Career Inquiry">
        {state === "sent" ? (
          <div className="v41-success"><span>Inquiry received</span><h3>Thank you.</h3><p>The Kathanika team will review your profile and get back to you if there is a fit.</p><button type="button" onClick={close}>Close</button></div>
        ) : (
          <form className="v41-form" onSubmit={async (event) => {
            event.preventDefault();
            if (state === "sending") return;
            const form = event.currentTarget;
            if (!form.reportValidity()) return;
            const fd = new FormData(form);
            setState("sending"); setError("");
            try {
              const profileUrl = String(fd.get("profileUrl") ?? "").trim();
              await addEnquiry({
                inquiryType: "career",
                name: String(fd.get("name") ?? "").trim(),
                email: String(fd.get("email") ?? "").trim(),
                phone: String(fd.get("phone") ?? "").trim(),
                city: String(fd.get("city") ?? "").trim(),
                company: profileUrl,
                designation: "Creator / Career Inquiry",
                service: "Creator Incubation / Career Inquiry",
                message: String(fd.get("message") ?? "").trim(),
                sourcePage: "/creators",
                website: String(fd.get("website") ?? ""),
                audienceStage: String(fd.get("audience") ?? "").trim(),
                category: "Creator / Talent",
                ...(profileUrl ? { profileUrl } : {}),
              });
              form.reset(); setState("sent");
            } catch (err) {
              setError(err instanceof Error ? err.message : "We could not send your inquiry. Please try again.");
              setState("idle");
            }
          }}>
            <input className="v41-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="v41-form-grid">
              <Field name="name" label="Name" required autoComplete="name" />
              <Field name="email" label="Email" type="email" required autoComplete="email" />
              <Field name="phone" label="Phone" type="tel" required autoComplete="tel" />
              <Field name="city" label="City" required autoComplete="address-level2" />
            </div>
            <Field name="profileUrl" label="Portfolio / Instagram / LinkedIn" type="url" />
            <label className="v41-field"><span>Current stage</span><select name="audience" required defaultValue=""><option value="" disabled>Select your stage</option><option>Starting out</option><option>Under 10K followers/subscribers</option><option>10K–100K followers/subscribers</option><option>100K+ followers/subscribers</option><option>Established creator / public figure</option></select></label>
            <label className="v41-field"><span>What do you want to build with Kathanika?</span><textarea name="message" rows={6} required minLength={10} /></label>
            {error ? <p className="v41-form-error" role="alert">{error}</p> : null}
            <button className="v41-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send Career Inquiry"}<ArrowUpRight /></button>
          </form>
        )}
      </InquiryModal>
    </SiteLayout>
  );
}

function Field({ name, label, type = "text", required = false, autoComplete }: { name: string; label: string; type?: string; required?: boolean; autoComplete?: string }) {
  return <label className="v41-field"><span>{label}</span><input name={name} type={type} required={required} autoComplete={autoComplete} /></label>;
}
