// ═══════════════════════════════════════════════════════════
// Shared TypeScript Types
// ═══════════════════════════════════════════════════════════

export interface Video {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  thumb: string;
  duration: string;
  featured: boolean;
  description: string;
}

export interface Review {
  id: string;
  name: string;
  initials: string;
  role: string;
  company: string;
  project: string;
  stars: number;
  text: string;
  avatarGradient: string;
  /** Optional real photo of the reviewer — put image in /public/images/reviews/ */
  photo?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}
