import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Clapperboard,
  Compass,
  Film,
  Lightbulb,
  MapPin,
  Mic2,
  Newspaper,
  Play,
  Scissors,
  Send,
  Share2,
  Sparkles,
  TrendingUp,
  Upload,
  UserRound,
  UsersRound,
  Video,
  Youtube,
} from "lucide-react";

import { Reveal } from "./Reveal";
import { images } from "@/content/defaults";
import { sortActive, useContent } from "@/content/store";
import { openExternal } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  className,
}: {
  eyebrow?: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-4xl", className)}>
      {eyebrow ? (
        <p className="text-[11px] tracking-[0.28em] text-muted-foreground uppercase">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-display text-[clamp(1.75rem,5.5vw,3.5rem)] leading-[0.98] font-semibold">
        {title}
      </h2>
    </div>
  );
}

/* ---------------------------------- Editorial media wall --------------------------------- */

export function EditorialGrid() {
  const { content } = useContent();
  const feature = sortActive(content.originalIps)[4] ?? sortActive(content.originalIps)[0];

  const cards = [
    {
      title: "Creator Incubation",
      copy: "Ideas turned into intellectual property.",
      image: images.editCreator,
      to: "/creators",
    },
    {
      title: "Content for Brands",
      copy: "Expertise turned into audience.",
      image: images.editBrand,
      to: "/brands",
    },
    {
      title: "Latest Production",
      copy: "Shot across five cities this quarter.",
      image: images.hero3,
      to: "/work",
    },
    {
      title: "Podcast as a Service",
      copy: "Studio, edit, publish, distribute.",
      image: images.editPost,
      to: "/services",
    },
  ];

  if (!feature) return null;

  return (
    <section className="border-t border-border/60 px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[1.5fr_1fr] lg:gap-5">
        <Reveal className="group relative overflow-hidden rounded-sm">
          <button
            type="button"
            onClick={() => openExternal(feature.youtubeUrl)}
            className="block h-full w-full text-left"
          >
            <img
              src={feature.still}
              alt={feature.title}
              width={1280}
              height={720}
              loading="lazy"
              className="h-full min-h-[320px] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03] lg:min-h-[560px]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
              <span className="text-[11px] tracking-[0.28em] text-foreground/70 uppercase">
                Original IP
              </span>
              <span className="mt-3 block max-w-xl font-display text-[clamp(1.5rem,4vw,2.75rem)] leading-tight font-semibold">
                {feature.title}
              </span>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[11px] font-semibold tracking-[0.1em] text-primary-foreground uppercase">
                <Play className="size-3 fill-current" /> Watch Episode
              </span>
            </span>
          </button>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 80} className="group relative overflow-hidden rounded-sm">
              <Link to={card.to} className="block h-full">
                <img
                  src={card.image}
                  alt={card.title}
                  width={1000}
                  height={1000}
                  loading="lazy"
                  className="h-full min-h-[190px] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] lg:min-h-[270px]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="block font-display text-lg leading-tight font-semibold">
                    {card.title}
                  </span>
                  <span className="mt-1 block text-xs text-foreground/65">{card.copy}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------- Manifesto ----------------------------------------- */

export function Manifesto() {
  const words = ["Audiences.", "Authority.", "Distribution.", "Intellectual property."];
  return (
    <section className="border-t border-border/60 px-5 py-20 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="max-w-3xl font-display text-[clamp(1.25rem,3vw,2rem)] leading-tight text-muted-foreground">
            We don&apos;t just produce content.
          </p>
        </Reveal>
        <div className="mt-8 space-y-1">
          {words.map((w, i) => (
            <Reveal key={w} delay={i * 140}>
              <p className="font-display text-[clamp(2.25rem,10vw,7.5rem)] leading-[0.92] font-semibold">
                <span className="text-muted-foreground/40">We build </span>
                {w}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------- Ecosystems ---------------------------------------- */

const ecosystems = [
  {
    number: "01",
    title: "For Creators",
    line: "Turn ideas into intellectual property.",
    items: [
      "Strategy",
      "Shooting",
      "Editing",
      "Coaching",
      "Production",
      "Social media",
      "Distribution",
      "Collaborations",
      "IP development",
    ],
    cta: "Build Your IP",
    to: "/creators",
    image: images.editCreator,
  },
  {
    number: "02",
    title: "For Brands & Leaders",
    line: "Turn expertise into audience.",
    items: [
      "Content strategy",
      "Production",
      "Social media",
      "Content calendars",
      "Podcasts",
      "YouTube",
      "Reels",
      "Distribution",
      "Personal branding",
    ],
    cta: "Build Your Content Ecosystem",
    to: "/brands",
    image: images.editBrand,
  },
] as const;

export function Ecosystems() {
  return (
    <section className="border-t border-border/60">
      {ecosystems.map((eco, i) => (
        <div
          key={eco.number}
          className={cn(
            "grid items-stretch border-b border-border/60 lg:grid-cols-2",
            i % 2 === 1 && "lg:[&>div:first-child]:order-2",
          )}
        >
          <div className="relative min-h-[280px] lg:min-h-[560px]">
            <img
              src={eco.image}
              alt={eco.title}
              width={1000}
              height={1000}
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/35 to-background/10" />
          </div>
          <div className="flex flex-col justify-center px-5 py-14 sm:px-8 lg:px-16 lg:py-20">
            <Reveal>
              <p className="font-display text-5xl font-semibold text-muted-foreground/40">
                {eco.number}
              </p>
              <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.5rem)] leading-none font-semibold">
                {eco.title}
              </h2>
              <p className="mt-4 text-lg text-foreground/75">{eco.line}</p>
              <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2">
                {eco.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to={eco.to}
                className="mt-10 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-primary px-6 text-[12px] font-semibold tracking-[0.1em] text-primary-foreground uppercase transition-opacity hover:opacity-85"
              >
                {eco.cta} <ArrowRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ------------------------------------ Philosophy ----------------------------------------- */

export function Philosophy() {
  const eras = ["Print", "Television", "Social media", "The content economy"];
  const outcomes = [
    "Generate leads",
    "Build authority",
    "Attract talent",
    "Develop credibility",
    "Create awareness",
    "Tell meaningful stories",
    "Build their own audiences",
  ];

  return (
    <section className="border-t border-border/60 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <h2 className="max-w-3xl font-display text-[clamp(1.75rem,5vw,3.25rem)] leading-tight font-semibold">
            Every generation has had its medium of trust.
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {eras.map((era, i) => (
            <li key={era} className="bg-background p-6 lg:p-8">
              <span className="text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
                {`0${i + 1}`}
              </span>
              <p className="mt-4 font-display text-xl leading-tight font-semibold lg:text-2xl">
                {era}
              </p>
            </li>
          ))}
        </ol>

        <Reveal className="mt-16">
          <p className="font-display text-[clamp(2rem,7vw,5rem)] leading-[0.95] font-semibold">
            Today,
            <br />
            content builds trust.
          </p>
        </Reveal>

        <ul className="mt-12 flex flex-wrap gap-x-3 gap-y-3">
          {outcomes.map((o) => (
            <li
              key={o}
              className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
            >
              {o}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------- Services ------------------------------------------ */

const serviceIcons = {
  "s-1": Newspaper,
  "s-2": Film,
  "s-3": Mic2,
  "s-4": Youtube,
  "s-5": Clapperboard,
  "s-6": Share2,
  "s-7": TrendingUp,
  "s-8": Lightbulb,
  "s-9": Sparkles,
  "s-10": UserRound,
} as const;

export function ServicesWall({ title = "Everything content." }: { title?: string }) {
  const { content } = useContent();
  const services = sortActive(content.services);

  return (
    <section className="border-t-2 border-border/70 px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1600px]">
        <SectionTitle eyebrow="What we build" title={title} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((s) => {
            const Icon = serviceIcons[s.id as keyof typeof serviceIcons] ?? BadgeCheck;
            return (
              <li key={s.id} className="group min-w-0">
                <Link
                  to="/contact"
                  className="service-card flex h-full min-h-[220px] flex-col justify-between p-6 sm:p-7 lg:min-h-[250px] lg:p-8"
                >
                  <span>
                    <span className="service-card-icon" aria-hidden="true">
                      <Icon className="size-6" strokeWidth={1.8} />
                    </span>
                    <span className="mt-7 block font-display text-[clamp(1.2rem,2.2vw,1.7rem)] leading-tight font-semibold transition-colors group-hover:text-accent">
                      {s.title}
                    </span>
                    <span className="mt-4 block max-w-md text-sm leading-6 text-muted-foreground">
                      {s.description}
                    </span>
                  </span>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-[11px] tracking-[0.18em] text-muted-foreground uppercase transition-colors group-hover:text-foreground">
                    Explore <ArrowRight className="size-3" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------- Lifecycle ----------------------------------------- */

const lifecycle = [
  { label: "Strategy", icon: Compass },
  { label: "Pre-production", icon: Lightbulb },
  { label: "Production", icon: Video },
  { label: "Post-production", icon: Scissors },
  { label: "Publishing", icon: Upload },
  { label: "Distribution", icon: Send },
  { label: "Audience growth", icon: UsersRound },
] as const;

export function Lifecycle() {
  return (
    <section className="border-t-2 border-border/70 px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <h2 className="max-w-2xl font-display text-[clamp(1.75rem,5vw,3.25rem)] leading-tight font-semibold">
            From the first idea
            <br />
            to the final audience.
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 xl:grid-cols-3">
          {lifecycle.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.label} className="lifecycle-card group">
                <span className="lifecycle-card-icon" aria-hidden="true">
                  <Icon className="size-5" strokeWidth={1.9} />
                </span>
                <span className="text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-8 block font-display text-[clamp(1.35rem,3vw,2.1rem)] leading-none font-medium transition-colors group-hover:text-accent">
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------ Original IPs --------------------------------------- */

export function IpPosterRow({ heading = true }: { heading?: boolean }) {
  const { content } = useContent();
  const ips = sortActive(content.originalIps);

  return (
    <section className="border-t border-border/60 py-16 lg:py-24">
      {heading ? (
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
          <SectionTitle eyebrow="Original IPs" title="We build our own IP." />
          <p className="mt-5 max-w-xl text-base text-muted-foreground">
            That is why we understand how to build yours.
          </p>
        </div>
      ) : null}

      <ul className="rail mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:gap-6">
        {ips.map((ip) => (
          <li key={ip.id} className="w-[62vw] shrink-0 snap-start sm:w-[36vw] lg:w-[21vw]">
            <button
              type="button"
              onClick={() => openExternal(ip.youtubeUrl)}
              className="group block w-full overflow-hidden rounded-sm text-left"
              aria-label={`Watch ${ip.title}`}
            >
              <span className="relative block overflow-hidden">
                <img
                  src={ip.poster}
                  alt={ip.title}
                  width={800}
                  height={1200}
                  loading="lazy"
                  className="aspect-[2/3] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
              </span>
              <span className="mt-4 block font-display text-lg leading-tight font-semibold">
                {ip.title}
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">{ip.category}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ------------------------------------ Proof of work -------------------------------------- */

export function ProofOfWork() {
  const { content } = useContent();
  return (
    <section className="border-t border-border/60 px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1600px]">
        <SectionTitle eyebrow="Proof of work" title="The work speaks first." />
        <dl className="mt-14 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {content.settings.metrics.map((m) => (
            <div key={m.label} className="bg-background p-6 lg:p-10">
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-none font-semibold text-foreground">
                  {m.value}
                </span>
                <span className="mt-3 block text-sm text-muted-foreground">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------- Brand strip --------------------------------------- */

export function BrandStrip() {
  const { content } = useContent();
  const brands = sortActive(content.brands);
  return (
    <section className="border-t border-border/60 px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-[1600px]">
        <p className="text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
          Brands we&apos;ve created with
        </p>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {brands.map((b) => (
            <li
              key={b.id}
              className="group flex flex-col items-start gap-2 bg-background px-6 py-10 lg:py-14"
            >
              <span className="font-display text-xl font-semibold text-muted-foreground transition-colors duration-500 group-hover:text-foreground lg:text-2xl">
                {b.name}
              </span>
              <span className="text-[11px] tracking-[0.16em] text-muted-foreground/60 uppercase">
                {b.note}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* --------------------------------- Audience statement ------------------------------------ */

export function AudienceStatement() {
  const words = ["Brands.", "Founders.", "CEOs.", "Doctors.", "Creators.", "Leaders."];
  return (
    <section className="overflow-hidden border-t border-border/60 py-20 lg:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {words.map((w, i) => (
            <Reveal key={w} delay={i * 90}>
              <span className="font-display text-[clamp(2rem,7vw,5rem)] leading-none font-semibold text-muted-foreground/45 transition-colors hover:text-foreground">
                {w}
              </span>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-14 max-w-2xl font-display text-[clamp(1.5rem,3.6vw,2.5rem)] leading-tight font-semibold">
            You build the business.
            <br />
            <span className="text-muted-foreground">We build the media around it.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------ Testimonials --------------------------------------- */

export function Testimonials() {
  const { content } = useContent();
  const items = sortActive(content.testimonials);
  if (items.length === 0) return null;

  return (
    <section className="border-t border-border/60 px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-[1600px]">
        <SectionTitle eyebrow="In their words" title="What the work did." />
        <ul className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-12">
          {items.map((t, i) => (
            <Reveal as="li" key={t.id} delay={i * 100}>
              <blockquote className="font-display text-[clamp(1.15rem,2vw,1.5rem)] leading-snug text-foreground">
                “{t.quote}”
              </blockquote>
              <div className="mt-7 flex items-center gap-4">
                <img
                  src={t.photo}
                  alt={t.name}
                  width={640}
                  height={640}
                  loading="lazy"
                  className="size-14 rounded-full object-cover grayscale"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.designation} · {t.organisation}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------- Presence ------------------------------------------ */

export function Presence() {
  const { content } = useContent();
  return (
    <section className="border-t border-border/60 px-5 py-16 sm:px-8 lg:py-24">
      <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionTitle eyebrow="Presence" title="Where we shoot." />
          <p className="mt-6 max-w-md text-base text-muted-foreground">
            Crews, studios and partners across India&apos;s major production cities.
          </p>
          <a
            href={content.settings.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline"
          >
            <MapPin className="size-4" /> {content.settings.addressLine}
            <ArrowUpRight className="size-4" />
          </a>
        </div>
        <ul className="grid grid-cols-1 gap-px self-start overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2">
          {content.settings.cities.map((city) => (
            <li key={city} className="bg-background px-6 py-7">
              <span className="font-display text-2xl font-semibold">{city}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------- Closing CTA --------------------------------------- */

export function ClosingCta() {
  const { content } = useContent();
  return (
    <section className="relative overflow-hidden border-t border-border/60">
      <img
        src={images.hero2}
        alt=""
        aria-hidden
        width={1920}
        height={1088}
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
      <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:py-36">
        <Reveal>
          <h2 className="max-w-4xl font-display text-[clamp(2.25rem,8vw,6rem)] leading-[0.95] font-semibold">
            Your audience is already watching.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">What should they see from you?</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-primary px-7 py-4 text-[12px] font-semibold tracking-[0.1em] text-primary-foreground uppercase transition-opacity hover:opacity-85"
            >
              Business Inquiry <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/creators"
              className="inline-flex items-center rounded-full border border-foreground/40 px-7 py-4 text-[12px] font-semibold tracking-[0.1em] text-foreground uppercase transition-colors hover:bg-foreground/10"
            >
              Career Inquiry
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}