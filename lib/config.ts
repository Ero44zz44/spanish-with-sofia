// ============================================================
//  VIBIE TUTOR TEMPLATE — SITE CONFIG
//  Edit only this file + drop images into /public to deploy.
// ============================================================

export const siteConfig = {
  // ─── Brand ──────────────────────────────────────────────
  brand: {
    name: "Spanish with Sofía",
    tutorName: "Sofía Martínez",
    tagline: "Native Mexican Spanish Tutor",
    location: "Mexico City",
    accentColor: "#C05A35",
    email: "sofia@spanishwithsofia.com",
    phone: "+52 55 1234 5678",
    whatsapp: "https://wa.me/525512345678",
    instagram: "https://instagram.com/spanishwithsofia",
    instagramHandle: "@spanishwithsofia",
    timezone: "America/Los_Angeles",
    tzLabel: "Los Angeles (GMT−8)",
    reviewScore: 4.9,
    reviewCount: 127,
    studentCount: "500+",
    countryCount: 18,
    yearsExperience: 8,
  },

  // ─── SEO ────────────────────────────────────────────────
  seo: {
    title: "Spanish with Sofía — Native Mexican Spanish Tutor Online",
    description:
      "Personalized 1-on-1 Spanish lessons with a native Mexican teacher. Build real conversational fluency in 90 days.",
    url: "https://spanishwithsofia.com",
  },

  // ─── Navigation ─────────────────────────────────────────
  nav: {
    links: [
      { label: "About", href: "#about" },
      { label: "Lessons", href: "#lessons" },
      { label: "Results", href: "#results" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: { label: "Book Free Trial", href: "/book" },
  },

  // ─── Hero ───────────────────────────────────────────────
  hero: {
    eyebrow: "Native Spanish Tutor from Mexico City",
    headline: "Speak Spanish\nWith Confidence",
    headlineSuffix: "in 90 Days.",
    subheadline:
      "Personalized 1-on-1 lessons with a native Mexican teacher. Build real fluency — not just grammar rules.",
    primaryCta: { label: "Book Your Free Trial", href: "/book" },
    secondaryCta: { label: "See student results", href: "#results" },
    stats: [
      { number: "4.9/5", label: "student rating" },
      { number: "500+", label: "students taught" },
      { number: "18", label: "countries" },
    ],
    // Set videoSrc to a YouTube/Vimeo URL or mp4 path, or null to show image only
    videoSrc: null as string | null,
    videoPoster: "/placeholders/hero-video-poster.jpg",
    image: "/sofia-hero.jpg",
  },

  // ─── Why Nothing Else Worked ────────────────────────────
  problem: {
    eyebrow: "Sound familiar?",
    headline: "You've tried everything.\nSpanish still feels out of reach.",
    cards: [
      {
        icon: "Smartphone" as const,
        title: "Apps kept you busy, not fluent",
        description:
          "Duolingo streaks feel productive. But you still freeze the moment a native speaker talks to you.",
      },
      {
        icon: "Users" as const,
        title: "Group classes moved too fast",
        description:
          "You sat in the back, afraid to speak, while the teacher rushed through conjugations you'd already forgotten.",
      },
      {
        icon: "BookOpen" as const,
        title: "Textbooks taught a language nobody speaks",
        description:
          "You can write \"the library is on the second floor\" but can't order coffee the way real Mexicans do.",
      },
    ],
    transitionLine:
      "The problem isn't you. It's the method. Real fluency comes from real conversation — from day one.",
    cta: { label: "Start speaking from lesson 1", href: "/book" },
  },

  // ─── About ──────────────────────────────────────────────
  about: {
    eyebrow: "About Sofía",
    headline: "Hola, I'm Sofía.",
    storyHook:
      "I grew up in Mexico City in a house full of storytellers. My grandmother could hold a room for hours — just with words. That's the kind of Spanish I want to teach you.",
    paragraph2:
      "After completing my Master's in Applied Linguistics at UNAM, I started teaching adults who'd hit a wall with apps and classroom courses. In 8 years, I've taught 500+ students from 18 countries — professionals, retirees, expats settling in Mexico, and travelers who just want to order the right thing at a taqueria.",
    paragraph3:
      "My method is simple: we talk. About your life, your work, your upcoming trip. Grammar follows naturally. Mistakes are expected. Fluency comes from the first lesson, not the fiftieth.",
    pullQuote: "\"I don't teach Spanish. I teach you to think in Spanish.\"",
    portrait: "/sofia-about.jpg",
    secondaryImage: "/placeholders/about-secondary.jpg",
    credentials: [
      "Master's in Applied Linguistics, UNAM",
      "DELE & CEDEEM certified Spanish teacher",
      "8 years teaching adults from 30+ countries",
      "Native speaker of Mexican Spanish",
    ],
    cta: { label: "Book a free 30-min trial", href: "/book" },
  },

  // ─── Lessons / Offers ───────────────────────────────────
  offers: {
    eyebrow: "Lessons",
    headline: "Choose your path to fluency",
    subheadline:
      "All lessons are 1-on-1, live on Zoom, with notes sent after every session.",
    guarantee: "Not happy after your first lesson? You pay nothing. No questions asked.",
    items: [
      {
        badge: null as string | null,
        title: "Conversational Spanish",
        price: "$35",
        priceSubtext: "/ hour",
        description:
          "Build real speaking confidence through structured conversations on topics that matter to you.",
        features: [
          "60-minute live Zoom sessions",
          "Custom conversation topics",
          "Vocabulary & phrase notes after each class",
          "Audio recordings to review",
          "Flexible scheduling",
        ],
        bestFor: "Beginners who want to talk, not just read grammar rules",
        cta: "Book a trial",
        href: "/book",
      },
      {
        badge: "Most Popular" as string | null,
        title: "Business Spanish",
        price: "$45",
        priceSubtext: "/ hour",
        description:
          "Master professional Spanish for meetings, emails, presentations, and negotiations in your industry.",
        features: [
          "Industry-specific vocabulary",
          "Email & presentation templates",
          "Role-play business scenarios",
          "LinkedIn-level written Spanish",
          "Priority scheduling",
        ],
        bestFor: "Professionals working with Latin American clients or relocating",
        cta: "Book a trial",
        href: "/book",
      },
      {
        badge: null as string | null,
        title: "DELE Exam Prep",
        price: "$40",
        priceSubtext: "/ hour",
        description:
          "Structured preparation for the official DELE Spanish proficiency exam at your target level.",
        features: [
          "Full DELE curriculum (A2–C1)",
          "Timed practice tests",
          "All four skill areas",
          "Progress tracking",
          "Exam strategy coaching",
        ],
        bestFor: "Students aiming for DELE A2, B1, B2, or C1 certification",
        cta: "Book a trial",
        href: "/book",
      },
    ],
  },

  // ─── Student Results ────────────────────────────────────
  results: {
    eyebrow: "Student transformations",
    headline: "Real results. Real people.",
    items: [
      {
        photo: "/placeholders/result-1.jpg",
        name: "Sarah, 34",
        context: "Marketing Director · USA",
        before: "Couldn't hold a 2-minute conversation after 2 years of Duolingo",
        after: "Had a 45-minute call with her partner's family in Guadalajara",
        timeframe: "6 months",
        quote: "For the first time, I actually understood what was being said around me.",
      },
      {
        photo: "/placeholders/result-2.jpg",
        name: "James, 41",
        context: "Software Engineer · UK",
        before: "Failed DELE B2 twice. Convinced he had 'no ear for languages'",
        after: "Passed DELE B2 on his first attempt with Sofía",
        timeframe: "4 months",
        quote: "She fixed something in the way I was approaching the speaking test. Night and day.",
      },
      {
        photo: "/placeholders/result-3.jpg",
        name: "Lisa, 52",
        context: "Retired Teacher · Canada",
        before: "Needed Business Spanish for her new consulting role",
        after: "Runs weekly calls with Mexico City clients entirely in Spanish",
        timeframe: "3 months",
        quote: "My team noticed the difference before I even realized how far I'd come.",
      },
    ],
  },

  // ─── How It Works ───────────────────────────────────────
  process: {
    eyebrow: "How it works",
    headline: "From zero to speaking in 3 steps",
    steps: [
      {
        number: "01",
        icon: "CalendarCheck" as const,
        title: "Book your free trial",
        description:
          "Pick a 30-minute slot. No payment needed. Just show up and let's talk.",
      },
      {
        number: "02",
        icon: "Video" as const,
        title: "Meet on Zoom",
        description:
          "We assess your level, talk about your goals, and you'll experience the teaching style firsthand.",
      },
      {
        number: "03",
        icon: "TrendingUp" as const,
        title: "Start speaking Spanish",
        description:
          "We build a custom plan around your schedule. You leave every lesson with tools you can use right away.",
      },
    ],
    cta: { label: "Book your free trial now", href: "/book" },
  },

  // ─── Video Testimonials ─────────────────────────────────
  videoTestimonials: {
    eyebrow: "Hear it from them",
    headline: "Students in their own words",
    items: [
      {
        poster: "/placeholders/video-testimonial-1.jpg",
        videoSrc: null as string | null,
        name: "Sarah M.",
        caption: "From zero to family dinner conversations in 6 months",
      },
      {
        poster: "/placeholders/video-testimonial-2.jpg",
        videoSrc: null as string | null,
        name: "James K.",
        caption: "DELE B2 certified after failing twice",
      },
      {
        poster: "/placeholders/video-testimonial-3.jpg",
        videoSrc: null as string | null,
        name: "Lisa R.",
        caption: "Running client calls in Spanish after 3 months",
      },
    ],
  },

  // ─── Written Testimonials ───────────────────────────────
  testimonials: {
    eyebrow: "Reviews",
    headline: "What my students say",
    ratingScore: "4.9",
    ratingCount: "127 verified reviews on iTalki",
    items: [
      {
        quote:
          "Sofía completely changed how I approach Spanish. After 6 months I had a real conversation with my partner's grandmother in Mexico for the first time. Worth every penny.",
        name: "Sarah M.",
        location: "Los Angeles, USA",
        photo: "/placeholders/testimonial-1.jpg",
      },
      {
        quote:
          "I tried Babbel, Duolingo, and 3 other tutors before finding Sofía. She's patient, organized, and makes lessons genuinely fun. Passed my DELE B2 on the first try.",
        name: "James K.",
        location: "London, UK",
        photo: "/placeholders/testimonial-2.jpg",
      },
      {
        quote:
          "I needed Business Spanish for my new role. Sofía built a custom curriculum around my industry vocabulary. My team noticed the difference in 2 months.",
        name: "Lisa R.",
        location: "Toronto, Canada",
        photo: "/placeholders/testimonial-3.jpg",
      },
      {
        quote:
          "The way Sofía explains grammar is unlike any teacher I've had. She makes it feel obvious in context. My confidence has skyrocketed.",
        name: "Marco T.",
        location: "Sydney, Australia",
        photo: "/placeholders/testimonial-4.jpg",
      },
      {
        quote:
          "I'm retiring to the Yucatan in a year and was terrified I'd never communicate properly. Six lessons in and I'm already having real conversations.",
        name: "Patricia W.",
        location: "Chicago, USA",
        photo: "/placeholders/testimonial-5.jpg",
      },
      {
        quote:
          "Sofía noticed I was shy about speaking and designed lessons that eased me in without embarrassment. Now I volunteer to speak first.",
        name: "Annika B.",
        location: "Stockholm, Sweden",
        photo: "/placeholders/testimonial-6.jpg",
      },
    ],
  },

  // ─── FAQ ────────────────────────────────────────────────
  faq: {
    eyebrow: "Questions",
    headline: "Everything you need to know",
    subheadline:
      "Not seeing your question? Send me a message and I'll reply within 24 hours.",
    items: [
      {
        question: "Do I need any prior Spanish experience?",
        answer:
          "Not at all. I work with absolute beginners every week. My first lesson is designed to assess exactly where you are and what you need.",
      },
      {
        question: "How long are the lessons?",
        answer:
          "Standard lessons are 60 minutes. I also offer 30-minute and 90-minute sessions depending on your preference and goals.",
      },
      {
        question: "What platform do we use?",
        answer:
          "All lessons happen on Zoom with screen sharing and an interactive whiteboard. You'll get a summary with new vocabulary and homework after every session.",
      },
      {
        question: "Can I cancel or reschedule?",
        answer:
          "Yes. Cancel or reschedule up to 24 hours before your lesson at no charge. Life happens.",
      },
      {
        question: "How quickly will I see results?",
        answer:
          "Most students can hold a basic conversation within 4–6 weeks of consistent study. You'll leave every single lesson with something new you can use immediately.",
      },
      {
        question: "Do you teach kids?",
        answer:
          "I specialize in adult learners (18+). Adults learn differently and benefit from a completely different approach than children.",
      },
      {
        question: "What if I miss time between lessons?",
        answer:
          "I keep detailed notes on every student. We'll review before moving forward. Consistency matters, but life happens — no judgment.",
      },
      {
        question: "Is the trial lesson really free?",
        answer:
          "Yes. Completely free. No credit card required. No commitment. Just 30 minutes to see if we're a good fit.",
      },
    ],
    bottomText: "Still have questions?",
    bottomEmail: "sofia@spanishwithsofia.com",
  },

  // ─── Final CTA ──────────────────────────────────────────
  finalCta: {
    eyebrow: "Free first lesson",
    headline: "Ready to start speaking Spanish?",
    subheadline:
      "Book your free 30-minute trial. No payment required. No commitment. Just a conversation.",
    primaryCta: { label: "Book your free trial", href: "/book" },
    secondaryCta: {
      label: "Send me a message first",
      href: "mailto:sofia@spanishwithsofia.com",
    },
    trustLine: "4.9/5 from 127 reviews · No credit card · Cancel anytime",
  },

  // ─── Contact ────────────────────────────────────────────
  contact: {
    eyebrow: "Get in touch",
    headline: "Let's talk",
    description:
      "Have questions before booking? Send me a message and I'll reply within 24 hours.",
    successMsg: "Message sent! I'll reply within 24 hours.",
    errorMsg: "Something went wrong. Please try emailing me directly.",
  },

  // ─── Footer ─────────────────────────────────────────────
  footer: {
    tagline:
      "Native Mexican Spanish tutor helping English speakers build real fluency online.",
    copyright: "© 2026 Spanish with Sofía",
    madeIn: "Mexico City",
    columns: {
      navigate: {
        label: "Navigate",
        links: [
          { label: "About", href: "#about" },
          { label: "Lessons", href: "#lessons" },
          { label: "Results", href: "#results" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      lessons: {
        label: "Lessons",
        links: [
          { label: "Conversational Spanish", href: "/book" },
          { label: "Business Spanish", href: "/book" },
          { label: "DELE Exam Prep", href: "/book" },
          { label: "Spanish for Travel", href: "/book" },
        ],
      },
    },
  },
};

// ─── Legacy exports (for booking/admin compatibility) ────────
export const TUTOR = {
  name: siteConfig.brand.tutorName,
  tagline: siteConfig.brand.tagline,
  email: siteConfig.brand.email,
  phone: siteConfig.brand.phone,
  whatsapp: siteConfig.brand.whatsapp,
  instagram: siteConfig.brand.instagram,
  instagramHandle: siteConfig.brand.instagramHandle,
  timezone: siteConfig.brand.timezone,
  tzLabel: siteConfig.brand.tzLabel,
  tzOffset: -8,
  city: "Los Angeles, CA",
  reviewCount: siteConfig.brand.reviewCount,
  reviewScore: siteConfig.brand.reviewScore,
  studentCount: siteConfig.brand.studentCount,
  countryCount: siteConfig.brand.countryCount,
  yearsExperience: siteConfig.brand.yearsExperience,
} as const;

export const SITE = {
  url: siteConfig.seo.url,
  name: siteConfig.brand.name,
  description: siteConfig.seo.description,
} as const;
