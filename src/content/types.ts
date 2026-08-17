export type WithMeta = {
  id: string;
  active: boolean;
  order: number;
};

export type HeroSlide = WithMeta & {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  mobileImage: string;
  youtubeUrl: string;
  exploreUrl: string;
  primaryCta: string;
  secondaryCta: string;
};

export type TopFiveItem = WithMeta & {
  rank: number;
  title: string;
  category: string;
  badge: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
};

export type Episode = {
  id: string;
  ipId: string;
  label: "Featured Episode" | "Popular Episode" | "Latest Episode";
  title: string;
  thumbnail: string;
  youtubeUrl: string;
  duration: string;
};

export type OriginalIp = WithMeta & {
  slug: string;
  title: string;
  category: string;
  description: string;
  poster: string;
  still: string;
  youtubeUrl: string;
  socialUrl: string;
  stats: { label: string; value: string }[];
};

export type PortfolioItem = WithMeta & {
  title: string;
  client: string;
  category: string;
  description: string;
  cover: string;
  youtubeUrl: string;
  instagramUrl: string;
  projectUrl: string;
  featured: boolean;
  size: "tall" | "wide" | "regular";
};

export type ServiceItem = WithMeta & {
  title: string;
  description: string;
};

export type BrandItem = WithMeta & {
  name: string;
  note: string;
};

export type Testimonial = WithMeta & {
  quote: string;
  name: string;
  designation: string;
  organisation: string;
  photo: string;
};

export type SocialLinks = {
  youtube: string;
  instagram: string;
  linkedin: string;
};

export type SiteSettings = {
  whatsappNumber: string;
  email: string;
  phone: string;
  addressLine: string;
  mapsUrl: string;
  cities: string[];
  metrics: { value: string; label: string }[];
};

export type Enquiry = {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  designation: string;
  city: string;
  service: string;
  message: string;
  sourcePage: string;
  status: EnquiryStatus;
};

export const ENQUIRY_STATUSES = [
  "New",
  "Contacted",
  "Follow-up",
  "Qualified",
  "Closed",
  "Archived",
] as const;

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];


export type TopTenVideo = {
  rank: number;
  coverUrl: string;
  videoUrl: string;
  active: boolean;
  order: number;
};

export type TopTenChannel = {
  id: string;
  name: string;
  slug: string;
  active: boolean;
  order: number;
  videos: TopTenVideo[];
};

export type SiteContent = {
  topTenChannels: TopTenChannel[];
  heroSlides: HeroSlide[];
  topFive: TopFiveItem[];
  originalIps: OriginalIp[];
  episodes: Episode[];
  portfolio: PortfolioItem[];
  services: ServiceItem[];
  brands: BrandItem[];
  testimonials: Testimonial[];
  enquiries: Enquiry[];
  social: SocialLinks;
  settings: SiteSettings;
};

export const PORTFOLIO_FILTERS = [
  "All",
  "Original IPs",
  "Podcasts",
  "Reels",
  "Brand Content",
  "Healthcare",
  "Personal Brands",
  "YouTube",
  "Campaigns",
] as const;