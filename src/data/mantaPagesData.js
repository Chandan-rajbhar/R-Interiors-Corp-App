export const DIGITAL_MARKETING_DATA = {
  heroTitle: 'Results Driven Online Marketing Agency for over 20 Years',
  heroSubtitle:
    'Award-winning digital marketing solutions helping small and medium-sized businesses grow online visibility, leads, and revenue.',
  stats: [
    { value: '83%', label: 'of customers see higher rankings within months' },
    { value: '5 mins', label: 'quick onboarding & campaign setup' },
  ],
  pillars: [
    {
      id: 'tech',
      title: 'Award-Winning Technology',
      description: 'Proprietary SEO and listings technology built for local business growth.',
    },
    {
      id: 'results',
      title: 'Proven Track Record & Results',
      description: 'Over 20 years helping businesses reach page one and generate qualified leads.',
    },
    {
      id: 'support',
      title: 'Dedicated Customer Success',
      description: 'Dedicated Marketing Experts and Customer Success Managers guiding your campaign.',
    },
    {
      id: 'reporting',
      title: 'Transparent Member Dashboard',
      description: 'Track keyword rankings, traffic, and listing performance in one place.',
    },
  ],
  services: [
    {
      id: 'local-seo',
      title: 'Local SEO & Organic Search',
      description: 'Rank higher in Google local map packs and organic search results.',
      route: '/seo-services',
    },
    {
      id: 'listings',
      title: 'Business Listings Management',
      description: 'Sync accurate business info across top directories and search engines.',
      route: '/business-listings',
    },
    {
      id: 'directory',
      title: 'Search Business Directory',
      description: 'Explore millions of verified local businesses across the United States.',
      route: '/directory',
    },
  ],
  industries: ['Contractors', 'Restaurants', 'Healthcare', 'HVAC', 'Real Estate', 'Trucking'],
};

export const SEO_SERVICES_DATA = {
  title: 'Local SEO Starter & SEO Services',
  subtitle: 'Get found by local customers searching for your products and services.',
  steps: [
    {
      step: '1',
      title: 'Audit & Strategy',
      description: 'We analyze your website, local competitors, and target keywords.',
    },
    {
      step: '2',
      title: 'On-Site & Off-Site Optimization',
      description: 'Optimize pages, Google Business Profile, and local citations.',
    },
    {
      step: '3',
      title: 'Track & Grow Rankings',
      description: 'Monitor keyword movement and monthly traffic inside your dashboard.',
    },
  ],
  plans: [
    {
      id: 'starter',
      name: 'Local SEO Starter',
      badge: 'Popular',
      features: ['Google Business Profile optimization', 'Local citation building', 'Monthly keyword tracking'],
    },
    {
      id: 'plus',
      name: 'SEO Plus',
      features: ['Everything in Starter', 'On-page content optimization', 'Competitor rank monitoring'],
    },
    {
      id: 'pro',
      name: 'SEO Pro',
      features: ['Multi-location SEO support', 'Dedicated SEO strategist', 'Custom monthly reporting'],
    },
  ],
  faqs: [
    {
      q: "What's the Difference Between Local SEO and Organic SEO?",
      a: 'Local SEO focuses on ranking your business in Google Maps and "near me" searches within your service area, while Organic SEO targets broader regional or national search rankings through website content and authority.',
    },
    {
      q: "What's the Difference Between PPC and SEO?",
      a: 'PPC (Pay-Per-Click) delivers paid ad placement immediately as long as you pay per click, whereas SEO builds long-term organic visibility in unpaid search results.',
    },
    {
      q: 'How Long Does It Take to See Results for SEO?',
      a: 'Most small businesses begin seeing measurable ranking and traffic improvements within 3 to 6 months, depending on competition and site history.',
    },
    {
      q: "What is Manta's SEO Process to Improving Website Rankings?",
      a: 'Our process covers technical site audits, keyword research, on-page optimization, Google Business Profile tuning, local citation building, and ongoing performance reporting.',
    },
    {
      q: 'Will I Have Insight and Access into My Campaign?',
      a: 'Yes. Members get transparent access to campaign progress, keyword rankings, and traffic metrics.',
    },
    {
      q: 'Does Manta Outsource Work?',
      a: 'Campaigns are managed by dedicated in-house SEO specialists and customer success teams.',
    },
    {
      q: 'How Much Does Manta Charge for SEO Services?',
      a: 'Packages are tailored to business size and goals, starting with affordable Local SEO Starter plans and scaling up for multi-location needs.',
    },
  ],
};

export const BUSINESS_LISTINGS_DATA = {
  title: 'Business Listings & Management',
  subtitle: 'Claim your free listing or keep your business details synced across the web.',
  benefits: [
    'Ensure consistent Name, Address, and Phone (NAP) across directories',
    'Improve local search trust with verified business details',
    'Showcase business hours, services, and website links',
  ],
  faqs: [
    {
      q: 'Is a basic business listing free?',
      a: 'Yes, you can add or claim a free business profile to appear in the directory.',
    },
    {
      q: 'What does Listings Management include?',
      a: 'Listings Management automatically distributes and locks your accurate business information across major search engines, maps, and directories.',
    },
    {
      q: 'How long does it take to update my listing?',
      a: 'Updates submitted through your profile are processed promptly so customers always see accurate contact info.',
    },
  ],
};

export const MANTA_BLOG_POSTS = [
  {
    id: 'blog-1',
    category: 'Local SEO',
    readTime: '4 min read',
    title: 'Small Business Marketing Advice That Actually Works',
    summary:
      'Focus on Google Business Profile accuracy, local reviews, and fast mobile pages before spending on complex ad campaigns.',
    content:
      'Small businesses get the highest return from fundamentals: keep your business name, address, phone, and hours consistent everywhere, encourage satisfied customers to leave honest reviews, and make sure your website loads fast on mobile devices with a clear call-to-action.',
  },
  {
    id: 'blog-2',
    category: 'Business Growth',
    readTime: '3 min read',
    title: 'How Accurate Online Listings Bring More Local Calls',
    summary:
      'Customers ready to buy often call the first verified listing they find with clear hours and service details.',
    content:
      'When your directory listing includes complete service descriptions, verified phone numbers, and up-to-date hours, local searchers are far more likely to call or request an estimate right away.',
  },
  {
    id: 'blog-3',
    category: 'Customer Trust',
    readTime: '5 min read',
    title: 'Why Verified Reviews Matter for Contractors & Trades',
    summary:
      'Consistent, authentic customer feedback builds immediate credibility for home and commercial service providers.',
    content:
      'Before hiring a contractor, homeowners and property managers check recent reviews. Responding professionally to feedback and highlighting completed projects helps turn profile visitors into booked jobs.',
  },
];

export const MANTA_REVIEWS_PAGE_DATA = {
  stats: [
    { value: '35 Million', label: 'Businesses on Manta' },
    { value: '14,000', label: 'New Listings Monthly' },
    { value: '149', label: 'Countries Covered' },
  ],
  reviews: [
    {
      id: 'mr-1',
      author: 'Aaron P.',
      source: 'Clutch',
      rating: 5,
      text: 'Our online visibility improved noticeably within the first few months. The team is responsive and easy to work with.',
    },
    {
      id: 'mr-2',
      author: 'Brent W.',
      source: 'Clutch',
      rating: 5,
      text: 'Great communication and clear reporting on our local SEO rankings and business listings.',
    },
    {
      id: 'mr-3',
      author: 'Judith R.',
      source: 'Google',
      rating: 5,
      text: 'Having our business profile verified and up to date has brought steady inquiries from local customers.',
    },
  ],
};

export const MANTA_ABOUT_DATA = {
  title: 'About Manta',
  subtitle: 'Delivering Award-Winning Online Marketing Services for Over 25 Years',
  paragraphs: [
    'Manta is dedicated to helping small and medium-sized businesses grow online through effective SEO, accurate business listings, and practical marketing tools.',
    'With millions of monthly visitors searching the directory, business owners can claim and customize their profile to improve local visibility and connect with customers.',
  ],
  benefits: [
    'Full digital marketing suite with data-driven decisions',
    'Custom strategy tailored to your business needs',
    'Dedicated Customer Success Manager & Marketing Experts',
    'Customizable reporting through your Member Dashboard',
  ],
};

export const MANTA_TERMS_SECTIONS = [
  {
    heading: '1. Acceptance of Terms',
    body: 'By accessing or using this application and directory services, you agree to comply with these Terms & Conditions and all applicable laws.',
  },
  {
    heading: '2. Business Listings & Accuracy',
    body: 'Business owners and users submitting listing details or estimate requests agree to provide accurate, current, and truthful information.',
  },
  {
    heading: '3. Acceptable Use',
    body: 'You agree not to misuse directory data, submit spam or fraudulent listings, or attempt to disrupt platform availability.',
  },
  {
    heading: '4. Intellectual Property',
    body: 'All logos, designs, trademarks, and original content displayed in the application remain the property of their respective owners.',
  },
];

export const MANTA_PRIVACY_SECTIONS = [
  {
    heading: '1. Information We Collect',
    body: 'We collect information you voluntarily provide, such as your name, email address, phone number, and project estimate details.',
  },
  {
    heading: '2. How We Use Information',
    body: 'Your information is used solely to respond to estimate requests, manage your member profile, and improve directory search relevance.',
  },
  {
    heading: '3. Local Storage & Preferences',
    body: 'Recent searches, notification read states, and demo member profile preferences are stored locally in your browser.',
  },
  {
    heading: '4. Contact & Data Requests',
    body: 'You may update or remove your profile information at any time from your Profile page or by contacting us directly.',
  },
];
