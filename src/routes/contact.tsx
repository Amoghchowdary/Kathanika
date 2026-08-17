import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { sortActive, useContent } from "@/content/store";
import { whatsappHref } from "@/lib/site";

const title = "Business Inquiry — Kathanika Media";
const description =
  "For brands, businesses, founders and institutions looking to build content, media properties or ongoing production systems with Kathanika Media.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { content, addEnquiry } = useContent();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const services = sortActive(content.services);

  return (
    <SiteLayout>
      <PageHead eyebrow="Business Inquiry" title="Build with Kathanika." intro={description} />
      <section className="mx-auto grid max-w-[1600px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:py-24">
        {sent ? (
          <div className="max-w-2xl" role="status" aria-live="polite">
            <p className="font-display text-3xl font-semibold">Thank you.</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Your business inquiry is with the Kathanika team. We&apos;ll get back to you shortly.
            </p>
          </div>
        ) : (
          <form
            className="space-y-5"
            noValidate
            onSubmit={async (e) => {
              e.preventDefault();
              if (sending) return;
              const form = e.currentTarget;
              if (!form.reportValidity()) return;

              const fd = new FormData(form);
              setSending(true);
              setError("");
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
                setSent(true);
                form.reset();
              } catch (err) {
                setError(err instanceof Error ? err.message : "We could not send your inquiry. Please try again.");
              } finally {
                setSending(false);
              }
            }}
          >
            <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
              <label>
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
                { name: "email", label: "Work Email", type: "email", required: true, autoComplete: "email" },
                { name: "phone", label: "Phone", type: "tel", required: false, autoComplete: "tel" },
                { name: "company", label: "Company / Organisation", type: "text", required: true, autoComplete: "organization" },
                { name: "designation", label: "Designation", type: "text", required: true, autoComplete: "organization-title" },
                { name: "city", label: "City", type: "text", required: true, autoComplete: "address-level2" },
              ].map((f) => (
                <label key={f.name} className="block">
                  <span className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    {f.label}
                  </span>
                  <input
                    required={f.required}
                    name={f.name}
                    type={f.type}
                    autoComplete={f.autoComplete}
                    minLength={f.name === "name" ? 2 : undefined}
                    maxLength={f.name === "company" ? 120 : 100}
                    className="mt-2 h-12 w-full rounded-sm border border-border bg-transparent px-4 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                  />
                </label>
              ))}
            </div>

            <label className="block">
              <span className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">Service</span>
              <select
                name="service"
                required
                defaultValue=""
                className="mt-2 h-12 w-full rounded-sm border border-border bg-background px-4 text-sm text-foreground outline-none transition-colors focus:border-foreground"
              >
                <option value="" disabled>Select what you need</option>
                {services.map((service) => (
                  <option key={service.id} value={service.title}>{service.title}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                Tell us what you want to build
              </span>
              <textarea
                name="message"
                rows={6}
                required
                minLength={10}
                maxLength={3000}
                className="mt-2 w-full rounded-sm border border-border bg-transparent p-4 text-sm text-foreground outline-none transition-colors focus:border-foreground"
              />
            </label>

            {error ? (
              <p className="text-sm text-red-300" role="alert">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={sending}
              className="h-12 rounded-full bg-primary px-7 text-[12px] font-semibold tracking-[0.1em] text-primary-foreground uppercase transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-60"
            >
              {sending ? "Sending…" : "Send Business Inquiry"}
            </button>
          </form>
        )}

        <aside className="self-start border-t border-border/60 pt-7 text-sm text-muted-foreground lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          <p className="text-[11px] tracking-[0.22em] uppercase">Kathanika Media Office</p>
          <p className="mt-5 max-w-md leading-7 text-foreground/80">{content.settings.addressLine}</p>
          <div className="mt-7 grid gap-3">
            <a href={`tel:${content.settings.phone.replace(/\s/g, "")}`} className="text-foreground underline-offset-4 hover:underline">
              {content.settings.phone}
            </a>
            <a href={`mailto:${content.settings.email}`} className="text-foreground underline-offset-4 hover:underline">
              {content.settings.email}
            </a>
            <a
              href={whatsappHref(content.settings.whatsappNumber, "Hi Kathanika — I have a business inquiry.")}
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              WhatsApp Kathanika
            </a>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}
