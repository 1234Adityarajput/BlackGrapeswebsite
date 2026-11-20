import foundersImg from '../frontend/src/assets/founders.jpg';
import aboutHeroImg from '../frontend/src/assets/about-hero.jpg';
import workspaceImg from '../frontend/src/assets/workspace.jpg';
import logoImg from '../frontend/src/assets/bgst-logo.png';
import { PRODUCTS_LIST } from '../frontend/src/pages/OurProducts/productsData.js';
import { CLIENTS_LIST, CLIENT_CASE_STUDIES, CLIENT_TESTIMONIALS } from '../frontend/src/pages/OurClients/clientsData.js';

export const DEFAULT_SITE_SETTINGS = {
  id: 'settings-1',
  site_name: 'Black Grapes Softech Pvt. Ltd.',
  tagline: 'Empowering Enterprises Worldwide with Next-Gen Tech',
  logo_url: logoImg,
  favicon_url: '/favicon.svg',
  primary_email: 'info@blackgrapessoftech.com',
  support_email: 'support@blackgrapessoftech.com',
  primary_phone: '+91 7470997884',
  secondary_phone: '+91 6262414463',
  office_address: '252-F/H Scheme No 54, Vijaynagar, Indore - 452010, Madhya Pradesh, India',
  top_strip_text: 'Empowering Enterprises Worldwide with Next-Gen Tech',
  top_strip_enabled: true,
  brand_title: 'BLACK GRAPES',
  brand_subtitle: 'SOFTECH • IT INNOVATION',
  top_bar_pill: 'Accepting New Projects',
  top_bar_badge: 'Apprenticeship & Partner Program Open',
  top_bar_location: 'Indore, MP, India',
  header_cta_text: 'Get Quote / Demo',
  header_cta_short: 'Quote',
  header_cta_action: 'modal',
  header_cta_link: '/contact-us',
  social_linkedin: 'https://www.linkedin.com/in/black-grapes-softech/',
  social_twitter: 'https://twitter.com/grapessoftech',
  social_instagram: 'https://www.instagram.com/blackgrapessoftech/',
  social_youtube: 'https://www.youtube.com/channel/UC3gJA06Uxb0D82-PVJl0SbQ',
  footer_about_text: 'We are an innovative IT solutions & custom software development company based in Indore, India. Empowering businesses across the globe with robust, scalable, and tailored digital products.',
  footer_trust_badge: 'ISO & Quality Assured Development Standards',
  copyright_text: `© ${new Date().getFullYear()} Black Grapes Softech Pvt. Ltd. All rights reserved.`,
  footer_services_title: 'Services Hub',
  footer_services_link: '/services',
  footer_services_links: [
    { label: 'Software Development', path: '/services' },
    { label: 'Mobile App Engineering', path: '/services' },
    { label: 'Enterprise CRM & ERP', path: '/services' },
    { label: 'MLM Software Systems', path: '/services' },
    { label: 'Web Portals & Cloud Apps', path: '/services' },
    { label: 'Digital Growth & SEO', path: '/services' },
    { label: 'UI/UX & Brand Systems', path: '/services' },
    { label: 'Interactive Game Dev', path: '/services' }
  ],
  footer_solutions_title: 'Solutions & Ecosystem',
  footer_solutions_links: [
    { label: 'Proprietary Software Catalog', path: '/products' },
    { label: 'Client Case Studies', path: '/clients' },
    { label: 'IT & Technical Staffing', path: '/it-staffing' },
    { label: 'E-Commerce & Hardware', path: '/ecommerce' },
    { label: 'Partner Program (ODC)', path: '/partnership' },
    { label: 'About Black Grapes', path: '/about' }
  ],
  footer_demo_btn_text: 'Request a Live Demo',
  footer_demo_btn_enabled: true,
  footer_contact_title: 'Contact & Offices',
  footer_office_1_label: 'Registered Office:',
  footer_office_2_label: 'Corporate Office:',
  footer_email_label: 'Direct Inquiries:',
  footer_phone_label: 'Call / WhatsApp:',
  footer_newsletter_title: 'Stay Updated:',
  footer_newsletter_placeholder: 'Enter business email',
  footer_newsletter_enabled: true,
  footer_bottom_links: [
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Products', path: '/products' },
    { label: 'Contact', path: '/contact' }
  ],
  footer_crafted_text: 'Crafted with ❤️ in Indore, India',
  maintenance_mode: false,
  google_analytics_id: 'G-XXXXXXXXXX',
  custom_head_scripts: ''
};

export const DEFAULT_MENUS = [
  { id: 'm-1', label: 'Home', path: '/', order_index: 1, is_active: true },
  { id: 'm-2', label: 'About Us', path: '/about', order_index: 2, is_active: true },
  { id: 'm-3', label: 'Services', path: '/services', order_index: 3, is_active: true },
  { id: 'm-4', label: 'Our Products', path: '/products', order_index: 4, is_active: true },
  { id: 'm-5', label: 'Our Clients', path: '/clients', order_index: 5, is_active: true },
  { id: 'm-6', label: 'Contact', path: '/contact', order_index: 6, is_active: true }
];

export const DEFAULT_HOME_PAGE = {
  hero: {
    badge: '10+ Years of Proven IT Excellence • Indore, India',
    prefix: 'INNOVATE. INTEGRATE. ELEVATE.',
    title_line1: 'And Digitalize Your Ideas',
    break_text: 'into Success via',
    brand_highlight: 'BLACK GRAPES SOFTECH',
    suffix_inline: 'Where Innovation',
    suffix: 'And ideas Meets Excellence.',
    description: 'Get Free Consultation From Our Industry Experts. We engineer scalable custom software, iOS & Android mobile apps, enterprise CRMs, MLM platforms, and high-conversion websites for ambitious startups and global enterprises.',
    cta_primary_text: 'Request a Demo',
    cta_secondary_text: 'Get the offer',
    techBadges: [
      { name: 'React', category: 'Frontend' },
      { name: 'Flutter', category: 'Mobile' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'Python', category: 'AI & Data' },
      { name: 'Next.js', category: 'Full Stack' },
      { name: 'iOS / Swift', category: 'Native' },
      { name: 'Android / Kotlin', category: 'Native' },
      { name: 'AWS Cloud', category: 'DevOps' },
      { name: 'Custom CRM', category: 'Enterprise' },
      { name: 'MLM Engines', category: 'FinTech' }
    ]
  },
  clockPhilosophy: {
    eyebrow: 'BLACK GRAPES PHILOSOPHY • PURPOSEFUL BEGINNINGS',
    titlePrefix: 'MORE THAN A SERVICE. ',
    titleHighlight: 'A COMMITMENT TO TIME & SCALE.',
    description: 'Every transformative enterprise starts with a decisive moment. At Black Grapes Group, our approach embodies purposeful beginnings, engineering rigor, and the execution power to turn ambitious visions into enduring realities.',
    mantraPills: ['BEGIN WITH PURPOSE', 'ENGINEER WITH RIGOR', 'DELIVER ON TIME'],
    pillarBadge: '01 / THE TIMELESS PRINCIPLE',
    pillarTitle: 'A MOMENT OF PURPOSE. A BEGINNING OF POSSIBILITIES.',
    pillarParagraphs: [
      'In Indian tradition, Shubh Muhurat & Brahma Muhurta symbolizes the peak window of mental clarity, creative power, and spiritual resolve when the groundwork for monumental achievements is laid.',
      'Inspired by this timeless philosophy, our Black Grapes delivery model represents the conviction that every milestone project deserves undivided focus, zero technical shortcuts, and absolute punctuality.',
      'Whether launching a complex ERP system, validating property for a ₹50-crore bank facility, or securing municipal Naksha Pass approvals, we make every second of execution count.'
    ],
    quoteText: 'Every great vision deserves its defining moment. At Black Grapes, we ensure that moment leads to unquestioned market leadership.'
  },
    servicesSection: {
    badge: 'WHAT WE DO',
    titlePrefix: 'We Provide Best Quality Services & Products At ',
    titleHighlight: 'Affordable Price',
    subtitle: 'Here is the list of specialized IT services and scalable digital solutions that we provide to elevate your business.',
    services: [
      {
        id: 'website-development',
        title: 'Website Designing and Development',
        shortDesc: 'High-speed, responsive, custom websites and enterprise web applications engineered for engagement and conversion.',
        image: '/images/Website-Designing.jpg',
        tags: ['React', 'Next.js', 'SEO Optimized', 'Responsive UI', 'Custom CMS']
      },
      {
        id: 'mobile-app',
        title: 'Mobile App Development',
        shortDesc: 'Native and cross-platform mobile apps for Android and iOS with fluid animations and rock-solid offline support.',
        image: '/images/app.jpg',
        tags: ['Flutter', 'React Native', 'iOS / Android', 'Firebase', 'API Sync']
      },
      {
        id: 'software-development',
        title: 'Software Development',
        shortDesc: 'Custom business software, ERP systems, and automated enterprise workflows built for speed and reliability.',
        image: '/images/Software.jpg',
        tags: ['Custom ERP', 'Microservices', 'Cloud Database', 'Python / Node', 'API Gateway']
      },
      {
        id: 'crm-software',
        title: 'CRM Software Development',
        shortDesc: 'Custom CRM platforms to track leads, automate sales pipelines, and empower customer success teams.',
        image: '/images/crm-1.png',
        tags: ['Lead Scoring', 'Pipeline Automation', 'WhatsApp Integration', 'Role Access']
      },
      {
        id: 'mlm-software',
        title: 'MLM Software Development',
        shortDesc: 'High-performance Multi-Level Marketing software with binary, matrix, unilevel plans and secure digital wallets.',
        image: '/images/mlm-software.png',
        tags: ['Binary / Matrix Plans', 'Digital Wallet', 'Genealogy Tree', 'Auto Payouts']
      },
      {
        id: 'digital-marketing',
        title: 'Digital Marketing',
        shortDesc: 'Data-backed SEO, Google Ads, Meta campaigns, and growth strategies that generate qualified client leads.',
        image: '/images/digital-marketing.jpg',
        tags: ['SEO & SEM', 'Social Media', 'Lead Funnels', 'Google Ads', 'Content Growth']
      },
      {
        id: 'graphic-designing',
        title: 'Graphic Designing',
        shortDesc: 'Impactful brand visual identity, UI/UX prototyping, marketing graphics, and custom illustration assets.',
        image: '/images/Graphic-Design-Black-Grapes-Softech.jpg',
        tags: ['Figma UI/UX', 'Brand Identity', 'Vector Graphics', 'Social Kits', '3D Art']
      },
      {
        id: 'game-development',
        title: 'Game Development',
        shortDesc: 'Captivating 2D & 3D games across mobile, web, and desktop with smooth physics and addictive gameplay.',
        image: '/images/Game-Development.jpg',
        tags: ['Unity 3D', 'WebGL', 'Cross-Platform', 'Physics Engine', 'In-Game Store']
      }
    ],
    tendering: {
      badge: 'GOVERNMENT & PRIVATE TENDERS',
      title: 'Specialized Tendering & e-Procurement Technical Services',
      desc: 'Black Grapes Softech provides end-to-end technical documentation, GeM portal technical bidding, architecture compliance, and software delivery for government and corporate procurement tenders.',
      pills: [
        '✓ GeM Portal Compliance',
        '✓ Technical RFP Preparation',
        '✓ Enterprise Security Certification'
      ],
      btnText: 'Consult Tender Experts'
    }
  },
    aboutSection: {
    badge: "ABOUT BLACK GRAPES SOFTECH",
    mainTitle: "Your Strategic Partner for Digital Innovation & Enterprise Software",
    subtitle: "We transform complex business requirements into high-velocity digital products with clean code, scalable architecture, and reliable delivery.",
    showcaseImage: "/images/blackgrapes-1.png",
    experienceYears: "10+ Years",
    experienceLabel: "of IT & Software Innovation",
    techBadgeText: "Web • Mobile • Cloud • AI",
    innovationImage: "/images/tech-innovation.jpg",
    innovationTag: "AI & CLOUD ARCHITECTURE",
    innovationKpi: "⚡ 99.9% Uptime • Global Data Flow",
    innovationTitle: "High-Velocity Software Ecosystems",
    innovationBadge: "Enterprise Ready",
    innovationDesc: "Architecting resilient microservices, distributed cloud backends, and smart automation pipelines that empower modern digital enterprises.",
    innovationChips: ["Microservices", "Cloud Network", "API Gateways", "Automated CI/CD"],
    lifecycleTitle: "Full Lifecycle Engineering",
    lifecycleDesc: "From technical discovery to deployment and 24/7 proactive monitoring, we build software engineered to scale with your enterprise.",
    narrativeHeading: "Engineering Software That Accelerates Business Growth",
    primaryParagraph: "Black Grapes Softech is an enterprise IT consulting and custom software development company based in Indore, India. We specialize in architecting modern web platforms, iOS & Android applications, CRM & ERP systems, and cloud-native solutions that empower global enterprises to innovate faster and scale with confidence.",
    secondaryParagraph: "With over 10 years of software engineering expertise and 150+ successful client deployments worldwide, our dedicated engineers deliver scalable, secure, and business-focused software tailored precisely to your operational requirements.",
    coreValues: [
      {
        title: "Passionate Craftsmanship",
        desc: "Relentless attention to code quality, modern UX patterns, and zero compromises on software reliability."
      },
      {
        title: "End-to-End Customization",
        desc: "Tailored architecture built specifically around your enterprise workflows rather than cookie-cutter templates."
      },
      {
        title: "Affordable Enterprise Tech",
        desc: "High-grade engineering delivered at competitive rates, giving startups and SMBs an unfair advantage."
      }
    ],
    qaItems: [
      {
        q: "The purpose of life coaching & IT strategy?",
        a: "Strategic alignment between your commercial vision and technical infrastructure. We formulate tech roadmaps that empower teams and maximize business viability."
      },
      {
        q: "Past, present & future digital exercise",
        a: "Reviewing legacy blockers, optimizing current workflows, and future-proofing architectures with cloud scalability and AI readiness."
      },
      {
        q: "How do you perceive value & ROI?",
        a: "Value is measured in operational hours saved, conversions multiplied, and systems that seamlessly scale without compounding overhead."
      }
    ]
  },
  projectsSection: {
    badge: 'PORTFOLIO SHOWCASE',
    titlePrefix: 'Our Projects & ',
    titleHighlight: 'Proven Deliveries',
    subtitle: 'Explore a selection of successful client products spanning web applications, iOS/Android apps, and eCommerce engines.',
    projects: [
      {
        name: 'www.borit.com',
        category: 'Website',
        type: 'Corporate Web Experience',
        desc: 'Precision engineering corporate portal with sleek branding and multi-language support.',
        url: 'https://www.borit.com',
        status: 'Live Production'
      },
      {
        name: 'blushandbloom.co.in',
        category: 'E-Commerce',
        type: 'Luxury Cosmetics & Lifestyle',
        desc: 'High-conversion D2C cosmetics eCommerce platform with seamless checkout and inventory sync.',
        url: 'https://blushandbloom.co.in',
        status: 'Live Production'
      },
      {
        name: 'atonfitness.in',
        category: 'Website',
        type: 'Health & Fitness Platform',
        desc: 'Interactive fitness training, membership management, and workout schedule ecosystem.',
        url: 'https://atonfitness.in',
        status: 'Live Production'
      },
      {
        name: 'IOS App - ReadMore',
        category: 'Android / IOS - Mobile Apps',
        type: 'Digital Reading & E-Book Utility',
        desc: 'Feature-rich iOS reader application with personalized annotations, dark mode, and cloud sync.',
        url: '#',
        status: 'Live Production'
      },
      {
        name: 'IOS App - DBT 24/7',
        category: 'Android / IOS - Mobile Apps',
        type: 'FinTech & Banking Service App',
        desc: 'Secure mobile banking utility with biometric login, real-time transfers, and statement generator.',
        url: '#',
        status: 'Live Production'
      },
      {
        name: 'IOS App - Beauty Counter',
        category: 'Android / IOS - Mobile Apps',
        type: 'Cosmetics Catalog & Consultation',
        desc: 'Modern beauty tech iOS app with AR shade finder and scheduled expert consultations.',
        url: '#',
        status: 'Live Production'
      },
      {
        name: 'Android App - Eduvacancy - Teaching Jobs',
        category: 'Android / IOS - Mobile Apps',
        type: 'Education Recruitment Portal',
        desc: 'Scalable Android recruitment app connecting verified educators with top academic institutions.',
        url: '#',
        status: 'Live Production'
      },
      {
        name: 'Android App - HoneyliaEmart',
        category: 'Android / IOS - Mobile Apps',
        type: 'Hyperlocal E-Commerce & Delivery',
        desc: 'Real-time grocery and essentials ordering app with driver GPS tracking and instant wallet pay.',
        url: '#',
        status: 'Live Production'
      },
      {
        name: 'www.jobberman.com',
        category: 'Web Apps',
        type: 'Enterprise Career Portal',
        desc: 'High-volume recruitment engine with algorithmic candidate matching and resume parser.',
        url: 'https://www.jobberman.com',
        status: 'Live Production'
      },
      {
        name: 'Stavanger Parkering',
        category: 'Web Apps',
        type: 'Smart Mobility & Parking System',
        desc: 'Intelligent parking reservation, real-time sensor occupancy visualization, and automated billing.',
        url: '#',
        status: 'Live Production'
      },
      {
        name: 'DC Shoes',
        category: 'E-Commerce',
        type: 'Global Apparel & Footwear Store',
        desc: 'Action sports apparel digital storefront with high-traffic seasonal sale infrastructure.',
        url: '#',
        status: 'Live Production'
      },
      {
        name: 'Pikto.com',
        category: 'Web Apps',
        type: 'Creative Visual Media SaaS',
        desc: 'Cloud-based visual editing and asset management suite with real-time browser rendering.',
        url: 'https://pikto.com',
        status: 'Live Production'
      }
    ],
    bottomCta: {
      text: "Have a project in mind? Let's turn your concept into our next featured success story.",
      btnText: "Start Your Project With Us"
    }
  },
  testimonialsSection: {
    badge: 'WHAT PEOPLE ARE SAYING',
    titlePrefix: 'Preparing For Your Success • ',
    titleHighlight: 'Trusted Source In IT Services',
    subtitle: 'See how Black Grapes Softech delivers real business transformation for leaders and founders.',
    testimonials: [
      {
        name: 'Subodh Bhandari',
        role: 'Enterprise Client',
        rating: 5,
        ratingScore: '5.0 / 5.0 Rating',
        verifiedBadge: '✓ Verified Client',
        quote: 'I have had the pleasure of working with Black Grapes Softech Company for the past few years, and I can confidently say that they have significantly transformed our business operations. Their software solutions have not only streamlined our processes but also boosted our efficiency and productivity to new heights.',
        avatar: 'SB'
      },
      {
        name: 'Kartik Mali',
        role: 'Business Director',
        rating: 5,
        ratingScore: '5.0 / 5.0 Rating',
        verifiedBadge: '✓ Verified Client',
        quote: 'From the moment we engaged with Black Grapes Softech, their team demonstrated a deep understanding of our unique business needs. They took the time to listen to our challenges, goals, and aspirations and then tailored their software solutions to meet our specific requirements. The level of customization and flexibility they provided was truly impressive.',
        avatar: 'KM'
      },
      {
        name: 'Joel Burdine',
        role: 'Senior UI/UX Designer',
        rating: 5,
        ratingScore: '5.0 / 5.0 Rating',
        verifiedBadge: '✓ Verified Client',
        quote: 'Working alongside Black Grapes Softech was seamless. Their engineering team takes Figma designs and elevates them with pixel-perfect attention to detail and fluid micro-animations that deliver world-class digital experiences.',
        avatar: 'JB'
      },
      {
        name: 'Ashley Hoyt',
        role: 'Creative Director',
        rating: 5,
        ratingScore: '5.0 / 5.0 Rating',
        verifiedBadge: '✓ Verified Client',
        quote: 'Black Grapes Softech delivered our app ahead of schedule with zero major bugs. Their transparent communication and proactive technological guidance made them feel like an in-house tech department.',
        avatar: 'AH'
      }
    ]
  },
  whyChooseUs: {
    badge: 'WHY CHOOSE US',
    titlePrefix: 'Built On Verified Experience, Engineering Rigor & ',
    titleHighlight: 'Client Trust',
    visionQuote: 'To be the most reliable IT development partner for ambitious businesses by delivering high-impact software, scalable architecture, and transparent collaboration.',
    clientsCount: '150+',
    projectsCount: '250+',
    experienceYears: '10+',
    pillars: [
      {
        subtitle: 'Tailored Architecture',
        title: 'Customized Solutions',
        description: 'Bespoke software and applications designed specifically around your operational workflows and business objectives.',
        points: ['Custom UI/UX & Flow Design', 'Tailored Business Logic', 'Scalable Microservices']
      },
      {
        subtitle: '10+ Years Proven Track',
        title: 'Experienced Team',
        description: 'Seasoned full-stack developers, mobile engineers, and architects delivering battle-tested digital products.',
        points: ['Senior Software Engineers', 'Cross-Platform Expertise', 'Agile Sprint Management']
      },
      {
        subtitle: 'Industry-Standard Code',
        title: 'Quality Development',
        description: 'Clean, maintainable codebases built with modern frameworks, automated testing, and strict security compliance.',
        points: ['OWASP Security Adherence', 'Automated QA & CI/CD', 'Optimized Performance']
      },
      {
        subtitle: 'End-to-End Commitment',
        title: 'Reliable Support',
        description: 'Continuous monitoring, routine security patches, and rapid support to ensure uninterrupted business continuity.',
        points: ['Dedicated Account Lead', 'Fast Response SLA', 'Post-Deployment Maintenance']
      }
    ]
  },
  ctaBanner: {
    badge: 'START YOUR PROJECT',
    title: "Let's Build Something Great Together.",
    subtitle: 'Partner with our senior architects to bring your digital product vision to life with precision engineering and on-time delivery.',
    primaryBtnText: 'Contact Us',
    secondaryBtnText: 'Get Free Consultation'
  }
};

export const DEFAULT_PAGE_SECTIONS = {
  about_hero: {
    id: 'sec-about-hero',
    page: 'about',
    section_key: 'about_hero',
    section_name: 'About Hero Section',
    order_index: 1,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'ABOUT BLACK GRAPES SOFTECH',
      title: 'We Don’t Just Write Code',
      titleHighlight: '— We Engineer The Digital Future.',
      lead: 'Headquartered in Indore, India, Black Grapes Softech is a premier software engineering & digital transformation agency. We translate complex business hurdles into elegant, high-impact digital products.',
      primaryBtnText: 'Partner With Us',
      secondaryBtnText: 'Meet Our Leadership',
      secondaryBtnLink: '#founders',
      image: '/images/blackgrapes-1.png',
      floatingStat1Num: '250+ Projects',
      floatingStat1Sub: 'Shipped Globally',
      floatingStat2Num: '15+ Nations',
      floatingStat2Sub: 'Active Client Base',
      microBadges: ['Certified Developers', 'Full Cycle Development', '24/7 Dedicated Support']
    }
  },
  stats_strip: {
    id: 'sec-stats-strip',
    page: 'about',
    section_key: 'stats_strip',
    section_name: 'Key Impact Metrics Bar',
    order_index: 2,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      stats: [
        { number: '10+', label: 'Years of Innovation', highlight: 'Since 2014' },
        { number: '250+', label: 'Projects Completed', highlight: 'Global Scale' },
        { number: '150+', label: 'Satisfied Clients', highlight: '15+ Countries' },
        { number: '99%', label: 'Client Retention', highlight: 'Industry Best' }
      ]
    }
  },
  vision_mission: {
    id: 'sec-vision-mission',
    page: 'about',
    section_key: 'vision_mission',
    section_name: 'Vision, Mission & Philosophy Bento',
    order_index: 3,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'PURPOSE & PRINCIPLES',
      title: 'The Guiding Pillars Behind Our Growth',
      subtitle: 'Every system we engineer is backed by our relentless commitment to excellence and transformative technology.',
      vision: {
        tag: 'Strategic Vision',
        heading: 'Empowering Tomorrow Through',
        headingHighlight: 'Innovative Code',
        p1: 'At Black Grapes Softech, our vision is to lead the way in software development, using innovation and creativity to shape the future of technology.',
        p2: 'We envision a world where every software solution we architect empowers individuals, businesses, and communities to thrive, automate, and excel in the digital-first economy.',
        points: [
          'Pioneering intelligent, scalable cloud and web infrastructures.',
          'Cultivating technological self-reliance and commercial success for clients.',
          'Constantly innovating ahead of emerging market trends.'
        ],
        quote: '"Technology should not just automate tasks; it should multiply human potential and drive real-world transformation."',
        quoteAuthor: '— Black Grapes Softech Leadership'
      },
      mission: {
        tag: 'Execution & Commitment',
        heading: 'Crafting Excellence,',
        headingHighlight: 'One Line of Code at a Time',
        p1: 'Our mission is to provide exceptional software development services tailored to our clients’ unique business requirements. We are dedicated to delivering top-notch, cutting-edge solutions while fostering a culture of collaboration, growth, and continuous innovation.',
        p2: 'At Black Grapes Softech, we don’t just write code; we build the solid architectural foundation for a better, smarter, and more connected digital world.',
        points: [
          'High-velocity development with bulletproof security & QA.',
          'Transparent communication and milestone visibility at all times.',
          'Tailored solutions engineered precisely for client ROI.'
        ],
        quote: '"We don’t settle for \'good enough\'. We build digital products designed to dominate their industry."',
        quoteAuthor: '— Engineering Philosophy'
      },
      philosophy: {
        tag: 'Architectural Integrity',
        heading: 'Engineering For',
        headingHighlight: 'Infinite Scale & Speed',
        p1: 'Software isn\'t merely lines of script — it is the digital nervous system of your business. Our philosophy emphasizes clean code, microservices scalability, robust security protocols, and human-centered design.',
        p2: 'Whether developing custom MLM platforms, enterprise CRM systems, or high-throughput SaaS engines, our engineering principles guarantee longevity and seamless scalability.',
        points: [
          'Modularity and maintainability baked in from Day 1.',
          'Lightning-fast user interfaces with modern reactive frameworks.',
          'Zero technical debt tolerance through strict code reviews.'
        ],
        quote: '"Great code is invisible; what users experience is flawless speed, intuition, and undeniable value."',
        quoteAuthor: '— Core Tech Standard'
      }
    }
  },
  founders: {
    id: 'sec-founders',
    page: 'about',
    section_key: 'founders',
    section_name: 'Meet the Founders & Leadership',
    order_index: 4,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'LEADERSHIP & VISION',
      title: 'Meet the Visionaries Behind Black Grapes',
      subtitle: 'Passionate innovators dedicated to redefining software engineering standards.',
      photo: foundersImg,
      photoTagName: 'Mr. Arpit Jain & Mrs. Deepika Jain',
      photoTagRole: 'Founders & Executive Directors',
      heading: 'Driven By Innovation, Grounded In Excellence',
      intro: 'Behind Black Grapes Softech stand two visionary leaders with an unquenchable passion for digital advancement.',
      founder1Name: 'Mr. Arpit Jain — Founder & Chief Architect',
      founder1Bio: 'The driving force behind our software development journey. With a wealth of architectural experience and an instinctive knack for staying ahead of technological curves, he has pioneered cutting-edge solutions that have redefined client operations across industries.',
      founder2Name: 'Mrs. Deepika Jain — Co-Founder & Strategic Director',
      founder2Bio: 'Deepika Jain doesn’t just see challenges; she envisions opportunities. Her boundless creativity, strategic acumen, and people-first leadership have shaped our company’s culture of relentless innovation and customer delight.'
    }
  },
  core_values: {
    id: 'sec-core-values',
    page: 'about',
    section_key: 'core_values',
    section_name: 'Core Values Section',
    order_index: 5,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'OUR CORE DNA',
      title: 'The Values That Fuel Our Work',
      subtitle: 'Every decision we make, line of code we write, and system we deliver is guided by our core values.',
      values: [
        {
          title: 'Innovation-First Mindset',
          desc: 'We explore modern architectures and pioneering technologies to give our clients an unbeatable competitive advantage.'
        },
        {
          title: 'Uncompromised Quality',
          desc: 'Every piece of code is rigorously tested, clean, documented, and built to scale effortlessly under intense enterprise load.'
        },
        {
          title: 'Agile & Rapid Delivery',
          desc: 'Short iterative sprints, continuous feedback loops, and transparent milestones ensure on-time and on-budget delivery.'
        },
        {
          title: 'Client-Centric Synergy',
          desc: 'We do not view ourselves merely as vendors; we act as dedicated tech co-founders and growth partners in your journey.'
        }
      ]
    }
  },
  technical_expertise: {
    id: 'sec-domains',
    page: 'about',
    section_key: 'technical_expertise',
    section_name: 'Technical Expertise & Domains',
    order_index: 6,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'TECHNICAL EXPERTISE',
      title: 'Versatile Engineering Across Critical Digital Domains',
      subtitle: 'Our team delivers custom solutions across complex enterprise requirements with precision and high performance.',
      domains: [
        'CRM Software Systems',
        'MLM Architecture',
        'Full-Stack Web Apps',
        'iOS & Android Native/Flutter',
        'Cloud & DevOps (AWS/Azure)',
        'UI/UX Design Systems',
        'Enterprise ERP Solutions',
        'Interactive Game Development'
      ]
    }
  },
  milestones: {
    id: 'sec-milestones',
    page: 'about',
    section_key: 'milestones',
    section_name: 'Company Milestones & History',
    order_index: 7,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'OUR MILESTONES',
      title: 'A Decade of Relentless Evolution',
      subtitle: 'From a dedicated local engineering hub in Indore to an internationally trusted software powerhouse.',
      milestones: [
        {
          year: '2014',
          title: 'The Foundation',
          desc: 'Black Grapes Softech was founded in Indore with a vision to deliver world-class software development.'
        },
        {
          year: '2017',
          title: 'Specialized Enterprise Solutions',
          desc: 'Expanded into specialized CRM, MLM platforms, and high-performance cross-platform mobile apps.'
        },
        {
          year: '2021',
          title: 'Global Footprint Expansion',
          desc: 'Reached 150+ international deployments spanning North America, Europe, the Middle East, and Asia.'
        },
        {
          year: '2024 - 2026',
          title: 'AI, Cloud & Next-Gen Ecosystems',
          desc: 'Pioneering intelligent automation, scalable cloud infra, and enterprise-grade web applications.'
        }
      ]
    }
  },
  culture_hq: {
    id: 'sec-culture-hq',
    page: 'about',
    section_key: 'culture_hq',
    section_name: 'Headquarters & Culture Section',
    order_index: 8,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      badge: 'HEADQUARTERS & CULTURE',
      title: 'Where Passionate Technologists Thrive',
      image: workspaceImg,
      locationTag: 'Indore Tech Hub — Madhya Pradesh, India',
      p1: 'Situated at 252-F/H Scheme No 54, Vijaynagar, Indore, our software development center is where bold ideas turn into robust reality.',
      p2: 'We cultivate an open culture of perpetual learning, deep code reviews, creative freedom, and rigorous problem-solving. This energetic environment inspires our engineers to push boundaries and build applications that inspire.',
      stat1Num: '50+',
      stat1Label: 'In-House Engineers & Designers',
      stat2Num: '100%',
      stat2Label: 'Code Quality & Transparency'
    }
  },
  final_cta: {
    id: 'sec-final-cta',
    page: 'about',
    section_key: 'final_cta',
    section_name: 'About Final CTA Banner',
    order_index: 9,
    is_visible: true,
    has_unpublished_changes: false,
    content: {
      title: 'Ready to Accelerate Your Business With Custom Tech?',
      text: 'Speak directly with our technical leadership. Let\'s design, engineer, and deploy your software solution with unmatched precision.',
      buttonText: 'Book a Technical Discovery Session'
    }
  }
};

export const DEFAULT_SERVICES = [
  {
    id: 'srv-1',
    title: 'Web App Architecture',
    slug: 'web-architecture',
    short_desc: 'Next-gen reactive web applications engineered with React, Next.js, and cloud backends.',
    full_desc: 'We build ultra-scalable, responsive, SEO-ready web applications with enterprise security and sub-second load times.',
    icon_name: 'Layers',
    category: 'Engineering',
    order_index: 1,
    status: 'published'
  },
  {
    id: 'srv-2',
    title: 'Mobile App Development (iOS/Android)',
    slug: 'mobile-apps',
    short_desc: 'High-performance native and cross-platform Flutter/React Native mobile applications.',
    full_desc: 'From concept to App Store / Google Play deployment, we deliver sleek, engaging mobile apps that users love.',
    icon_name: 'Smartphone',
    category: 'Engineering',
    order_index: 2,
    status: 'published'
  },
  {
    id: 'srv-3',
    title: 'Enterprise CRM Solutions',
    slug: 'enterprise-crm',
    short_desc: 'Tailor-made Customer Relationship Management platforms tailored to your sales funnel.',
    full_desc: 'Automate lead scoring, pipeline management, client communications, and real-time sales reporting.',
    icon_name: 'Building',
    category: 'Enterprise',
    order_index: 3,
    status: 'published'
  },
  {
    id: 'srv-4',
    title: 'MLM Software Systems',
    slug: 'mlm-software',
    short_desc: 'Robust multi-level marketing matrix, binary, generation, and commission calculation software.',
    full_desc: 'Secure, fraud-proof transaction handling with real-time wallet sync and instant payout calculations.',
    icon_name: 'Zap',
    category: 'Enterprise',
    order_index: 4,
    status: 'published'
  },
  {
    id: 'srv-5',
    title: 'Digital Growth & SEO',
    slug: 'digital-marketing',
    short_desc: 'Data-driven search engine optimization, performance marketing, and conversion growth.',
    full_desc: 'Dominating search rankings and driving targeted customer acquisition for your brand.',
    icon_name: 'TrendingUp',
    category: 'Marketing',
    order_index: 5,
    status: 'published'
  },
  {
    id: 'srv-6',
    title: 'UI/UX & Brand Identity',
    slug: 'ui-ux-design',
    short_desc: 'Human-centered user experience design, wireframing, high-fidelity prototypes, and design systems.',
    full_desc: 'Crafting captivating digital experiences that turn visitors into loyal paying customers.',
    icon_name: 'Palette',
    category: 'Design',
    order_index: 6,
    status: 'published'
  },
  {
    id: 'srv-7',
    title: 'Interactive Game Development',
    slug: 'game-development',
    short_desc: 'Engaging 2D/3D mobile and web games with real-time multiplayer logic and monetization.',
    full_desc: 'Built with Unity, WebGL, and high-performance server architectures.',
    icon_name: 'Award',
    category: 'Gaming',
    order_index: 7,
    status: 'published'
  },
  {
    id: 'srv-8',
    title: 'Cloud & DevOps (AWS/Azure)',
    slug: 'cloud-devops',
    short_desc: 'Zero-downtime CI/CD pipelines, Docker containerization, Kubernetes, and serverless architectures.',
    full_desc: 'Maximizing infrastructure reliability, security compliance, and cost efficiency.',
    icon_name: 'CloudLightning',
    category: 'DevOps',
    order_index: 8,
    status: 'published'
  }
];

export const DEFAULT_PROJECTS = PRODUCTS_LIST.map((prod, idx) => ({
  id: prod.id,
  product_key: prod.id,
  title: prod.title,
  subtitle: prod.subtitle,
  category: prod.category,
  industry: prod.industry,
  badge: prod.badge,
  badge_color: prod.badgeColor || 'orange',
  youtube_id: prod.youtubeId,
  deployment_days: prod.deploymentDays,
  rating: prod.rating,
  summary: prod.summary,
  key_features: prod.keyFeatures || [],
  tech_stack: prod.techStack || [],
  highlights: prod.highlights || [],
  order_index: idx + 1,
  status: 'published'
}));

export const DEFAULT_CLIENTS = CLIENTS_LIST.map((client, idx) => ({
  id: client.id,
  client_key: client.id,
  name: client.name,
  category: client.category,
  industry: client.industry,
  region: client.region,
  logo_url: client.logo,
  badge: client.badge,
  badge_color: client.badgeColor || 'orange',
  services: client.services,
  impact: client.impact,
  order_index: idx + 1,
  status: 'published'
}));

export const DEFAULT_CASE_STUDIES = CLIENT_CASE_STUDIES.map((cs, idx) => ({
  id: cs.id,
  client_name: cs.client,
  industry: cs.industry,
  title: cs.title,
  description: cs.desc,
  metrics: cs.metrics || [],
  tech_stack: cs.tech || [],
  order_index: idx + 1,
  status: 'published'
}));

export const DEFAULT_TESTIMONIALS = CLIENT_TESTIMONIALS.map((t, idx) => ({
  id: `testi-${idx + 1}`,
  quote: t.quote,
  author: t.author,
  role: t.role,
  company: t.company,
  country: t.country,
  rating: t.rating || 5,
  order_index: idx + 1,
  status: 'published'
}));

export const DEFAULT_TEAM_MEMBERS = [
  {
    id: 'team-1',
    name: 'Mr. Arpit Jain',
    role: 'Founder & Chief Architect',
    bio: 'The driving force behind our software development journey. With architectural mastery and modern cloud expertise, he has spearheaded 250+ enterprise rollouts globally.',
    photo_url: foundersImg,
    badge_tag: 'Founder',
    is_leadership: true,
    order_index: 1,
    status: 'published'
  },
  {
    id: 'team-2',
    name: 'Mrs. Deepika Jain',
    role: 'Co-Founder & Strategic Director',
    bio: 'Deepika Jain doesn’t just see challenges; she envisions opportunities. Her boundless creativity, strategic acumen, and people-first leadership have shaped our company’s culture of relentless innovation and customer delight.',
    photo_url: foundersImg,
    badge_tag: 'Co-Founder',
    is_leadership: true,
    order_index: 2,
    status: 'published'
  }
];

export const DEFAULT_BLOG_CATEGORIES = [
  { id: 'cat-1', name: 'Software Architecture', slug: 'software-architecture' },
  { id: 'cat-2', name: 'AI & Automation', slug: 'ai-automation' },
  { id: 'cat-3', name: 'Cloud & DevOps', slug: 'cloud-devops' },
  { id: 'cat-4', name: 'Product Engineering', slug: 'product-engineering' }
];

export const DEFAULT_BLOG_POSTS = [
  {
    id: 'blog-1',
    title: 'Architecting Scalable Microservices for High-Volume Enterprise Platforms',
    slug: 'architecting-scalable-microservices-enterprise',
    excerpt: 'How Black Grapes Softech designs resilient cloud backends capable of processing tens of thousands of requests per second without latency degradation.',
    content: 'In modern distributed computing, monolithic architectures frequently fail under unpredictable traffic spikes. In this article, our Chief Architect discusses event-driven architecture using Kafka, Redis clustering, and containerized microservices.',
    category_id: 'cat-1',
    cover_image: aboutHeroImg,
    author_name: 'Mr. Arpit Jain',
    read_time: '6 min read',
    tags: ['Architecture', 'Cloud', 'PostgreSQL', 'Microservices'],
    status: 'published',
    published_at: '2026-02-15T10:00:00.000Z'
  },
  {
    id: 'blog-2',
    title: 'The Future of Clinical EHR & Hospital Management in 2026',
    slug: 'future-clinical-ehr-hospital-management-2026',
    excerpt: 'Exploring how AI-assisted diagnostics and real-time OPD/IPD synchronization are transforming patient outcomes in modern hospitals.',
    content: 'Smart Operate healthcare ERP streamlines clinical documentation, insurance pre-authorizations, and pharmacy inventory. Learn about the technological shifts empowering healthcare providers today.',
    category_id: 'cat-4',
    cover_image: workspaceImg,
    author_name: 'Engineering Team',
    read_time: '5 min read',
    tags: ['Healthcare', 'ERP', 'EHR', 'AI'],
    status: 'published',
    published_at: '2026-03-01T12:30:00.000Z'
  }
];

export const DEFAULT_ENQUIRIES = [
  {
    id: 'enq-101',
    name: 'Vikram Mehta',
    email: 'vikram.mehta@zenithcorp.in',
    phone: '+91 9826012345',
    requirement: 'Enterprise CRM Solutions',
    message: 'We are seeking a customized CRM solution with multi-branch sales tracking and WhatsApp API automation for our 200+ sales agents.',
    source_page: 'Demo Modal',
    status: 'new',
    admin_notes: 'High-priority enterprise lead. Requires custom demo of sales pipeline automation.',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'enq-102',
    name: 'Emily Davis',
    email: 'emily@apexmobility.io',
    phone: '+1 415 890 2314',
    requirement: 'Mobile App Development (iOS/Android)',
    message: 'Interested in white-label deployment of your Taxi Booking & Ride Dispatch (RideWave) product for our European market pilot.',
    source_page: 'Product Estimator',
    status: 'contacted',
    admin_notes: 'Sent initial pricing brochure and scheduled discovery call for Thursday.',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

export const DEFAULT_SEO_METADATA = [
  {
    id: 'seo-1',
    page_route: '/',
    meta_title: 'About Us | Black Grapes Softech - Leading Software & Tech Agency',
    meta_description: 'Discover Black Grapes Softech - visionary software development agency empowering businesses worldwide with custom web, mobile, CRM, and cloud solutions.',
    meta_keywords: 'software company indore, custom web development, mobile app agency, crm development',
    canonical_url: 'https://blackgrapessoftech.com/'
  },
  {
    id: 'seo-2',
    page_route: '/about',
    meta_title: 'About Us | Black Grapes Softech - Leading Software & Tech Agency',
    meta_description: 'Discover Black Grapes Softech - visionary software development agency empowering businesses worldwide with custom web, mobile, CRM, and cloud solutions.',
    meta_keywords: 'about black grapes, software team, indore software engineering',
    canonical_url: 'https://blackgrapessoftech.com/about'
  },
  {
    id: 'seo-3',
    page_route: '/products',
    meta_title: 'Proprietary Software Catalog | Black Grapes Softech',
    meta_description: 'Explore 12+ enterprise turnkey products with instant video demos, ratings and turnkey delivery.',
    meta_keywords: 'school software, hospital erp, gym management, turnkey software',
    canonical_url: 'https://blackgrapessoftech.com/our-products'
  },
  {
    id: 'seo-4',
    page_route: '/clients',
    meta_title: 'Global Client Portfolio | Black Grapes Softech',
    meta_description: 'Trusted by 150+ international clients across 15+ nations including Alphabet, Mastercard, Fujitsu.',
    meta_keywords: 'black grapes clients, portfolio, case studies',
    canonical_url: 'https://blackgrapessoftech.com/our-clients'
  },
  {
    id: 'seo-5',
    page_route: '/services',
    meta_title: 'Services & Solutions Hub | Black Grapes Softech',
    meta_description: 'Enterprise software, mobile apps, CRM, MLM, cloud architectures and digital marketing.',
    meta_keywords: 'web services, flutter apps, crm development, mlm platform',
    canonical_url: 'https://blackgrapessoftech.com/services'
  },
  {
    id: 'seo-6',
    page_route: '/contact',
    meta_title: 'Contact Us | Black Grapes Softech - Indore Office',
    meta_description: 'Direct line: +91 7470997884. Office: 252-F/H Scheme No 54, Vijaynagar, Indore-452010.',
    meta_keywords: 'contact black grapes, indore office, it company phone',
    canonical_url: 'https://blackgrapessoftech.com/contact'
  }
];

export const DEFAULT_ADMIN_USERS = [
  {
    id: 'usr-1',
    email: 'admin@blackgrapessoftech.com',
    full_name: 'Black Grapes Super Admin',
    role: 'super_admin',
    is_active: true,
    last_login_at: new Date().toISOString()
  },
  {
    id: 'usr-2',
    email: 'editor@blackgrapessoftech.com',
    full_name: 'Content Operations Manager',
    role: 'editor',
    is_active: true,
    last_login_at: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

export const DEFAULT_ACTIVITY_LOGS = [
  {
    id: 'act-1',
    admin_email: 'admin@blackgrapessoftech.com',
    action: 'System Initialized',
    module: 'System',
    record_id: 'sys-init',
    description: 'Black Grapes Softech CMS & Admin Architecture initialized with default datasets and schema.',
    created_at: new Date().toISOString()
  }
];

export const DEFAULT_IT_STAFFING = {
  // Hero Left Column
  badge: 'BLACK GRAPES SOFTECH • IT STAFFING & MANPOWER SOLUTIONS',
  headline: 'Stay on course with growth plans by',
  headlineAccent: 'hiring contractual staff',
  subtitle: 'Outsource your manpower needs with prompt.',
  description: 'Deploy pre-vetted senior software engineers, technical squads, and bulk contractual staff across 28 Indian states with full statutory compliance, zero long-term liabilities, and guaranteed rapid onboarding.',
  heroImage: '/it-staffing/staffing-hero.jpg',
  badge1Val: '28 States',
  badge1Sub: '100% Compliant',
  badge2Val: '25,000+ Staff',
  badge2Sub: 'Active on Payroll',

  // Hero Right Column: Direct Mandate Lead Form
  formBadge: 'Direct Staffing Mandate Form',
  formTitle: 'Outsource Your Manpower Needs',
  formSubtitle: 'Get a tailored contract staffing quotation with SLA confirmation in 2 business hours.',
  formBtnText: 'Send Staffing Inquiry',
  formFooterNotice: '100% Confidential • Zero Commitment Required • NDA Protected',

  // Form Dropdown Options
  staffingServices: [
    'NAPS/Apprenticeship Hiring',
    'Bulk Hiring',
    'Diversity Hiring',
    'Gig Hiring/Flexi Staffing',
    'General Staffing/Payroll Management',
    'IT/Technical Hiring'
  ],
  mandateOptions: ['1-10', '10-50', '51-100', '101+'],

  // Key Stats Strip (4 cards)
  stats: [
    {
      value: '25,000+',
      label: 'Contract Staff Deployed',
      desc: 'Active workforce deployed across PAN-India client locations'
    },
    {
      value: '28 States',
      label: 'Full Statutory Compliance',
      desc: 'Complete PF, ESIC, Professional Tax & state labour laws adherence'
    },
    {
      value: '48-72h',
      label: 'Rapid Onboarding SLA',
      desc: 'Swift talent turnaround from requirement mandate to active kickoff'
    },
    {
      value: '98.4%',
      label: 'Client Retention Rate',
      desc: 'Trusted by leading Fortune enterprises, MNCs & Indian startups'
    }
  ],

  // Models
  models: [
    { id: 'm-1', title: 'Dedicated Developers', desc: 'Full-time senior software engineers integrated into your sprint cycles.', rate: 'From $18/hr', bestFor: 'Scaling product teams' },
    { id: 'm-2', title: 'Managed Engineering Squads', desc: 'Autonomous squads complete with Tech Lead, QA, and Scrum Master.', rate: 'Custom Scope', bestFor: 'Turnkey feature builds' },
    { id: 'm-3', title: 'Contract & Flexi Staffing', desc: 'On-demand niche talent for specific project deliverables without long-term overhead.', rate: 'Flexible', bestFor: 'Spike workloads & MVPs' }
  ],

  guaranteePoints: [
    '48-Hour Talent Deployment to your Slack or Jira',
    'Risk-Free 2-Week Trial Period',
    'Strict NDAs & Complete IP Transfer',
    'Transparent Hourly or Monthly Retainer Pricing'
  ],

  // 1. The Expansion Challenge Section
  expansionBadge: 'THE EXPANSION CHALLENGE',
  expansionTitle: 'How does your company address new',
  expansionTitleAccent: 'Manpower staffing requirements',
  expansionTitleSuffix: 'as it expands?',
  expansionSubtitle: 'Balancing talent management with rapid business growth in new locations poses challenges. If you’re aiming for expansion, you probably face the following scenarios:',
  scenarios: [
    {
      title: 'Tight Deployment Deadlines',
      desc: 'Your expansion timeline hinges on quickly deploying contract staff onsite, often with tight deadlines and high performance stakes.',
      tag: 'Critical Scenario 01',
      icon: 'Clock'
    },
    {
      title: 'HR Time & Bandwidth Drain',
      desc: 'Your HR department consistently requires contract staff, leading to significant time spent on sourcing, training, and onboarding.',
      tag: 'Critical Scenario 02',
      icon: 'Users'
    },
    {
      title: 'Full HR Assistance',
      desc: 'You might require additional HR assistance. This is where we can offer support! We take over sourcing, background checks, and payroll management.',
      btnText: 'Request HR Support',
      icon: 'Award'
    }
  ],

  // 2. Proven Strategic Value / 3 Ways We Offer Assistance
  waysBadge: 'PROVEN STRATEGIC VALUE',
  waysTitle: "As Prompt Personnel, we're the top choice for staffing and HR solutions among leading MNCs and Indian businesses.",
  waysSubtitle: 'Here are 3 ways through which we can offer assistance:',
  ways: [
    {
      number: '01',
      title: 'Bulk Hiring of Contractual Staff for your Company',
      desc: 'Rapid multi-city deployment of technical squads, developers, QA engineers, and operations staff. Pre-screened talent pools ready for immediate onsite or remote integration.',
      btnText: 'Learn More About Bulk Hiring',
      icon: 'UserCheck'
    },
    {
      number: '02',
      title: 'Managing End to End Payroll Operations',
      desc: 'Comprehensive payroll processing, salary disbursement, digital employee self-service slips, TDS calculations, and full monthly statutory filings with zero compliance slip-ups.',
      btnText: 'Learn More About Payroll Management',
      icon: 'FileText'
    },
    {
      number: '03',
      title: 'Allowing You to Focus on Core Competencies',
      desc: 'Relieve leadership and core department heads from staffing friction. Focus 100% on product development, client acquisition, and core business growth while we manage human capital.',
      btnText: 'Learn More About Core Focus',
      icon: 'TrendingUp'
    }
  ],
  ctaBannerTitle: 'Ready to discuss your contractual staff requirements?',
  ctaBannerDesc: 'Our talent advisors will configure an agile staffing model custom tailored to your timelines.',
  ctaBannerBtn: 'Enquire Now',

  // 3. Contingent Staffing Growth Pillars
  growthBadge: 'STRATEGIC ADVANTAGE',
  growthTitle: 'How Contingent Staffing Firm can help you',
  growthTitleAccent: 'stay focused on Growth?',
  growthPillars: [
    {
      badge: 'Pillar 01',
      heading: '1. Mitigate incorrect hiring risks.',
      desc: 'Incorrect permanent hires cost significant severance, recruitment fees, and team momentum. Contingent staffing lets you evaluate engineers on real-world milestones with complete agility and zero long-term termination liability.',
      perk: 'Zero severance or permanent liability'
    },
    {
      badge: 'Pillar 02',
      heading: '2. Reduce operations costs, improve toplines.',
      desc: 'Replace heavy fixed annual compensation overheads with flexible, project-based operational expenditure. Scale headcount strictly when revenue-generating mandates require it, protecting margins and bottom lines.',
      perk: 'Optimize operational cash flows & margins'
    },
    {
      badge: 'Pillar 03',
      heading: '3. Improve scalability, increase alignment with strategy.',
      desc: 'Seamlessly adapt workforce size in response to sudden product releases, client surges, or geographic expansions. Align team capacity directly with corporate quarterly strategy without recruiting bottlenecks.',
      perk: 'Instant ramp-up and ramp-down flexibility'
    }
  ],

  // 4. Flexible Staffing Process Pipeline
  processBadge: 'SYSTEMATIC METHODOLOGY',
  processTitle: 'What does our Flexible Staffing Services include:',
  processTitleAccent: 'Our Process',
  processSubtitle: 'A battle-tested 3-stage delivery pipeline ensuring pre-vetted, high-performance talent deployed seamlessly to your organization.',
  processSteps: [
    {
      tag: 'Step 01',
      title: '1. Source',
      desc: 'Accessing appropriate channels is crucial for candidate sourcing. We engage with specific demographics to ensure the recruitment of suitable individuals.',
      metrics: ['Multi-channel sourcing networks', 'Technical & behavioral pre-screening']
    },
    {
      tag: 'Step 02',
      title: '2. Train',
      desc: 'Training aligned with organizational development objectives is essential for enhancing their job effectiveness.',
      metrics: ['Customized domain skill orientation', 'Compliance & operational workflow alignment']
    },
    {
      tag: 'Step 03',
      title: '3. Deploy',
      desc: 'With over 25,000 contractual staff on our payroll, we are in a great position to deploy anywhere across India.',
      metrics: ['PAN-India physical & remote deployment', 'Centralized compliance & daily governance']
    }
  ],

  // 5. Testimonials
  testimonialsBadge: 'VERIFIED CLIENT SUCCESS',
  testimonialsTitle: 'What do our clients',
  testimonialsTitleAccent: 'say about us:',
  contactBtnText: 'Contact Now',
  testimonials: [
    {
      id: 't-1',
      name: 'Subodh Bhandari',
      role: 'Businessman',
      company: 'Enterprise Partner',
      rating: 5,
      quote: 'I have had the pleasure of working with Black Grapes Softech Company for the past few years, and I can confidently say that they have significantly transformed our business operations. Their software solutions have not only streamlined our processes but also boosted our efficiency and productivity to new heights.'
    },
    {
      id: 't-2',
      name: 'Kartik Mali',
      role: 'Gym Owner',
      company: 'Fitness Enterprise',
      rating: 5,
      quote: 'From the moment we engaged with Black Grapes Softech, their team demonstrated a deep understanding of our unique business needs. They took the time to listen to our challenges, goals, and aspirations and then tailored their software solutions to meet our specific requirements.'
    }
  ],

  // 6. 28 States Compliance
  complianceBadge: 'NATIONWIDE COMPLIANCE NETWORK',
  complianceHeading: 'Why Prompt should be your go-to-partner in Manpower Staffing',
  complianceHeadingAccent: '28 States Compliance Expertise.',
  complianceDesc: 'Managing contingent workforces across multiple state boundaries demands rigorous compliance with fluctuating local Minimum Wage notifications, Shops & Commercial Establishment Acts, and statutory filing calendars.',
  complianceImage: '/it-staffing/staffing-compliance.png',
  complianceStats: [
    { value: '25+', label: 'Years of Staffing Excellence', color: 'neon-flame-text' },
    { value: '2200+', label: 'Service Locations Nationwide', color: 'cyber-grape-text' },
    { value: '08', label: 'Branch Network Cities', color: 'cyan-blue-text' },
    { value: '29', label: 'States Compliance Expertise', color: 'neon-flame-text' },
    { value: '05', label: 'Union Territories Compliance', color: 'emerald-green-text' }
  ],
  complianceChecklist: [
    "Employees' Provident Fund (EPF)",
    "Employees' State Insurance (ESIC)",
    "Professional Tax (PT) in 28 States",
    "Labour Welfare Fund (LWF)",
    "Gratuity & Bonus Act Compliance",
    "Contract Labour (Regulation & Abolition) Act"
  ]
};

export const DEFAULT_ECOMMERCE = {
  badge: 'BLACK GRAPES SOFTECH • OFFICIAL ECOMMERCE PLATFORM',
  title: 'Exciting News! Naya Purana Bazaar is Coming Soon!',
  byline: 'An Online Marketplace By Black Grapes Softech',
  domain: 'https://www.nayapuranabazaar.com',
  domainDisplay: 'nayapuranabazaar.com',
  targetLaunch: 'Q2 2026',
  summary: "India's next-generation hybrid marketplace connecting buyers and verified sellers for certified new and pre-owned goods with escrow security, fast courier logistics, and verified buyer protection.",
  categories: [
    { id: 'electronics', name: 'Electronics & Appliances', count: '120+ Listings Pending', icon: 'Cpu' },
    { id: 'vehicles', name: 'Two Wheelers & Cars', count: '85+ Listings Pending', icon: 'Car' },
    { id: 'furniture', name: 'Home & Office Furniture', count: '60+ Listings Pending', icon: 'Home' },
    { id: 'fashion', name: 'Fashion & Lifestyle', count: '200+ Listings Pending', icon: 'ShoppingBag' }
  ],
  buyerPerks: [
    '100% Escrow Payment Protection',
    'Doorstep Quality Verification',
    '7-Day Easy Return Policy',
    'Direct WhatsApp Chat with Sellers'
  ],
  sellerPerks: [
    '0% Listing Fee for First 100 Products',
    'Instant Payment Settlements to Bank',
    'Free Integrated Logistics & Pickup',
    'Automated Inventory & Invoicing Portal'
  ],
  waitlist_count: 450
};

export const DEFAULT_PARTNERSHIP = {
  heroBadge: 'PARTNERSHIP & ALLIANCES',
  heroTitle: 'Strategic Technology Alliances & Offshore Development',
  heroSubtitle: 'Cultivating long-term strategic relationships and delivering high-velocity offshore technology development.',
  partnerWithUsTitle: 'Partner With Us',
  partnerWithUsText: 'If you are an IT or web software development company and are eager to expand your operations here in India, we are ready to help you as your development centre. Our business community is focused on cultivating long-term relationships with our clients and offers excellent experiences covering the strategic insights. Partnering with us enables you to provide endless growth and development. You can share our resources for your project requirements to work on technical areas that directly affect the growth of the organization.',
  partnerImage: '/partners/partner_with_us.webp',
  benefits: [
    'Dedicated Offshore Development Center (ODC) setup in Indore tech corridor',
    'Seamless collaboration across global time zones (US, UK, UAE, Australia)',
    'Transparent billing, daily standups, and dedicated engineering leadership',
    'Strict intellectual property protection and confidentiality agreements'
  ],
  formTitle: 'Please tell us a bit about yourself',
  formSubtitle: 'Fill in your details below to explore development centre partnerships with our team.'
};

export const DEFAULT_BUSINESS_PARTNERS = {
  badge: 'WHAT WE DO',
  title: 'Our Business Partners',
  titleAccent: 'Business Partners',
  subtitle: 'Forging strategic alliances, distribution networks, and scalable tech integrations across global enterprise platforms.',
  product_intro: {
    sectionTitle: 'Black Grapes Softech Products Companies Tie-up:-',
    subHeading: 'Product Companies Tie-up',
    paragraphs: [
      "In today’s dynamic business landscape, strategic partnerships play a crucial role in driving growth, innovation, and market expansion. Product companies recognize the immense value of collaborating with like-minded organizations to leverage complementary strengths and create mutual opportunities for success. This is where Product Companies Tie-Up Services step in.",
      "These services facilitate strategic partnerships between product companies, enabling them to forge stronger alliances, expand their reach, and unlock new avenues for growth. By joining forces, businesses can tap into new markets, access additional resources, and capitalize on emerging opportunities that may be beyond their reach individually. Through distribution agreements, joint ventures, technology partnerships, or co-branding initiatives, these services empower companies to create synergies and unlock value that benefits all parties involved.",
      "Product Companies Tie-Up Services match companies with compatible partners based on shared goals, complementary capabilities, and strategic fit. They offer ongoing support throughout the partnership lifecycle, from initial discussions and agreement formation to implementation, monitoring, and optimization. By offering strategic guidance, operational assistance, and performance tracking, these services help companies nurture and sustain successful partnerships that drive sustainable growth and competitive advantage."
    ]
  },
  service_intro: {
    sectionTitle: 'Black Grapes Softech Services Companies Tie-up:-',
    subHeading: 'Services Companies Tie-up',
    paragraphs: [
      "In today’s fast-paced business environment, strategic collaborations are essential for unlocking growth opportunities and staying competitive. Services Companies Tie-Up offers a streamlined approach to forming partnerships between service-oriented businesses. By joining forces, companies can leverage each other’s expertise, expand service offerings, and access new markets more efficiently. With Services Companies Tie-Up, businesses can accelerate their growth and achieve mutual success in a dynamic marketplace."
    ]
  },
  product_partners: [],
  service_partners: []
};

export const DEFAULT_CONTACT_PAGE = {
  heroBadge: 'BLACK GRAPES GROUP',
  heroTitle: 'Get in Touch',
  heroTitleAccent: 'Touch',
  heroSubtitle: 'We are here to help and answer any questions you might have. We look forward to hearing from you.',
  address1Label: 'Registered Office (Address 1)',
  address1Text: '252-F/H, Scheme No 54, Vijay Nagar, Indore-452010, Madhya Pradesh, India.',
  address1MapUrl: 'https://maps.app.goo.gl/qJcKNw9DMo4JVWrv8',
  address1MapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.3068694610433!2d75.88491091113343!3d22.753990279276895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39630310c76a0dc5%3A0xf446e40a939f4b1d!2sBlack%20Grapes%20Softech!5e0!3m2!1sen!2sin!4v1746083224583!5m2!1sen!2sin',
  address2Label: 'Development Centre (Address 2)',
  address2Text: 'Office No.1141, Scheme No.114, Part-1, Vijay Nagar, Indore-452010, Madhya Pradesh, India.',
  address2MapUrl: 'https://maps.app.goo.gl/yahxDsm7BLK652mA8',
  address2MapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.976510611648!2d75.8924314!3d22.7687402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396303eb56ed3fd1%3A0x9af6cadec6743e07!2sScheme%20No%20114!5e0!3m2!1sen!2sin!4v1687599921907!5m2!1sen!2sin',
  directPhones: [
    { name: 'Arpit Jain', phones: ['+91 9039397884', '+91 7470997884'] },
    { name: 'Deepika Jain', phones: ['+91 6262414463'] }
  ],
  emails: [
    { department: 'General Inquiries', email: 'blackgrapesgroups@gmail.com' },
    { department: 'Executive Desk (Arpit Jain)', email: 'blackgrapes.arpitjain@gmail.com' },
    { department: 'Strategic Desk (Deepika Jain)', email: 'blackgrapes.deepikajain@gmail.com' }
  ],
  workingHours: 'Monday – Saturday: 10:00 AM – 7:30 PM (IST)',
  leaveTitle: 'Leave a Message',
  leaveSubtitle: 'Feel free to contact us for any questions or doubts.',
  leaveDesc: 'Whether you need technical software consultation, property valuation, real estate advice, or securities advisory, our dedicated leadership team is ready to assist.',
  socialFacebook: 'https://www.facebook.com/blackgrapessoftech.fb',
  socialTwitter: 'https://twitter.com/grapessoftech',
  socialInstagram: 'https://www.instagram.com/blackgrapessoftech/',
  socialLinkedin: 'https://www.linkedin.com/in/black-grapes-softech/',
  socialYoutube: 'https://www.youtube.com/channel/UC3gJA06Uxb0D82-PVJl0SbQ'
};

export const DEFAULT_CLIENTS_PAGE = {
  heroBadge: 'TRUSTED BY 150+ GLOBAL ENTERPRISES',
  heroTitle: 'Our Clients:',
  heroTitleAccent: 'Powering Leaders Across 15+ Nations',
  heroSubtitle: 'At Black Grapes Softech, we take pride in our diverse and dynamic client portfolio. Our clients span various industries including finance, healthcare, e-commerce, education, and technology. We partner with both high-velocity startups and Fortune 500 enterprises to deliver innovative software solutions tailored to their unique needs.',
  primaryBtnText: 'Partner With Us',
  secondaryBtnText: 'Explore Client Brands',
  heroImage: '',
  floatingTitle: 'Active Global Deployments',
  floatingSubtitle: 'US • UK • Japan • EU • UAE • India',
  floatingBadge: '99% RETENTION',
  metrics: [
    { number: '150+', label: 'Enterprise Clients', highlight: 'Global Scale' },
    { number: '15+', label: 'Countries Served', highlight: 'Worldwide Reach' },
    { number: '99%', label: 'Client Retention', highlight: 'Long-term Trust' },
    { number: '$50M+', label: 'Value Generated', highlight: 'Measurable ROI' }
  ]
};

export const DEFAULT_SERVICES_PAGE = {
  badge: 'BLACK GRAPES GROUP',
  title: 'Services Built Specifically',
  titleAccent: ' For Your Business',
  subtitle: 'Empowering businesses with tailored solutions to meet your unique needs.',
  searchPlaceholder: 'Search services (Softech, Real Estate, Valuers, Investment, Insurance)...',
  tab1Label: 'Group Companies (6 Core)',
  tab2Label: 'IT Staffing Solutions',
  tab3Label: 'E-Commerce (Naya Purana Bazaar)',
  isVisible: true
};

export const DEFAULT_SOFTECH_PAGE = {
  badge: 'BLACK GRAPES SOFTECH • WHAT WE DO',
  title: 'Engineering High-Impact Custom Software & Digital Products',
  subtitle: 'From bespoke web platforms and native mobile apps to AI-powered enterprise automation, we build scalable software designed to lead your market.',
  primaryCtaText: 'Request Technical Quote',
  secondaryCtaText: 'Schedule Consultation',
  industriesBadge: 'CROSS-INDUSTRY EXPERTISE',
  industriesTitle: 'Software Tailored for Real-World Business Vertical Demands',
  isVisible: true
};

export const DEFAULT_PRODUCTS_PAGE = {
  badge: 'BLACK GRAPES SOFTECH PROPRIETARY SUITE',
  title: 'Our Products:',
  titleAccent: 'Engineered to Transform Modern Business',
  subtitle: 'Explore our cutting-edge software solutions designed to transform the way you work and elevate your business to new heights. Our Products showcase a diverse range of powerful and user-friendly software applications tailored to meet the unique needs of modern businesses.',
  stats: [
    { metric: '12+', label: 'Turnkey Products' },
    { metric: '100%', label: 'Source Code Ownership' },
    { metric: '7+', label: 'Core Industries' },
    { metric: '5-7', label: 'Days Deployment' }
  ],
  primaryBtnText: 'Request Live Demo',
  secondaryBtnText: 'Browse All Products',
  pillTitle: 'Live Production Ready',
  pillSub: 'Cloud Native • Web • iOS • Android',
  pillBadge: 'WHITE-LABEL',
  isVisible: true
};


