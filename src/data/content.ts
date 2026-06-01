// ═══════════════════════════════════════════════════════════
// CENTRALIZED CONTENT — Edit everything here
// This is the single source of truth for all site text/data
// ═══════════════════════════════════════════════════════════

import type { Video, Review, FAQItem } from '../types';

// ── Site Config ───────────────────────────────────────────
export const SITE_CONFIG = {
  brandName: 'Alex & Flow',
  tagline: 'I make your story move.',
  subTagline: 'Video editor specializing in commercial campaigns, music videos, and viral social media content.',
  instagramUrl: 'https://www.instagram.com/alex.cc077/',
  instagramHandle: '@alex.cc077',
  email: 'alexperchinkov77@gmail.com',
  available: true,
  availabilityText: 'Available for projects',
  responseTime: 'Usually responds within 24 hours',
} as const;

// ── Hero Section Texts ─────────────────────────────────────
export const HERO_SECTION = {
  preHeading: 'I make your',
  storyHeading: 'story',
  ctaInsta: 'Instagram',
  ctaEmail: 'Send Email',
  scrollLabel: 'Scroll',
} as const;

// ── Stats (Hero) ──────────────────────────────────────────
export const STATS = [
  { value: 150, suffix: '+', label: 'Projects' },
  { value: 5, suffix: '+', label: 'Years Exp.' },
  { value: 98, suffix: '%', label: 'Happy Clients' },
] as const;

// ── Word cycle (Hero heading) ─────────────────────────────
// Each word shows for ~2.5 s, then fades out and the next fades in
export const TYPEWRITER_WORDS = [
  'move.',
  'speak.',
  'sell.',
  'go viral.',
  'inspire.',
];

// ── About ─────────────────────────────────────────────────
export const ABOUT = {
  tag: 'About',
  heading: 'I turn raw footage into',
  headingAccent: 'emotion.',
  paragraphs: [
    'Video editor with 5+ years of experience crafting content that engages, inspires, and converts. I specialize in visual storytelling — from high-budget commercial campaigns to viral social clips.',
    "I've worked with brands, musicians, influencers, and agencies across Europe. Every project gets my full creative energy and relentless attention to detail.",
  ],
  tools: [
    'Premiere Pro',
    'After Effects',
    'CapCut Pro',
    'Audition',
  ],
  yearsExp: '5+',
  yearsLabel: 'Years Exp.',
  ctaWork: 'Work with me',
  ctaSocial: 'Instagram',
} as const;

// ── Portfolio (Work) Section Texts ─────────────────────────
export const WORK_SECTION = {
  tag: 'Portfolio',
  heading: 'Selected',
  headingAccent: 'Work',
  subtitle: 'Every frame is told with intent. Explore the best of my work.',
} as const;

// ── Testimonials (Reviews) Section Texts ───────────────────
export const REVIEWS_SECTION = {
  tag: 'Testimonials',
  heading: 'What clients',
  headingAccent: 'say',
  subtitle: "Real words from real people I've worked with.",
} as const;

// ── FAQ Section Texts ──────────────────────────────────────
export const FAQ_SECTION = {
  tag: 'FAQ',
  heading: 'Got',
  headingAccent: 'questions?',
  subtitle: 'Everything you need to know before we start working together.',
  ctaText: "Still have questions? Let's talk",
} as const;

// ── Contact Section Texts ──────────────────────────────────
export const CONTACT_SECTION = {
  tag: 'Contact',
  heading: 'Ready to',
  headingAccent: 'start?',
  subtitle: 'Have a project, an idea, or just want to see what I can do for you?',
  instaTitle: 'Instagram',
  instaDesc: 'See my latest projects and DM me directly',
  emailTitle: 'Email',
  emailDesc: 'For project inquiries and long-term collaboration',
} as const;

// ── Portfolio Videos ──────────────────────────────────────
export const VIDEOS: Video[] = [
  {
    id: 'vid-fashion-commercial',
    title: 'Fashion & Style — Seasonal Campaign',
    category: 'commercial',
    categoryLabel: 'Commercial',
    thumb: '/images/thumb_commercial.png',
    duration: '1:24',
    featured: true,
    description: 'Full campaign for a fashion brand — teasers, hero video, and social media adaptations.',
  },
  {
    id: 'vid-music-hiphop',
    title: 'Official Music Video',
    category: 'music',
    categoryLabel: 'Music Video',
    thumb: '/images/thumb_music.png',
    duration: '3:45',
    featured: false,
    description: 'Cinematic edit with color grading, VFX, and sync-perfect cuts.',
  },
  {
    id: 'vid-reels-series',
    title: 'Viral Reels Series — 60s Format',
    category: 'social',
    categoryLabel: 'Social Media',
    thumb: '/images/thumb_social.png',
    duration: '0:58',
    featured: false,
    description: '12 viral short-form clips optimized for Instagram and TikTok algorithms.',
  },
  {
    id: 'vid-brand-promo',
    title: 'Corporate Brand Video',
    category: 'brand',
    categoryLabel: 'Branding',
    thumb: '/images/thumb_brand.png',
    duration: '2:10',
    featured: false,
    description: 'Company showcase with motion graphics, 3D elements, and narrative structure.',
  },
  {
    id: 'vid-travel-doc',
    title: 'Travel Documentary',
    category: 'travel',
    categoryLabel: 'Travel',
    thumb: '/images/thumb_travel.png',
    duration: '8:32',
    featured: false,
    description: 'Cinematic travel vlog with atmospheric color grading and immersive soundtrack.',
  },
  {
    id: 'vid-product-ads',
    title: 'E-commerce Product Ads',
    category: 'commercial',
    categoryLabel: 'Commercial',
    thumb: '/images/thumb_commercial.png',
    duration: '0:30',
    featured: false,
    description: '20 high-converting product clips optimized for Meta and Google Ads.',
  },
];

// ── Filter Categories ─────────────────────────────────────
export const FILTER_CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'music', label: 'Music Video' },
  { key: 'social', label: 'Social Media' },
  { key: 'brand', label: 'Branding' },
  { key: 'travel', label: 'Travel' },
] as const;

// ── Reviews ───────────────────────────────────────────────
// HOW TO ADD A REAL PHOTO:
//   1. Put the image file in /public/images/reviews/  (e.g. maria.jpg)
//   2. Uncomment the `photo` line and set the path
//   3. If no photo is set, the initials avatar is shown automatically
export const REVIEWS: Review[] = [
  {
    id: 'review-maria',
    name: 'Maria K.',
    initials: 'MK',
    role: 'Social Media Manager',
    company: 'NovaBrand Agency',
    project: 'Instagram Reels series — 12 clips',
    stars: 5,
    text: 'Incredible work! Our clips doubled engagement in just one month. He understands social media rhythm perfectly — every cut lands exactly where it needs to.',
    avatarGradient: 'linear-gradient(135deg, #2596be, #1dd3f0)',
    // photo: '/images/reviews/maria.jpg',
  },
  {
    id: 'review-alex',
    name: 'Alexander N.',
    initials: 'AN',
    role: 'YouTube Creator',
    company: '180K subscribers',
    project: 'Video Essay — Documentary Style',
    stars: 5,
    text: "Best editor I've ever worked with. He understands your vision from the first conversation and brings it to life better than you imagined.",
    avatarGradient: 'linear-gradient(135deg, #1a6b8a, #2596be)',
    // photo: '/images/reviews/alex.jpg',
  },
  {
    id: 'review-sofia-studio',
    name: 'Sofia Brand Studio',
    initials: 'SB',
    role: 'Creative Agency',
    company: 'Sofia, Bulgaria',
    project: 'Corporate Promo Video',
    stars: 5,
    text: "Fast, professional, and the results speak for themselves. Our client was absolutely thrilled. We'll definitely continue working together on future projects.",
    avatarGradient: 'linear-gradient(135deg, #0d7a9e, #3ab8e2)',
    // photo: '/images/reviews/sofia-studio.jpg',
  },
  {
    id: 'review-todor',
    name: 'Todor M.',
    initials: 'TM',
    role: 'Music Artist & Producer',
    company: 'Independent',
    project: 'Official Music Video',
    stars: 5,
    text: 'My music video exploded after his edit — 500K views in the first week. The color grading, cuts, transitions — everything is on another level.',
    avatarGradient: 'linear-gradient(135deg, #1c4966, #2596be)',
    // photo: '/images/reviews/todor.jpg',
  },
  {
    id: 'review-elena',
    name: 'Elena Travels',
    initials: 'ET',
    role: 'Travel Blogger & Influencer',
    company: '95K Instagram followers',
    project: 'Travel Vlog Series — 6 Episodes',
    stars: 5,
    text: 'Amazing work, delivered on time, communication 10/10. He turned ordinary travel footage into a cinematic masterpiece.',
    avatarGradient: 'linear-gradient(135deg, #0a4a65, #1e8fb5)',
    // photo: '/images/reviews/elena.jpg',
  },
  {
    id: 'review-ivan',
    name: 'Ivan D.',
    initials: 'ID',
    role: 'E-commerce Owner',
    company: 'FashionBG.com',
    project: 'Product Ads — 20 clips',
    stars: 5,
    text: "We've worked together for over a year. His ad clips generated a 340% ROI on our campaigns. Absolutely essential for anyone who wants real results.",
    avatarGradient: 'linear-gradient(135deg, #164d68, #2596be)',
    // photo: '/images/reviews/ivan.jpg',
  },
];

// ── FAQ ───────────────────────────────────────────────────
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What types of videos do you edit?',
    answer: "I specialize in commercial campaigns, music videos, social media content (Reels, TikTok, Shorts), corporate brand videos, travel documentaries, and product advertisements. If you have a unique project, let's talk — I love creative challenges.",
  },
  {
    id: 'faq-2',
    question: 'How long does a typical project take?',
    answer: "Turnaround time depends on the scope. Short social media clips typically take 2–3 business days. Music videos and commercial campaigns usually take 5–10 days. For larger projects, we'll agree on a timeline upfront. Rush delivery is available for an additional fee.",
  },
  {
    id: 'faq-3',
    question: 'What software do you use?',
    answer: 'My primary tools are Adobe Premiere Pro, After Effects, and DaVinci Resolve for color grading. For motion graphics and 3D elements I use Cinema 4D and Photoshop. I work with all major video formats and codecs.',
  },
  {
    id: 'faq-4',
    question: 'How many revisions are included?',
    answer: 'All projects include 2 rounds of revisions as standard. This covers adjustments to cuts, transitions, music sync, and color. Additional revisions can be arranged. I aim to nail the vision on the first draft, so revisions are rarely needed.',
  },
  {
    id: 'faq-5',
    question: 'What file formats do you accept and deliver?',
    answer: "I accept footage in any format — MP4, MOV, MXF, RAW, and more. Final delivery is typically in MP4 (H.264/H.265) at the resolution you need, whether that's 1080p, 4K, or vertical 9:16 formats for mobile.",
  },
  {
    id: 'faq-6',
    question: 'Do you offer retainer packages?',
    answer: 'Yes! For clients who need ongoing content (e.g., monthly social media packages), I offer retainer plans at discounted rates. This guarantees priority delivery and a consistent editing style across all your content.',
  },
  {
    id: 'faq-7',
    question: 'How do I send you my footage?',
    answer: "You can share files via Google Drive, WeTransfer, Dropbox, or any cloud storage you prefer. For very large projects, we can discuss other transfer options. Just reach out and we'll figure out the easiest workflow for you.",
  },
  {
    id: 'faq-8',
    question: 'How do I get started?',
    answer: "Simple — drop me a DM on Instagram or send an email describing your project. Include the type of video, approximate length, deadline, and any reference videos you like. I'll get back to you within 24 hours with a quote and timeline.",
  },
];
