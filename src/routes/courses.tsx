import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Award, CheckCircle2, Clock3, Scissors, Sparkles } from "lucide-react";
import { useState } from "react";

import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { useContent } from "@/content/store";
import { seoHead } from "@/lib/seo";

const COURSE_NAME = "Learn Video Editing from Scratch — Beginner to Pro";

const modules = [
  "Cutting, pacing and storytelling",
  "Reels with auto-captions",
  "Colour correction and lighting fixes",
  "Sound design and effects",
  "Export for YouTube and Instagram",
  "Freelancing, pricing and first clients",
] as const;

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: COURSE_NAME,
  description: "A five-week Kathanika Media video editing course covering CapCut, Adobe Premiere Pro, DaVinci Resolve, storytelling, reels, colour correction, sound, export and freelancing basics.",
  provider: { "@type": "Organization", name: "Kathanika Media", url: "https://www.kathanika.in/" },
  educationalLevel: "Beginner to Pro",
  timeRequired: "P5W",
  offers: { "@type": "Offer", price: "5000", priceCurrency: "INR", url: "https://www.kathanika.in/courses", availability: "https://schema.org/InStock" },
};

export const Route = createFileRoute("/courses")({
  head: () => seoHead(
    "/courses",
    "Video Editing Course in Hyderabad | Kathanika Media Courses",
    "Learn video editing from scratch with Kathanika Media in Hyderabad. Five weeks, 10 sessions, CapCut, Premiere Pro, DaVinci Resolve, projects and certificate.",
  ),
  component: CoursesPage,
});

function CoursesPage() {
  const { addEnquiry } = useContent();
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  return (
    <SiteLayout>
      <PageHead eyebrow="Courses" title="Learn the craft behind the content." intro="Practical media courses from the team building Kathanika's shows, content systems and production workflows." />

      <section className="v69-course-feature" aria-labelledby="video-editing-course-title">
        <div className="v69-course-intro">
          <div className="v69-course-kicker"><span>01</span><span>Beginner to Pro</span></div>
          <h2 id="video-editing-course-title">Learn Video Editing from Scratch</h2>
          <p className="v69-course-lead">From raw footage to your first paid project. Learn the editing workflow, visual judgement and delivery skills needed to create polished videos for creators, brands, YouTube and Instagram.</p>
        </div>

        <div className="v69-course-tools-block">
          <span className="v69-course-label">Editing software covered</span>
          <div className="v69-course-tools" aria-label="Editing software covered"><span>CapCut</span><span>Premiere Pro</span><span>DaVinci Resolve</span></div>
        </div>

        <div className="v69-course-meta">
          <article><Clock3 aria-hidden="true" /><div><span>Duration</span><strong>5 weeks · 2 classes a week</strong><p>10 sessions · Task after every class</p></div></article>
          <article><Award aria-hidden="true" /><div><span>Certificate</span><strong>Certificate on completion</strong><p>Complete the course and assigned practice work.</p></div></article>
          <article><Sparkles aria-hidden="true" /><div><span>Fee</span><strong>₹5,000</strong><p>One-time course fee</p></div></article>
        </div>

        <div className="v69-course-curriculum">
          <div className="v69-course-section-title"><Scissors aria-hidden="true" /><h3>What you will learn</h3></div>
          <ul>{modules.map((item, index) => <li key={item}><span className="v69-module-number">{String(index + 1).padStart(2, "0")}</span><CheckCircle2 aria-hidden="true" /><span>{item}</span></li>)}</ul>
        </div>
      </section>

      <section className="v70-inquiry-shell v70-course-inquiry" aria-labelledby="course-inquiry-title">
        <div className="v70-inquiry-context">
          <span className="v70-inquiry-eyebrow">Admissions</span>
          <h2 id="course-inquiry-title">Course Inquiry</h2>
          <p>Interested in this course? Send your details here. The inquiry is recorded separately from business and career enquiries so the Kathanika team can respond with the relevant course information.</p>
          <div className="v70-course-summary"><strong>{COURSE_NAME}</strong><span>5 weeks · 10 sessions · ₹5,000</span></div>
        </div>

        <div className="v70-form-panel">
          {state === "sent" ? (
            <div className="v70-inline-success" role="status">
              <CheckCircle2 aria-hidden="true" />
              <span>Course inquiry received</span>
              <h3>Thank you.</h3>
              <p>The Kathanika team will contact you with the relevant course details.</p>
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
                const experienceLevel = String(fd.get("experienceLevel") ?? "").trim();
                const preferredSoftware = String(fd.get("preferredSoftware") ?? "").trim();
                const preferredContact = String(fd.get("preferredContact") ?? "").trim();
                await addEnquiry({
                  inquiryType: "course",
                  name: String(fd.get("name") ?? "").trim(),
                  email: String(fd.get("email") ?? "").trim(),
                  phone: String(fd.get("phone") ?? "").trim(),
                  city: String(fd.get("city") ?? "").trim(),
                  company: "",
                  designation: experienceLevel,
                  service: COURSE_NAME,
                  message: String(fd.get("message") ?? "").trim(),
                  sourcePage: "/courses",
                  website: String(fd.get("website") ?? ""),
                  courseName: COURSE_NAME,
                  experienceLevel,
                  preferredSoftware,
                  preferredContact,
                });
                form.reset();
                setState("sent");
              } catch (err) {
                setError(err instanceof Error ? err.message : "We could not send your course inquiry. Please try again.");
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
              <div className="v41-form-grid">
                <label className="v41-field"><span>Current editing level</span><select name="experienceLevel" required defaultValue=""><option value="" disabled>Select level</option><option>Complete beginner</option><option>Basic editing experience</option><option>Intermediate editor</option><option>Working editor</option></select></label>
                <label className="v41-field"><span>Software you want to learn most</span><select name="preferredSoftware" required defaultValue=""><option value="" disabled>Select software</option><option>CapCut</option><option>Premiere Pro</option><option>DaVinci Resolve</option><option>All three</option><option>Not sure yet</option></select></label>
              </div>
              <label className="v41-field"><span>Preferred contact</span><select name="preferredContact" required defaultValue=""><option value="" disabled>Select contact method</option><option>Phone call</option><option>WhatsApp</option><option>Email</option></select></label>
              <label className="v41-field"><span>What would you like to know about the course?</span><textarea name="message" rows={6} required minLength={10} /></label>
              {error ? <p className="v41-form-error" role="alert">{error}</p> : null}
              <button className="v41-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send Course Inquiry"}<ArrowUpRight /></button>
            </form>
          )}
        </div>
      </section>

      <section className="v69-course-proof" aria-label="Course approach">
        <article><span>Practice-led</span><strong>Tasks after every class</strong><p>Each session is reinforced with hands-on editing practice.</p></article>
        <article><span>Workflow-led</span><strong>Three editing tools</strong><p>Learn how the same editing principles translate across CapCut, Premiere Pro and DaVinci Resolve.</p></article>
        <article><span>Outcome-led</span><strong>From edit to first client</strong><p>The course closes the loop with export, freelancing, pricing and getting started with paid work.</p></article>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
    </SiteLayout>
  );
}

function Field({ name, label, type = "text", required = false, autoComplete }: { name: string; label: string; type?: string; required?: boolean; autoComplete?: string }) {
  return <label className="v41-field"><span>{label}</span><input name={name} type={type} required={required} autoComplete={autoComplete} /></label>;
}
