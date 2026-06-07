// ═══════════════════════════════════════════════════════════
// CENTRALIZED BULGARIAN CONTENT
// This mirrors content.ts for the Bulgarian language
// ═══════════════════════════════════════════════════════════

import type { Video, Review, FAQItem, VideoTestimonial, ClientResult } from '../types';

// ── Site Config ───────────────────────────────────────────
export const SITE_CONFIG = {
  brandName: 'Alex & Flow',
  tagline: 'Давам движение на твоята история.',
  subTagline: 'Видео редактор, специализиран в рекламни кампании и вайръл съдържание за социални медии.',
  instagramUrl: 'https://www.instagram.com/alex.cc077/',
  instagramHandle: '@alex.cc077',
  email: 'alexperchinkov77@gmail.com',
  available: true,
  availabilityText: 'Свободен за проекти',
  responseTime: 'Обикновено отговарям до 24 часа',
  copyrightSuffix: 'Всички права запазени.',
  metaTitle: 'Alex & Flow — Портфолио на видео редактор',
} as const;

// ── Navigation Links ──────────────────────────────────────
export const NAV_LINKS = {
  work: 'Проекти',
  about: 'За мен',
  reviews: 'Препоръки',
  faq: 'ЧЗВ',
  contact: 'Контакти',
  cta: 'Свържи се',
} as const;

// ── Hero Section Texts ─────────────────────────────────────
export const HERO_SECTION = {
  preHeading: 'Аз правя твоята',
  storyHeading: 'история',
  ctaInsta: 'Instagram',
  ctaEmail: 'Изпрати имейл',
  scrollLabel: 'Превърти',
  visualProjects: 'Проекта',
  visualQuality: 'Качество',
} as const;


// ── Stats (Hero) ──────────────────────────────────────────
export const STATS = [
  { value: 300, suffix: '+', label: 'Проекта' },
  { value: 3, suffix: '+', label: 'Г. Опит' },
  { value: 98, suffix: '%', label: 'Доволни клиенти' },
] as const;

// ── Word cycle (Hero heading) ─────────────────────────────
export const TYPEWRITER_WORDS = [
  'да се движи.',
  'да говори.',
  'да продава.',
  'да стане вайръл.',
  'да вдъхновява.',
];

// ── About ─────────────────────────────────────────────────
export const ABOUT = {
  tag: 'За мен',
  heading: 'Превръщам суровите кадри в',
  headingAccent: 'емоция.',
  paragraphs: [
    'Видео редактор с над 3 години опит в създаването на съдържание, което ангажира, вдъхновява и продава. Специализирам в дигиталното разказване на истории — от мащабни рекламни кампании до кратки вайръл клипове.',
    'Работил съм с брандове, инфлуенсъри и агенции в цяла Европа. Всеки проект получава пълната ми творческа енергия и безкомпромисно внимание към детайла.',
  ],
  tools: [
    'Premiere Pro',
    'After Effects',
    'CapCut Pro',
  ],
  yearsExp: '3+',
  yearsLabel: 'Г. Опит',
  ctaWork: 'Работи с мен',
  ctaSocial: 'Instagram',
} as const;

// ── Portfolio (Work) Section Texts ─────────────────────────
export const WORK_SECTION = {
  tag: 'Портфолио',
  heading: 'Избрани',
  headingAccent: 'Проекти',
  subtitle: 'Всеки кадър разказва история с цел. Разгледай най-доброто от мен.',
} as const;

// ── Testimonials (Reviews) Section Texts ───────────────────
export const REVIEWS_SECTION = {
  tag: 'Отзиви',
  heading: 'Какво казват',
  headingAccent: 'клиентите',
  subtitle: 'Обратна връзка от клиентите, брандовете и авторите, с които сме работили.',
  clientReviewsLabel: 'Отзиви на клиенти',
  avgRating: 'Средна оценка',
  happyClients: 'Доволни клиенти',
  projectsDone: 'Завършени проекти',
  satisfactionRate: 'Степен на удовлетвореност',
  availableLabel: 'Свободен за нови проекти',
  ratingFrom: 'от',
  ratingClients: 'клиенти',
  nextReview: 'Следващ отзив',
  dragToShuffle: 'плъзни за смяна',
} as const;

// ── FAQ Section Texts ──────────────────────────────────────
export const FAQ_SECTION = {
  tag: 'ЧЗВ',
  heading: 'Имаш ли',
  headingAccent: 'въпроси?',
  subtitle: 'Всичко, което трябва да знаеш, преди да започнем съвместна работа.',
  ctaText: 'Все още имаш въпроси? Нека поговорим',
} as const;

// ── Contact Section Texts ──────────────────────────────────
export const CONTACT_SECTION = {
  tag: 'Контакти',
  heading: 'Готов ли си',
  headingAccent: 'да започнем?',
  subtitle: 'Имаш проект, идея или просто искаш да видиш какво мога да направя за теб?',
  instaTitle: 'Instagram',
  instaDesc: 'Виж последните ми проекти и ми пиши директно',
  emailTitle: 'Имейл',
  emailDesc: 'За запитвания за проекти и дългосрочно сътрудничество',
} as const;

// ── Portfolio Videos ──────────────────────────────────────
export const VIDEOS: Video[] = [
  // After Effects Short Clips
  {
    id: 'vid-ae-1',
    title: 'VFX & Моушън Графика - Проект 1',
    category: 'after-effects',
    categoryLabel: 'After Effects',
    thumb: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    duration: '0:15',
    featured: true,
    description: 'Сложна моушън графика, 3D проследяване и визуални ефекти, композирани в After Effects.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/After%20Effects%20Short%20Clips/Ref%201.mp4?v=2',
  },
  {
    id: 'vid-ae-2',
    title: 'VFX & Моушън Графика - Проект 2',
    category: 'after-effects',
    categoryLabel: 'After Effects',
    thumb: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    duration: '0:30',
    featured: false,
    description: 'Динамична текстова анимация и кинетичен текст за рекламни цели.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/After%20Effects%20Short%20Clips/Ref%202.mp4?v=2',
  },
  {
    id: 'vid-ae-3',
    title: 'VFX & Моушън Графика - Проект 3',
    category: 'after-effects',
    categoryLabel: 'After Effects',
    thumb: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
    duration: '0:45',
    featured: false,
    description: 'Сложна 3D симулация на частици и анимация на лого.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/After%20Effects%20Short%20Clips/Ref%203.mp4?v=2',
  },
  // Brand Promoting
  {
    id: 'vid-brand-1',
    title: 'Рекламна Кампания за Бранд - Част 1',
    category: 'brand-promoting',
    categoryLabel: 'Бранд Реклами',
    thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    duration: '1:00',
    featured: true,
    description: 'Висококачествено бранд видео, създадено да разкаже историята на марката и да покаже ключови продукти.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/Brand%20Promoting/Ref%201.mp4?v=2',
  },
  {
    id: 'vid-brand-2',
    title: 'Рекламна Кампания за Бранд - Част 2',
    category: 'brand-promoting',
    categoryLabel: 'Бранд Реклами',
    thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    duration: '0:45',
    featured: false,
    description: 'Тизър версия за социални мрежи за максимална ангажираност и разпознаваемост на марката.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/Brand%20Promoting/Ref%202.mp4?v=2',
  },
  {
    id: 'vid-brand-3',
    title: 'Рекламна Кампания за Бранд - Част 3',
    category: 'brand-promoting',
    categoryLabel: 'Бранд Реклами',
    thumb: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    duration: '1:15',
    featured: false,
    description: 'Кинематографично корпоративно промо видео с вградени текстови графики.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/Brand%20Promoting/Ref%203.mp4?v=2',
  },
  // Food Videos
  {
    id: 'vid-food-1',
    title: 'Кулинарно Изкуство и Гурме',
    category: 'food-videos',
    categoryLabel: 'Кулинарни Видеа',
    thumb: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
    duration: '0:40',
    featured: false,
    description: 'Динамичен и удовлетворяващ кулинарен монтаж с професионален звуков дизайн.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/Food%20Videos/Ref%201.mp4?v=2',
  },
  // Simple Editing
  {
    id: 'vid-simple-1',
    title: 'Чист & Професионален Монтаж - Проект 1',
    category: 'simple-editing',
    categoryLabel: 'Семпъл Монтаж',
    thumb: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
    duration: '1:30',
    featured: false,
    description: 'Професионално темпо на видеото, балансиране на цветовете и регулиране на звука с минимални ефекти.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/Simple%20Editing/Ref%201.mp4?v=2',
  },
  {
    id: 'vid-simple-2',
    title: 'Чист & Професионален Монтаж - Проект 2',
    category: 'simple-editing',
    categoryLabel: 'Семпъл Монтаж',
    thumb: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
    duration: '1:00',
    featured: false,
    description: 'Ритмичен монтаж по музикален фон с плавни преходи и изчистени срязвания.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/Simple%20Editing/Ref%202.mp4?v=2',
  },
  {
    id: 'vid-simple-3',
    title: 'Чист & Професионален Монтаж - Проект 3',
    category: 'simple-editing',
    categoryLabel: 'Семпъл Монтаж',
    thumb: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
    duration: '1:10',
    featured: false,
    description: 'Фокус върху ритъма на диалога, изчистване на шума в звука и натурални цветове.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/Simple%20Editing/Ref%203.mp4?v=2',
  },
  // YouTube Shorts
  {
    id: 'vid-shorts-1',
    title: 'DJ и неговият баща',
    category: 'youtube-shorts',
    categoryLabel: 'YouTube Shorts',
    thumb: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80',
    duration: '0:50',
    featured: false,
    description: 'Динамично и бързо кратко видео, оптимизирано за мобилно гледане в TikTok, Reels и YouTube Shorts.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/YouTube%20Shorts/DJ%20and%20is%20dad.mp4?v=2',
  },
  {
    id: 'vid-shorts-2',
    title: 'Stylebender (Клип за Адесаня)',
    category: 'youtube-shorts',
    categoryLabel: 'YouTube Shorts',
    thumb: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop&q=80',
    duration: '0:35',
    featured: true,
    description: 'Високоенергиен монтаж със синхронизирани кадри по бийта, приближения, звукови ефекти и текстови субтитри.',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/YouTube%20Shorts/Stylebender.mp4?v=2',
  },
];

// ── Filter Categories ─────────────────────────────────────
export const FILTER_CATEGORIES = [
  { key: 'after-effects', label: 'After Effects' },
  { key: 'brand-promoting', label: 'Бранд Реклами' },
  { key: 'food-videos', label: 'Кулинарни Видеа' },
  { key: 'simple-editing', label: 'Семпъл Монтаж' },
  { key: 'youtube-shorts', label: 'YouTube Shorts' },
] as const;


// ── Reviews ───────────────────────────────────────────────
export const REVIEWS: Review[] = [
  {
    id: 'review-bobbydiv',
    name: 'BobbyDiv',
    initials: 'BD',
    role: 'Автомобилен създател и влогър',
    company: 'YouTube',
    project: 'YouTube авто влогове и ревюта',
    stars: 5,
    text: 'Невероятна скорост на монтаж и пълен творчески гений. Той издигна видеата ми в YouTube на съвсем ново ниво на разказване. Силно препоръчвам!',
    avatarGradient: 'linear-gradient(135deg, #2596be, #1dd3f0)',
    photo: '/images/reviews/bobbydiv.webp',
    socialLink: 'https://www.youtube.com/@BobbyDiv',
    socialType: 'youtube',
    socialStats: '113K+ абонати',
  },
  {
    id: 'review-corbinsylk',
    name: 'Корбин Силк',
    initials: 'CS',
    role: 'Предприемач и бизнес коуч',
    company: '@corbinsylk',
    project: 'Премиум бизнес промо клипове',
    stars: 5,
    text: "Алекс е безспорно най-бързият видео редактор, с когото съм работил. Пресъздава всеки стил перфектно и праща готов вариант за по-малко от час. Абсолютно феноменален!",
    avatarGradient: 'linear-gradient(135deg, #0dd3f0, #3ab8e2)',
    photo: '/images/reviews/corbinsylk.webp',
    socialLink: 'https://www.instagram.com/corbinsylk/',
    socialType: 'instagram',
    socialStats: '198 последв.',
  },
  {
    id: 'review-coach-westfit',
    name: 'Уестли Харисън',
    initials: 'WH',
    role: 'Онлайн фитнес треньор',
    company: '@coach_westfit',
    project: 'Високоенергийни фитнес Reels',
    stars: 5,
    text: "Алекс е изключителен. Изпращам му видео и той ми го връща изключително бързо. Ако искам даден стил, той го пресъздава точно както искам. Определено е най-добрият видео редактор, с когото съм работил.",
    avatarGradient: 'linear-gradient(135deg, #8350e8, #a97af5)',
    photo: '/images/reviews/coach_westfit.webp',
    socialLink: 'https://www.instagram.com/coach_westfit/',
    socialType: 'instagram',
    socialStats: '23.4K+ последв.',
  },
  {
    id: 'review-maria',
    name: 'Мария К.',
    initials: 'МК',
    role: 'Социален медиен мениджър',
    company: 'NovaBrand Agency',
    project: 'Поредица Instagram Reels — 12 клипа',
    stars: 5,
    text: 'Невероятна работа! Нашите клипове удвоиха ангажираността само за един месец. Той разбира перфектно ритъма на социалните медии — всеки кадър е точно там, където трябва да бъде.',
    avatarGradient: 'linear-gradient(135deg, #2596be, #1dd3f0)',
  },
  {
    id: 'review-sofia-studio',
    name: 'Sofia Brand Studio',
    initials: 'SB',
    role: 'Креативна агенция',
    company: 'София, България',
    project: 'Корпоративно промо видео',
    stars: 5,
    text: 'Бърз, професионален и резултатите говорят сами за себе си. Нашият клиент беше напълно очарован. Определено ще продължим да работим заедно по бъдещи проекти.',
    avatarGradient: 'linear-gradient(135deg, #0d7a9e, #3ab8e2)',
  },
  {
    id: 'review-todor',
    name: 'Тодор М.',
    initials: 'ТМ',
    role: 'Музикален изпълнител и продуцент',
    company: 'Независим',
    project: 'Официален музикален клип',
    stars: 5,
    text: 'Музикалното ми видео избухна след неговия монтаж — 500 хил. гледания през първата седмица. Цветовите корекции, монтажът, преходите — всичко е на друго ниво.',
    avatarGradient: 'linear-gradient(135deg, #1c4966, #2596be)',
  },
];

// ── FAQ ───────────────────────────────────────────────────
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Какви видове видеоклипове монтираш?',
    answer: 'Специализирам в рекламни кампании, музикални клипове, съдържание за социални медии (Reels, TikTok, Shorts), корпоративни бранд видеа, документални филми за пътувания и продуктови реклами. Ако имаш уникален проект, нека поговорим — обичам творческите предизвикателства.',
  },
  {
    id: 'faq-2',
    question: 'Колко време отнема один типичен проект?',
    answer: 'Времето за изработка зависи от обема. Кратките клипове за социални медии обикновено отнемат 1–2 работни дни. За по-големи проекти се споразумяваме за сроковете предварително. Предлага се и експресна изработка срещу допълнително заплащане.',
  },
  {
    id: 'faq-3',
    question: 'Какъв софтуер използваш?',
    answer: 'Основните ми инструменти са Adobe Premiere Pro и CapCut. За моушън графика използвам After Effects. Също така използвам Photoshop, ако е необходимо.',
  },
  {
    id: 'faq-4',
    question: 'Колко ревизии (корекции) са включени?',
    answer: 'Всички проекти включват стандартно 3 кръга от корекции. Това обхваща корекции по монтажа, преходите, синхронизирането на музиката и цветовете. Могат да бъдат уговорени допълнителни ревизии. Стремя се да уловя визията още от първия вариант, така че корекции се налагат рядко.',
  },
  {
    id: 'faq-6',
    question: 'Предлагаш ли абонаментни планове?',
    answer: 'Да! За клиенти, които се нуждаят от регулярно съдържание (напр. месечни пакети за социални медии), предлагам абонаментни планове с отстъпка. Това гарантира приоритетна изработка и последователен стил на монтаж на цялото ти съдържание.',
  },
  {
    id: 'faq-7',
    question: 'Как да ти изпратя моите кадри?',
    answer: 'Можеш да споделяш файлове чрез Google Drive, WeTransfer, Dropbox или друго облачно пространство, което предпочиташ. За много големи проекти можем да обсъдим и други опции за прехвърляне. Просто ми пиши и ще измислим най-лесния начин.',
  },
  {
    id: 'faq-8',
    question: 'Как да започнем?',
    answer: 'Лесно е — пиши ми на лично съобщение в Instagram или изпрати имейл, описващ проекта ти. Включи типа видео, приблизителната дължина, краен срок и референтни видеа, които харесваш. Ще ти отговоря до 24 часа с оферта и срокове.',
  },
];

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'vt-westfit',
    name: 'Уестли Харисън',
    role: 'Онлайн фитнес треньор',
    thumb: '',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/testimonials/Westly.mp4?v=2',
  },
  {
    id: 'vt-corbin',
    name: 'Корбин Силк',
    role: 'Предприемач и бизнес коуч',
    thumb: '',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/testimonials/Corbin.mp4?v=2',
  },
  {
    id: 'vt-client-1',
    name: 'Мухамед',
    role: 'Създател на съдържание',
    thumb: '',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/testimonials/Muhammad.mp4?v=2',
  },
  {
    id: 'vt-client-2',
    name: 'Едуард',
    role: 'Собственик на бизнес',
    thumb: '',
    videoUrl: 'https://itsnotsimple.github.io/portfolio-media/testimonials/Edward.mp4?v=2',
  },
];

// ── Client Results (image gallery) ────────────────────────
export const RESULTS_SECTION = {
  tag: 'Резултати',
  heading: 'Резултати от',
  headingAccent: 'клиентите',
  subtitle: 'Визуално доказателство за растеж, ангажираност и вирусен обхват.',
} as const;

export const RESULTS: ClientResult[] = [
  { src: '/images/results/result-1.webp' },
  { src: '/images/results/result-2.webp' },
  { src: '/images/results/result-3.webp' },
  { src: '/images/results/result-4.webp' },
];

// ── Before / After (color grading) ────────────────────────
export const BEFORE_AFTER = {
  tag: 'Цветови корекции и грейдинг',
  heading: 'Виж',
  headingAccent: 'разликата',
  subtitle: 'Сравнение едно до друго на суровия кадър с финалния грейд.',
  beforeLabel: 'Преди',
  afterLabel: 'След',
  hint: 'Сравни цветовете',
  beforeVideoUrl: 'https://itsnotsimple.github.io/portfolio-media/grading/before.mp4?v=2',
  afterVideoUrl: 'https://itsnotsimple.github.io/portfolio-media/grading/after.mp4?v=2',
} as const;
