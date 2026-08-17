import { createFileRoute } from "@tanstack/react-router";
import { Clapperboard, Lightbulb, Megaphone } from "lucide-react";
import { useState } from "react";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { useContent } from "@/content/store";

const title = "Career Inquiry — Creator Incubation — Kathanika Media";
const description =
  "For creators who want to turn an idea, voice or channel into a repeatable media property with strategy, production, coaching, distribution and IP development.";

const incubation = [
  {
    title: "Format & IP Development",
    body: "Shape the idea, positioning and repeatable format so the creator is building intellectual property, not just individual posts.",
    icon: Lightbulb,
  },
  {
    title: "Production & Post",
    body: "Shooting, direction, editing and packaging built around a consistent publishing system.",
    icon: Clapperboard,
  },
  {
    title: "Coaching & Distribution",
    body: "Creator coaching, channel strategy and distribution support designed to build an audience around the work.",
    icon: Megaphone,
  },
] as const;

export const Route = createFileRoute("/creators")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CareerInquiryPage,
});

function CareerInquiryPage() {
  const { addEnquiry } = useContent();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  return (
    <SiteLayout>
      <PageHead eyebrow="Career Inquiry" title="Creator incubation at Kathanika." intro={description} />

      <section className="border-b-2 border-border/70 px-5 py-14 sm:px-8 lg:py-20">
        <div className="mx-auto grid max-w-[1600px] gap-5 md:grid-cols-3">
          {incubation.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="incubation-card p-7 sm:p-8">
                <span className="incubation-card-icon" aria-hidden="true">
                  <Icon className="size-6" strokeWidth={1.8} />
                </span>
                <h2 className="mt-7 font-display text-2xl font-semibold tracking-tight">{item.title}</h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 lg:py-24">
        <div>
          <p className="text-[11px] tracking-[0.24em] text-muted-foreground uppercase">For creators</p>
          <h2 className="mt-4 max-w-xl font-display text-[clamp(2rem,5vw,4rem)] leading-[0.98] font-semibold tracking-tight">
            Tell us what you want to become known for.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
            Share your current channel or profile, where you are in your creator journey, and what you want Kathanika to help you build.
          </p>
        </div>

        {sent ? (
          <div className="max-w-2xl border-t border-border/60 pt-7 lg:border-t-0 lg:pt-0">
            <p className="font-display text-3xl font-semibold">Inquiry received.</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The Kathanika team will review your creator profile and reach out if there is a fit for incubation or collaboration.
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
              const platform = String(fd.get("platform") ?? "").trim();
              const profile = String(fd.get("profile") ?? "").trim();
              const audience = String(fd.get("audience") ?? "").trim();
              const category = String(fd.get("category") ?? "Creator").trim();
              const message = String(fd.get("message") ?? "").trim();

              setSending(true);
              setError("");
              try {
                await addEnquiry({
                  inquiryType: "career",
                  name: String(fd.get("name") ?? "").trim(),
                  email: String(fd.get("email") ?? "").trim(),
                  phone: String(fd.get("phone") ?? "").trim(),
                  company: profile,
                  designation: category,
                  city: String(fd.get("city") ?? "").trim(),
                  service: "Creator Incubation / Career Inquiry",
                  message,
                  sourcePage: "/creators",
                  profileUrl: profile,
                  platform,
                  audienceStage: audience,
                  category,
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
                { name: "name", label: "Name", type: "text", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "phone", label: "Phone", type: "tel", required: true },
                { name: "city", label: "City", type: "text", required: true },
                { name: "category", label: "Creator Category", type: "text", required: true },
                { name: "platform", label: "Primary Platform", type: "text", required: true },
              ].map((f) => (
                <label key={f.name} className="block">
                  <span className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    {f.label}
                  </span>
                  <input
                    required={f.required}
                    name={f.name}
                    type={f.type}
                    className="mt-2 h-12 w-full rounded-[14px] border-2 border-border/80 bg-transparent px-4 text-sm text-foreground outline-none transition-colors focus:border-foreground"
                  />
                </label>
              ))}
            </div>

            <label className="block">
              <span className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                Channel / Profile URL
              </span>
              <input
                name="profile"
                type="url"
                required
                placeholder="https://"
                className="mt-2 h-12 w-full rounded-[14px] border-2 border-border/80 bg-transparent px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground"
              />
            </label>

            <label className="block">
              <span className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                Current Audience Stage
              </span>
              <select
                name="audience"
                required
                defaultValue=""
                className="mt-2 h-12 w-full rounded-[14px] border-2 border-border/80 bg-background px-4 text-sm text-foreground outline-none transition-colors focus:border-foreground"
              >
                <option value="" disabled>Select your current stage</option>
                <option value="Starting out">Starting out</option>
                <option value="Under 10K followers/subscribers">Under 10K followers/subscribers</option>
                <option value="10K–100K followers/subscribers">10K–100K followers/subscribers</option>
                <option value="100K+ followers/subscribers">100K+ followers/subscribers</option>
                <option value="Established creator / public figure">Established creator / public figure</option>
              </select>
            </label>

            <label className="block">
              <span className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                What do you want to build with Kathanika?
              </span>
              <textarea
                name="message"
                rows={6}
                required
                className="mt-2 w-full rounded-[14px] border-2 border-border/80 bg-transparent p-4 text-sm text-foreground outline-none transition-colors focus:border-foreground"
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
              {sending ? "Sending…" : "Send Career Inquiry"}
            </button>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}
