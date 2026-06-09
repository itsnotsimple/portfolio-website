// ═══════════════════════════════════════════════════════════
// CENTRALIZED CONTENT — Edit everything here
// This is the single source of truth for all site text/data
// ═══════════════════════════════════════════════════════════

import type { Video, Review, FAQItem, VideoTestimonial, ClientResult } from '../types';

// ── Site Config ───────────────────────────────────────────
export const SITE_CONFIG = {
  brandName: 'Alex & Flow',
  tagline: 'I make your story move.',
  subTagline: 'Video editor specializing in commercial campaigns and viral social media content.',
  instagramUrl: 'https://www.instagram.com/alex.cc077/',
  instagramHandle: '@alex.cc077',
  email: 'alexperchinkov77@gmail.com',
  available: true,
  availabilityText: 'Available for projects',
  responseTime: 'Usually responds within 24 hours',
  copyrightSuffix: 'All rights reserved.',
  metaTitle: 'Alex & Flow — Video Editor Portfolio',
} as const;

// ── Navigation Links ──────────────────────────────────────
export const NAV_LINKS = {
  work: 'Work',
  about: 'About',
  reviews: 'Testimonials',
  faq: 'FAQ',
  contact: 'Contact',
  cta: "Let's Talk",
} as const;

// ── Hero Section Texts ─────────────────────────────────────
export const HERO_SECTION = {
  preHeading: 'I make your',
  storyHeading: 'story',
  ctaInsta: 'Instagram',
  ctaEmail: 'Send Email',
  scrollLabel: 'Scroll',
  visualProjects: 'Projects',
  visualQuality: 'Quality',
} as const;


// ── Stats (Hero) ──────────────────────────────────────────
export const STATS = [
  { value: 300, suffix: '+', label: 'Projects' },
  { value: 3, suffix: '+', label: 'Years Exp.' },
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
    'Video editor with 3+ years of experience crafting content that engages, inspires, and converts. I specialize in visual storytelling — from high-budget commercial campaigns to viral social clips.',
    "I've worked with brands, influencers, and agencies across Europe. Every project gets my full creative energy and relentless attention to detail.",
  ],
  tools: [
    'Premiere Pro',
    'After Effects',
    'CapCut Pro',
  ],
  yearsExp: '3+',
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
  subtitle: "Feedback from the clients, brands, and creators I've worked with.",
  clientReviewsLabel: 'Client Reviews',
  avgRating: 'Average rating',
  happyClients: 'Happy clients',
  projectsDone: 'Projects done',
  satisfactionRate: 'Satisfied clients',
  availableLabel: 'Work with me',
  ratingFrom: 'from',
  ratingClients: 'clients',
  nextReview: 'Next review',
  dragToShuffle: 'drag to shuffle',
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
  // After Effects Short Clips
  {
    id: 'vid-ae-1',
    title: 'VFX & Motion Graphics - Project 1',
    category: 'after-effects',
    categoryLabel: 'After Effects',
    thumb: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    duration: '0:15',
    featured: true,
    description: 'Advanced motion graphics, 3D tracking, and visual effects composited in After Effects.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/After%20Effects%20Short%20Clips/Ref%201.mp4?v=2',
  },
  {
    id: 'vid-ae-2',
    title: 'VFX & Motion Graphics - Project 2',
    category: 'after-effects',
    categoryLabel: 'After Effects',
    thumb: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    duration: '0:30',
    featured: false,
    description: 'Dynamic typography animation and kinetic text effect for promotional use.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/After%20Effects%20Short%20Clips/Ref%202.mp4?v=2',
  },
  {
    id: 'vid-ae-3',
    title: 'VFX & Motion Graphics - Project 3',
    category: 'after-effects',
    categoryLabel: 'After Effects',
    thumb: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    duration: '0:45',
    featured: false,
    description: 'Complex 3D particle simulation and logo sting animation.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/After%20Effects%20Short%20Clips/Ref%203.mp4?v=2',
  },
  // Brand Promoting
  {
    id: 'vid-brand-1',
    title: 'Commercial Brand Campaign - Part 1',
    category: 'brand-promoting',
    categoryLabel: 'Brand Promoting',
    thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    duration: '1:00',
    featured: true,
    description: 'High-end branding video designed to tell the company\'s story and showcase key products.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/Brand%20Promoting/Ref%201.mp4?v=2',
  },
  {
    id: 'vid-brand-2',
    title: 'Commercial Brand Campaign - Part 2',
    category: 'brand-promoting',
    categoryLabel: 'Brand Promoting',
    thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    duration: '0:45',
    featured: false,
    description: 'Social media teaser cut for maximum engagement and brand awareness.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/Brand%20Promoting/Ref%202.mp4?v=2',
  },
  {
    id: 'vid-brand-3',
    title: 'Commercial Brand Campaign - Part 3',
    category: 'brand-promoting',
    categoryLabel: 'Brand Promoting',
    thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    duration: '1:15',
    featured: false,
    description: 'Cinematic corporate promo combining live footage and custom lower thirds.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/Brand%20Promoting/Ref%203.mp4?v=2',
  },
  // Food Videos
  {
    id: 'vid-food-1',
    title: 'Gourmet Food & Culinary Art',
    category: 'food-videos',
    categoryLabel: 'Food Videos',
    thumb: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
    duration: '0:40',
    featured: false,
    description: 'Fast-paced, satisfying food prep and culinary commercial editing with sound design.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/Food%20Videos/Ref%201.mp4?v=2',
  },
  // Simple Editing
  {
    id: 'vid-simple-1',
    title: 'Clean Cut Editorial - Project 1',
    category: 'simple-editing',
    categoryLabel: 'Simple Editing',
    thumb: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
    duration: '1:30',
    featured: false,
    description: 'Professional video pacing, color matching, and sound leveling with minimal effects.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/Simple%20Editing/Ref%201.mp4?v=2',
  },
  {
    id: 'vid-simple-2',
    title: 'Clean Cut Editorial - Project 2',
    category: 'simple-editing',
    categoryLabel: 'Simple Editing',
    thumb: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
    duration: '1:00',
    featured: false,
    description: 'Rhythmic music-to-video editing with seamless transitions and clean cuts.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/Simple%20Editing/Ref%202.mp4?v=2',
  },
  {
    id: 'vid-simple-3',
    title: 'Clean Cut Editorial - Project 3',
    category: 'simple-editing',
    categoryLabel: 'Simple Editing',
    thumb: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
    duration: '1:10',
    featured: false,
    description: 'Focus on narrative rhythm, dialogue cleanup, and clean color grading.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/Simple%20Editing/Ref%203.mp4?v=2',
  },
  // YouTube Shorts
  {
    id: 'vid-shorts-1',
    title: 'DJ and His Dad',
    category: 'youtube-shorts',
    categoryLabel: 'YouTube Shorts',
    thumb: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80',
    duration: '0:50',
    featured: false,
    description: 'Fast-paced, engaging short-form content optimized for mobile viewing on TikTok, Reels, and Shorts.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/YouTube%20Shorts/DJ%20and%20is%20dad.mp4?v=2',
  },
  {
    id: 'vid-shorts-2',
    title: 'Stylebender Tribute',
    category: 'youtube-shorts',
    categoryLabel: 'YouTube Shorts',
    thumb: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80',
    duration: '0:35',
    featured: true,
    description: 'High-energy edit with sync-cuts, zooms, sound effects, and text overlays.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/YouTube%20Shorts/Stylebender.mp4?v=2',
  },
];

// ── Filter Categories ─────────────────────────────────────
export const FILTER_CATEGORIES = [
  { key: 'after-effects', label: 'After Effects' },
  { key: 'brand-promoting', label: 'Brand Promoting' },
  { key: 'food-videos', label: 'Food Videos' },
  { key: 'simple-editing', label: 'Simple Editing' },
  { key: 'youtube-shorts', label: 'YouTube Shorts' },
] as const;


// ── Reviews ───────────────────────────────────────────────
// HOW TO ADD A REAL PHOTO:
//   1. Put the image file in /public/images/reviews/  (e.g. maria.jpg)
//   2. Uncomment the `photo` line and set the path
//   3. If no photo is set, the initials avatar is shown automatically
export const REVIEWS: Review[] = [
  {
    id: 'review-bobbydiv',
    name: 'BobbyDiv',
    initials: 'BD',
    role: 'Automotive Creator & Vlogger',
    company: 'YouTube',
    project: 'YouTube Car Vlogs & Reviews',
    stars: 5,
    text: 'Amazing editing speed and absolute creative genius. He elevated my YouTube videos to a whole new level of storytelling. Highly recommended!',
    avatarGradient: 'linear-gradient(135deg, #2596be, #1dd3f0)',
    photo: '/images/reviews/bobbydiv.webp',
    socialLink: 'https://www.youtube.com/@BobbyDiv',
    socialType: 'youtube',
    socialStats: '113K+ Subs',
  },
  {
    id: 'review-corbinsylk',
    name: 'Corbin Sylk',
    initials: 'CS',
    role: 'Entrepreneur & Business Coach',
    company: '@corbinsylk',
    project: 'Premium Business Promo Reels',
    stars: 5,
    text: "Alex is easily the fastest editor I've ever worked with. He replicates any style perfectly and sends back drafts in under an hour. Absolutely phenomenal!",
    avatarGradient: 'linear-gradient(135deg, #0dd3f0, #3ab8e2)',
    photo: '/images/reviews/corbinsylk.webp',
    socialLink: 'https://www.instagram.com/corbinsylk/',
    socialType: 'instagram',
    socialStats: '198 Followers',
  },
  {
    id: 'review-coach-westfit',
    name: 'Westly Harrison',
    initials: 'WH',
    role: 'Online Fitness Coach',
    company: '@coach_westfit',
    project: 'High-energy Fitness Reels',
    stars: 5,
    text: "Alex is exceptional. I send him a video and he gets it back to me extremely quickly. If I want a certain style modeled, he replicates it exactly how I want. He is easily the best editor I've ever worked with.",
    avatarGradient: 'linear-gradient(135deg, #8350e8, #a97af5)',
    photo: '/images/reviews/coach_westfit.webp',
    socialLink: 'https://www.instagram.com/coach_westfit/',
    socialType: 'instagram',
    socialStats: '23.4K+ Followers',
  },
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
    answer: "Turnaround time depends on the scope. Short social media clips typically take 1–2 business days. For larger projects, we'll agree on a timeline upfront. Rush delivery is available for an additional fee.",
  },
  {
    id: 'faq-3',
    question: 'What software do you use?',
    answer: 'My main tools are Adobe Premiere Pro and CapCut. For motion graphics I use After Effects. I also use Photoshop if necessary.',
  },
  {
    id: 'faq-4',
    question: 'How many revisions are included?',
    answer: 'All projects include 3 rounds of revisions as standard. This covers adjustments to cuts, transitions, music sync, and color. Additional revisions can be arranged. I aim to nail the vision on the first draft, so revisions are rarely needed.',
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

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'vt-westfit',
    name: 'Westly Harrison',
    role: 'Online Fitness Coach',
    thumb: '',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/testimonials/Westly.mp4?v=2',
  },
  {
    id: 'vt-corbin',
    name: 'Corbin Sylk',
    role: 'Entrepreneur & Business Coach',
    thumb: '',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/testimonials/Corbin.mp4?v=2',
  },
  {
    id: 'vt-client-1',
    name: 'Muhammad',
    role: 'Content Creator',
    thumb: '',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/testimonials/Muhammad.mp4?v=2',
  },
  {
    id: 'vt-client-2',
    name: 'Edward',
    role: 'Business Owner',
    thumb: '',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/testimonials/Edward.mp4?v=2',
  },
];

// ── Client Results (image gallery) ────────────────────────
// HOW TO ADD IMAGES: drop files in /public/images/results/ and add entries below.
// Supported formats: webp, jpg, png. Optional caption shows below each image.
export const RESULTS_SECTION = {
  tag: 'Results',
  heading: 'Client',
  headingAccent: 'results',
  subtitle: 'Visual proof of growth, audience engagement, and viral reach.',
} as const;

export const RESULTS: ClientResult[] = [
  { src: '/images/results/result-1.webp' },
  { src: '/images/results/result-2.webp' },
  { src: '/images/results/result-3.webp' },
  { src: '/images/results/result-4.webp' },
];

// ── Before / After (color grading) ────────────────────────
export const BEFORE_AFTER = {
  tag: 'Color Grading & Correction',
  heading: 'See the',
  headingAccent: 'difference',
  subtitle: 'A side-by-side comparison of the raw footage and the final graded look.',
  beforeLabel: 'Before',
  afterLabel: 'After',
  hint: 'Compare looks',
  beforeVideoUrl: 'https://itsnotsimple.github.io/portfolio-media/grading/before.mp4?v=2',
  afterVideoUrl: 'https://itsnotsimple.github.io/portfolio-media/grading/after.mp4?v=2',
} as const;
