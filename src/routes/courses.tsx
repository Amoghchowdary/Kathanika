import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Award, Clock3, Laptop, Languages, MonitorPlay, UserRound } from "lucide-react";
import { useState } from "react";
import { PageHead, SiteLayout } from "@/components/site/SiteLayout";
import { useContent } from "@/content/store";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/courses")({
  head: () => seoHead("/courses", "Video Editing Course — Kathanika Media", "Learn video editing from scratch with Kathanika Media. Five weeks, ten sessions, practical assignments and CapCut, Premiere Pro and DaVinci Resolve workflows."),
  component: CoursesPage,
});

function CoursesPage() {
  const { addEnquiry } = useContent();
  const [state,setState]=useState<"idle"|"sending"|"sent">("idle");
  const [error,setError]=useState("");
  return <SiteLayout>
    <PageHead eyebrow="Courses" title="Learn Video Editing from Scratch — Beginner to Pro" intro="A practical five-week editing course built around real workflows, repeat practice and software confidence." />
    <section className="v71-course-shell">
      <div className="v71-course-overview">
        <div className="v71-course-price"><span>Course fee</span><strong>₹5,000</strong><p>5 weeks · 2 classes/week · 10 sessions</p></div>
        <div className="v71-course-facts">
          <article><Clock3/><span>Duration</span><strong>5 weeks / 10 sessions</strong></article>
          <article><MonitorPlay/><span>Software</span><strong>CapCut · Premiere Pro · DaVinci Resolve</strong></article>
          <article><Laptop/><span>Delivery mode</span><strong>To be announced</strong></article>
          <article><Clock3/><span>Class timings</span><strong>To be announced</strong></article>
          <article><Languages/><span>Teaching language</span><strong>To be confirmed</strong></article>
          <article><UserRound/><span>Instructor profile</span><strong>To be announced</strong></article>
        </div>
        <div className="v71-course-learning">
          <span>What you will get</span>
          <h2>Practice after every class, not passive watching.</h2>
          <ul><li>Beginner-to-pro editing workflow</li><li>Hands-on tasks after every class</li><li>Editing across three commonly used tools</li><li>Certificate on successful completion</li><li>Sample student projects will be published once available</li></ul>
          <div className="v71-course-note"><Award/> Course completion certificate included.</div>
        </div>
      </div>
      <div className="v71-course-form-wrap">
        <span>Course Inquiry</span><h2>Ask about the next batch.</h2>
        {state==="sent" ? <div className="v41-success"><span>Inquiry received</span><h3>Thank you.</h3><p>The Kathanika team will contact you with batch details.</p></div> :
        <form className="v41-form" onSubmit={async(e)=>{e.preventDefault(); if(state==="sending") return; const f=e.currentTarget; if(!f.reportValidity()) return; const d=new FormData(f); setState("sending"); setError(""); try { await addEnquiry({ inquiryType:"business", name:String(d.get("name")||"").trim(), email:String(d.get("email")||"").trim(), phone:String(d.get("phone")||"").trim(), company:"Course Applicant", designation:String(d.get("level")||"Student"), city:String(d.get("city")||"").trim(), service:"Course Inquiry — Video Editing", message:`Preferred software: ${String(d.get("software")||"")}. Preferred contact: ${String(d.get("contact")||"")}. Question: ${String(d.get("message")||"")}`, sourcePage:"/courses", website:String(d.get("website")||"") }); f.reset(); setState("sent"); } catch(err){ setError(err instanceof Error?err.message:"We could not send your inquiry. Please try again."); setState("idle"); }}}>
          <input className="v41-honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="v41-form-grid"><Field name="name" label="Name" required/><Field name="email" label="Email" type="email" required/><Field name="phone" label="Phone" type="tel" required/><Field name="city" label="City" required/></div>
          <label className="v41-field"><span>Current editing level</span><select name="level" required defaultValue=""><option value="" disabled>Select level</option><option>Complete beginner</option><option>Beginner</option><option>Intermediate</option></select></label>
          <label className="v41-field"><span>Software you want to learn most</span><select name="software" required defaultValue=""><option value="" disabled>Select software</option><option>CapCut</option><option>Premiere Pro</option><option>DaVinci Resolve</option><option>All three</option></select></label>
          <label className="v41-field"><span>Preferred contact method</span><select name="contact" required defaultValue=""><option value="" disabled>Select contact method</option><option>WhatsApp</option><option>Phone</option><option>Email</option></select></label>
          <label className="v41-field"><span>What would you like to know?</span><textarea name="message" rows={5} required minLength={10}/></label>
          {error?<p className="v41-form-error" role="alert">{error}</p>:null}
          <button className="v41-submit" type="submit" disabled={state==="sending"}>{state==="sending"?"Sending…":"Send Course Inquiry"}<ArrowUpRight/></button>
        </form>}
      </div>
    </section>
  </SiteLayout>
}
function Field({name,label,type="text",required=false}:{name:string;label:string;type?:string;required?:boolean}){return <label className="v41-field"><span>{label}</span><input name={name} type={type} required={required}/></label>}
