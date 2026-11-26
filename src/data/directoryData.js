import catConstructionImg from '../assets/images/commercial-stucco-facade.jpg';
import catRestaurantsImg from '../assets/images/cat-restaurants.jpg';
import catRealEstateImg from '../assets/images/cat-realestate.jpg';
import catHvacImg from '../assets/images/cat-hvac.jpg';
import catLandscapingImg from '../assets/images/cat-landscaping.jpg';
import catHealthcareImg from '../assets/images/cat-healthcare.jpg';
import catTruckingImg from '../assets/images/cat-trucking.jpg';

export const CATEGORY_IMAGES = {
  construction: catConstructionImg,
  restaurants: catRestaurantsImg,
  realestate: catRealEstateImg,
  hvac: catHvacImg,
  landscaping: catLandscapingImg,
  healthcare: catHealthcareImg,
  trucking: catTruckingImg,
};

export const QUICK_SEARCH_SUGGESTIONS = [
  { id: 'stucco', label: 'Stucco Finishing', route: '/services/stucco-finishing', type: 'service' },
  { id: 'drywall', label: 'Drywall Installation', route: '/services/drywall-installation', type: 'service' },
  { id: 'contractors', label: 'Contractors', route: '/directory/category/construction', type: 'service' },
  { id: 'restaurants', label: 'Restaurants', route: '/directory/category/restaurants', type: 'directory' },
  { id: 'doctors', label: 'Doctors', route: '/directory/category/healthcare', type: 'directory' },
  { id: 'lawyers', label: 'Lawyers', route: '/directory/category/lawyers', type: 'directory' },
  { id: 'automotive', label: 'Automotive', route: '/directory/category/automotive', type: 'directory' },
  { id: 'dentists', label: 'Dentists', route: '/directory/category/healthcare', type: 'directory' },
];

export const DIRECTORY_SECTORS = [
  { id: 'construction', label: 'Business Services', categoryId: 'construction' },
  { id: 'restaurants', label: 'Food & Beverage', categoryId: 'restaurants' },
  { id: 'realestate', label: 'Consumer Services', categoryId: 'realestate' },
  { id: 'healthcare', label: 'Health', categoryId: 'healthcare' },
  { id: 'hvac', label: 'HVAC & Trades', categoryId: 'hvac' },
  { id: 'trucking', label: 'Industrial', categoryId: 'trucking' },
];

export const DIRECTORY_CITIES = [
  { name: 'Deerfield Beach, FL', featured: true },
  { name: 'New York' },
  { name: 'Houston' },
  { name: 'Chicago' },
  { name: 'Indianapolis' },
  { name: 'Boston' },
  { name: 'Atlanta' },
  { name: 'Pittsburgh' },
  { name: 'Los Angeles' },
  { name: 'Dallas' },
  { name: 'Boca Raton, FL' },
  { name: 'Fort Lauderdale, FL' },
  { name: 'Coral Springs, FL' },
  { name: 'Pompano Beach, FL' },
];

export const DIRECTORY_CATEGORIES = [
  {
    id: 'construction',
    label: 'Construction',
    subtitle: 'R Interiors Corp Specialty',
    description:
      'Commercial and residential construction finishing, specializing in exterior stucco finishing and precision interior drywall installation.',
    highlights: [
      'Exterior & interior stucco finishing',
      'Precision drywall hanging, taping & smooth finish',
      'Serving Deerfield Beach, FL & surrounding areas since 2015',
    ],
    highlight: true,
  },
  {
    id: 'restaurants',
    label: 'Restaurants',
    subtitle: 'Food & Beverage',
    description:
      'Local dining, cafes, and hospitality spaces. For restaurant build-outs and renovations in South Florida, R Interiors Corp provides clean drywall and durable stucco finishes.',
    highlights: [
      'Interior dining room drywall & ceiling finishes',
      'Exterior storefront stucco & facade finishing',
      'Reliable weekday scheduling (Mon–Fri, 7:00 AM – 4:30 PM)',
    ],
  },
  {
    id: 'landscaping',
    label: 'Landscaping',
    subtitle: 'Agriculture & Lawn',
    description:
      'Outdoor property enhancement, lawn care, and exterior curb appeal. Pair exterior landscaping upgrades with crisp stucco finishing for a complete property refresh.',
    highlights: [
      'Exterior perimeter wall & facade stucco finishing',
      'Weather-resistant South Florida exterior textures',
      'Clean job site practices around landscaping',
    ],
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    subtitle: 'Medical & Dental',
    description:
      'Clinics, dental offices, and medical suites require smooth, clean, and precisely finished interior walls and ceilings.',
    highlights: [
      'Smooth, paint-ready interior drywall finishing',
      'Clean, dust-conscious installation practices',
      'Dependable scheduling for commercial interiors',
    ],
  },
  {
    id: 'hvac',
    label: 'HVAC',
    subtitle: 'Heating & Cooling',
    description:
      'Heating, ventilation, and air conditioning trades. After ductwork or mechanical upgrades, R Interiors Corp restores and finishes drywall walls and ceilings seamlessly.',
    highlights: [
      'Drywall patching & ceiling restoration after HVAC work',
      'Seamless joint & texture matching',
      'Fast, clean turnaround for residential & commercial spaces',
    ],
  },
  {
    id: 'realestate',
    label: 'Real Estate',
    subtitle: 'Agents & Managers',
    description:
      'Property managers, realtors, and homeowners preparing listings or managing renovations in Deerfield Beach and surrounding areas.',
    highlights: [
      'Curb-appeal stucco finishing & exterior repairs',
      'Pre-listing interior drywall finishing & updates',
      'Direct communication & free project estimates',
    ],
  },
  {
    id: 'trucking',
    label: 'Trucking',
    subtitle: 'Freight & Logistics',
    description:
      'Freight, logistics, and warehouse facilities. Commercial offices and bays benefit from durable exterior stucco and clean interior drywall partitions.',
    highlights: [
      'Commercial office & facility drywall installation',
      'Durable exterior stucco finishes',
      '27+ years of contracting experience',
    ],
  },
  {
    id: 'lawyers',
    label: 'Lawyers',
    subtitle: 'Legal & Professional',
    description:
      'Law firms and professional office suites looking for refined interior drywall and acoustic-ready wall finishes.',
    highlights: [
      'Clean, sharp interior wall & corner finishes',
      'Professional communication from estimate to completion',
      'Serving Deerfield Beach & surrounding areas',
    ],
    hiddenFromGrid: true,
  },
  {
    id: 'automotive',
    label: 'Automotive',
    subtitle: 'Auto & Service Centers',
    description:
      'Automotive showrooms, service bays, and customer lounges requiring durable exterior stucco and clean interior drywall.',
    highlights: [
      'Commercial showroom & lounge drywall installation',
      'Weather-durable exterior stucco finishing',
      'Cost-effective, lasting solutions',
    ],
    hiddenFromGrid: true,
  },
];

export const DIRECTORY_RESOURCES = [
  {
    id: 'construction-guide',
    badge: 'Industry Guide',
    title: 'Construction & Stucco Craftsmanship Guide',
    summary:
      'How South Florida climate, surface preparation, and multi-coat stucco systems protect residential and commercial exteriors.',
    sections: [
      {
        heading: 'Exterior Stucco Durability in Florida',
        body: 'In coastal South Florida environments like Deerfield Beach, exterior stucco must resist humidity, rain, and UV exposure. Clean lath/substrate prep, uniform base coats, and consistent finish textures prevent premature hairline cracking and moisture intrusion.',
      },
      {
        heading: 'Precision Interior Drywall Finishing',
        body: 'Seamless interior walls start with accurate board alignment, secure fastening, and feathered joint compound coats. Smooth corners and consistent ceiling finishes leave interiors ready for primer and paint.',
      },
    ],
  },
  {
    id: 'business-listings',
    badge: 'Business Profile',
    title: 'Verified Business Listing Details',
    summary:
      'Official profile summary for R Interiors Corp including verified address, phone, email, and weekday operating schedule.',
    sections: [
      {
        heading: 'Verified Business Record',
        body: 'R Interiors Corp operates from 1240 SW 6th Terrace, Deerfield Beach, FL 33441. Serving Deerfield Beach and surrounding areas since 2015 with 27+ years of trade experience.',
      },
      {
        heading: 'Direct Communication',
        body: 'Homeowners, builders, and property managers can contact the team directly by phone at (954) 914-6897 or by email at info@rinteriorscorp.com Monday through Friday, 7:00 AM – 4:30 PM.',
      },
    ],
  },
  {
    id: 'terms-privacy',
    badge: 'Policies',
    title: 'Terms & Privacy Information',
    summary:
      'How estimate inquiry details, uploaded project photos, and contact requests are handled inside this mobile application.',
    sections: [
      {
        heading: 'Estimate Inquiry Privacy',
        body: 'Information you enter in the Request an Estimate screen (name, email, phone, project address, description, and optional images) is used solely to prepare your inquiry for R Interiors Corp.',
      },
      {
        heading: 'Terms of Use',
        body: 'Project estimates, timelines, and scopes of work are confirmed directly with R Interiors Corp following project review.',
      },
    ],
  },
];

export const DIRECTORY_FAQS = [
  {
    q: 'What areas does R Interiors Corp serve?',
    a: 'R Interiors Corp is based at 1240 SW 6th Terrace, Deerfield Beach, FL 33441 and proudly serves Deerfield Beach and surrounding South Florida areas.',
  },
  {
    q: 'What services are verified for R Interiors Corp?',
    a: 'We specialize in professional Stucco Finishing and precision Drywall Installation, backed by over 27 years of experience and serving locally since 2015.',
  },
  {
    q: 'How can I request an estimate or check hours?',
    a: 'Use the Request Free Estimate form in the app, email info@rinteriorscorp.com, or call (954) 914-6897 Monday–Friday from 7:00 AM to 4:30 PM.',
  },
];
