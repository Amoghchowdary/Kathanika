import { Bot, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { withBasePath } from "@/lib/base-path";
const FAQ=[
  ["services","Kathanika works across content strategy, reels, podcasts, YouTube, production, distribution, IP development, brand building and personal branding."],
  ["course","The video editing course is ₹5,000, runs for 5 weeks with 2 classes per week (10 sessions), and covers CapCut, Premiere Pro and DaVinci Resolve."],
  ["career","Use the Career Inquiry page for creator, editorial, production and media opportunities."],
  ["business","Use Business Inquiry for brand, production or media-property requirements."],
] as const;
export function FaqAssistant(){const[open,setOpen]=useState(false);const[answer,setAnswer]=useState("Choose a common question below. For anything specific, the Kathanika team can take over."); return <div className="v71-faq-assistant"><button className="v71-faq-launch" type="button" onClick={()=>setOpen(!open)} aria-label="Open Kathanika FAQ assistant">{open?<X/>:<MessageCircle/>}<span>Ask Kathanika</span></button>{open?<div className="v71-faq-panel"><div className="v71-faq-head"><Bot/><div><strong>Kathanika Assistant</strong><span>Quick answers · human handoff available</span></div></div><p>{answer}</p><div className="v71-faq-actions">{FAQ.map(([key,text])=><button key={key} type="button" onClick={()=>setAnswer(text)}>{key.charAt(0).toUpperCase()+key.slice(1)}</button>)}</div><div className="v71-faq-handoff"><a href={withBasePath('/contact')}>Business inquiry</a><a href={withBasePath('/creators')}>Career inquiry</a><a href={withBasePath('/courses')}>Course inquiry</a></div></div>:null}</div>}
