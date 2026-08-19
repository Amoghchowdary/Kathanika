import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useState } from "react";

import { InquiryModal } from "@/components/site/InquiryModal";
import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { sortActive, useContent } from "@/content/store";
import { seoHead } from "@/lib/seo";

const title = "Business Inquiry — Kathanika Media";
const description = "Build an audience, not another campaign.";

export const Route = createFileRoute("/contact")({
  head: () => seoHead("/contact", "Business Inquiry — Kathanika Media", "Start a business conversation with Kathanika Media for content IPs, podcasts, YouTube, production, distribution and brand media systems."),
  component: BusinessInquiryPage,
});

function BusinessInquiryPage() {
  const { content, addEnquiry } = useContent();
  const services = sortActive(content.services);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const close = useCallback(() => setOpen(false), []);

  return (
    <SiteLayout>
      <PageHead eyebrow="Business Inquiry" title="Build an audience, not another campaign." intro="For brands, businesses, founders and institutions that want to create content properties people return to." />

      <section className="v41-inquiry-intro business">
        <div className="v41-business-options">
          {["Content IP", "Founder Brand", "YouTube Property", "Podcast", "Always-on Content Engine"].map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></article>)}
        </div>
        <div className="v41-inquiry-closed-card">
          <span>Business form</span>
          <h2>Tell us what has to exist.</h2>
          <p>Start with a format, a business problem, a founder story or a blank page. The form opens only when you are ready.</p>
          <button type="button" onClick={() => { setState("idle"); setOpen(true); }}>Start Business Inquiry <ArrowUpRight /></button>
          <div className="v41-inline-contact"><a href={`mailto:${content.settings.email}`}>{content.settings.email}</a><a href={`tel:${content.settings.phone.replace(/\s/g, "")}`}>{content.settings.phone}</a></div>
        </div>
      </section>

      <InquiryModal open={open} onClose={close} title="Business Inquiry">
        {state === "sent" ? (
          <div className="v41-success"><span>Inquiry received</span><h3>Thank you.</h3><p>The Kathanika team will get back to you shortly.</p><button type="button" onClick={close}>Close</button></div>
        ) : (
          <form className="v41-form" onSubmit={async (event) => {
            event.preventDefault();
            if (state === "sending") return;
            const form = event.currentTarget;
            if (!form.reportValidity()) return;
            const fd = new FormData(form);
            setState("sending"); setError("");
            try {
              await addEnquiry({
                inquiryType: "business",
                name: String(fd.get("name") ?? "").trim(),
                email: String(fd.get("email") ?? "").trim(),
                phone: String(fd.get("phone") ?? "").trim(),
                company: String(fd.get("company") ?? "").trim(),
                designation: String(fd.get("designation") ?? "").trim(),
                city: String(fd.get("city") ?? "").trim(),
                service: String(fd.get("service") ?? "Business Inquiry").trim(),
                message: String(fd.get("message") ?? "").trim(),
                sourcePage: "/contact",
                website: String(fd.get("website") ?? ""),
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
              <Field name="email" label="Work Email" type="email" required autoComplete="email" />
              <Field name="phone" label="Phone" type="tel" required autoComplete="tel" />
              <Field name="company" label="Company / Organisation" required autoComplete="organization" />
              <Field name="designation" label="Designation" required autoComplete="organization-title" />
              <Field name="city" label="City" required autoComplete="address-level2" />
            </div>
            <label className="v41-field"><span>What do you want to build?</span><select name="service" required defaultValue=""><option value="" disabled>Select a capability</option>{services.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}</select></label>
            <label className="v41-field"><span>Project brief</span><textarea name="message" rows={7} required minLength={10} /></label>
            {error ? <p className="v41-form-error" role="alert">{error}</p> : null}
            <button className="v41-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send Business Inquiry"}<ArrowUpRight /></button>
          </form>
        )}
      </InquiryModal>
    </SiteLayout>
  );
}

function Field({ name, label, type = "text", required = false, autoComplete }: { name: string; label: string; type?: string; required?: boolean; autoComplete?: string }) {
  return <label className="v41-field"><span>{label}</span><input name={name} type={type} required={required} autoComplete={autoComplete} /></label>;
}
