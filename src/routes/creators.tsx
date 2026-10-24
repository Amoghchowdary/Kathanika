import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { useContent } from "@/content/store";
import { seoHead } from "@/lib/seo";

const roles = [
  "Video Editor",
  "Content Writer",
  "Researcher",
  "Graphic / Motion Designer",
  "Producer",
  "Social Media / Distribution",
  "Content Strategist",
  "Operations / Coordination",
  "Other",
] as const;

export const Route = createFileRoute("/creators")({
  head: () => seoHead(
    "/creators",
    "Career Inquiry — Kathanika Media",
    "Apply for creator, editorial, production, design, distribution and media opportunities with Kathanika Media in Hyderabad.",
  ),
  component: CareerInquiryPage,
});

function CareerInquiryPage() {
  const { addEnquiry } = useContent();
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  return (
    <SiteLayout>
      <PageHead
        eyebrow="Career Inquiry"
        title="Come build what people will watch next."
        intro="Creators, writers, editors, researchers, designers, producers and strategists — bring a point of view, strong craft and the willingness to build."
      />

      <section className="v70-inquiry-shell" aria-labelledby="career-inquiry-title">
        <div className="v70-inquiry-context">
          <span className="v70-inquiry-eyebrow">Work with Kathanika</span>
          <h2 id="career-inquiry-title">Career Inquiry</h2>
          <p>Tell us where your craft is strongest, what you have worked on and where you want to grow. This form goes directly to Kathanika&apos;s inquiry backend.</p>
          <div className="v70-role-cloud" aria-label="Career areas">
            {roles.slice(0, 8).map((role) => <span key={role}>{role}</span>)}
          </div>
          <div className="v70-inquiry-note"><BriefcaseBusiness aria-hidden="true" /><p>A portfolio or profile link is helpful, but it is not mandatory for every role.</p></div>
        </div>

        <div className="v70-form-panel">
          {state === "sent" ? (
            <div className="v70-inline-success" role="status">
              <CheckCircle2 aria-hidden="true" />
              <span>Career inquiry received</span>
              <h3>Thank you.</h3>
              <p>The Kathanika team will review your application and contact you if there is a relevant fit.</p>
              <button type="button" onClick={() => setState("idle")}>Submit another inquiry</button>
            </div>
          ) : (
            <form className="v41-form" onSubmit={async (event) => {
              event.preventDefault();
              if (state === "sending") return;
              const form = event.currentTarget;
              if (!form.reportValidity()) return;
              const fd = new FormData(form);
              setState("sending");
              setError("");
              try {
                const role = String(fd.get("role") ?? "").trim();
                const experienceLevel = String(fd.get("experienceLevel") ?? "").trim();
                const portfolioUrl = String(fd.get("portfolioUrl") ?? "").trim();
                const availability = String(fd.get("availability") ?? "").trim();
                await addEnquiry({
                  inquiryType: "career",
                  name: String(fd.get("name") ?? "").trim(),
                  email: String(fd.get("email") ?? "").trim(),
                  phone: String(fd.get("phone") ?? "").trim(),
                  city: String(fd.get("city") ?? "").trim(),
                  company: portfolioUrl,
                  designation: role,
                  service: "Career Inquiry",
                  message: String(fd.get("message") ?? "").trim(),
                  sourcePage: "/creators",
                  website: String(fd.get("website") ?? ""),
                  role,
                  experienceLevel,
                  portfolioUrl,
                  availability,
                });
                form.reset();
                setState("sent");
              } catch (err) {
                setError(err instanceof Error ? err.message : "We could not send your career inquiry. Please try again.");
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
              <label className="v41-field"><span>Role / area of interest</span><select name="role" required defaultValue=""><option value="" disabled>Select a role</option>{roles.map((role) => <option key={role}>{role}</option>)}</select></label>
              <div className="v41-form-grid">
                <label className="v41-field"><span>Experience level</span><select name="experienceLevel" required defaultValue=""><option value="" disabled>Select experience</option><option>Fresher / starting out</option><option>Less than 1 year</option><option>1–3 years</option><option>3–5 years</option><option>5+ years</option></select></label>
                <label className="v41-field"><span>Availability</span><select name="availability" required defaultValue=""><option value="" disabled>Select availability</option><option>Immediately</option><option>Within 2 weeks</option><option>Within 1 month</option><option>Exploring opportunities</option></select></label>
              </div>
              <Field name="portfolioUrl" label="Portfolio / LinkedIn / profile URL (optional)" type="url" />
              <label className="v41-field"><span>Tell us about your work and why you want to join Kathanika</span><textarea name="message" rows={7} required minLength={20} /></label>
              {error ? <p className="v41-form-error" role="alert">{error}</p> : null}
              <button className="v41-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send Career Inquiry"}<ArrowUpRight /></button>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ name, label, type = "text", required = false, autoComplete }: { name: string; label: string; type?: string; required?: boolean; autoComplete?: string }) {
  return <label className="v41-field"><span>{label}</span><input name={name} type={type} required={required} autoComplete={autoComplete} /></label>;
}
