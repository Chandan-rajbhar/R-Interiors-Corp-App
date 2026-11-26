import heroExterior from '../assets/images/hero-exterior.jpg';
import stuccoFinishing from '../assets/images/stucco-finishing.jpg';
import drywallInstallation from '../assets/images/drywall-installation.jpg';
import stuccoTextureDetail from '../assets/images/stucco-texture-detail.jpg';
import interiorLivingDrywall from '../assets/images/interior-living-drywall.jpg';
import commercialStuccoFacade from '../assets/images/commercial-stucco-facade.jpg';

export const SERVICES_DATA = [
  {
    id: 'stucco-finishing',
    slug: 'stucco-finishing',
    title: 'Stucco Finishing',
    searchTerms: ['stucco', 'stucco finishing', 'stucco contractor', 'contractors', 'home improvement'],
    shortDescription:
      'Professional stucco finishing solutions with quality-focused workmanship and attractive, durable finishes.',
    fullDescription:
      'R Interiors Corp delivers dependable exterior and interior stucco finishing designed for lasting durability and curb appeal. With over 27 years of hands-on trade expertise, we handle surface preparation, uniform texture application, architectural trim, and clean finishing.',
    image: stuccoFinishing,
    galleryImages: [stuccoFinishing, stuccoTextureDetail, commercialStuccoFacade],
    benefits: [
      'Attractive, uniform textures tailored to your property style',
      'Durable exterior protection suited for Florida weather',
      'Careful surface preparation and clean edge detailing',
      'Quality-focused workmanship backed by 27+ years of experience',
    ],
    whyChoose:
      'Serving Deerfield Beach since 2015 with over 27 years of stucco contracting expertise, R Interiors Corp combines reliable scheduling, clean job sites, and durable finishes built to last.',
  },
  {
    id: 'drywall-installation',
    slug: 'drywall-installation',
    title: 'Drywall Installation',
    searchTerms: ['drywall', 'drywall installation', 'drywall services', 'contractors', 'interior construction', 'home improvement'],
    shortDescription:
      'Professional drywall installation with precision-focused work and clean, lasting craftsmanship.',
    fullDescription:
      'Precision drywall installation forms the foundation of every refined interior. R Interiors Corp provides accurate hanging, taping, mudding, and smooth finishing so your walls and ceilings are ready for paint and daily living.',
    image: drywallInstallation,
    galleryImages: [drywallInstallation, interiorLivingDrywall],
    benefits: [
      'Precision alignment for walls, ceilings, and architectural details',
      'Smooth, seamless joints and crisp corner finishing',
      'Clean workspace practices and dependable turnaround',
      'Built for residential renovations and interior upgrades',
    ],
    whyChoose:
      'Our team brings meticulous attention to detail and clear communication from initial measurement to final sanding, ensuring your interior surfaces meet high standards.',
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'Exterior Stucco Architecture',
    category: 'Stucco',
    caption: 'Illustrative South Florida residential exterior showcasing clean stucco lines and architectural lighting.',
    image: heroExterior,
    isIllustrative: true,
  },
  {
    id: 'gal-2',
    title: 'Classic Stucco Arches & Trim',
    category: 'Stucco',
    caption: 'Illustrative stucco finishing with crisp decorative arches and uniform exterior texture.',
    image: stuccoFinishing,
    isIllustrative: true,
  },
  {
    id: 'gal-3',
    title: 'Textured Stucco Wall Detail',
    category: 'Stucco',
    caption: 'Illustrative close-up of finely textured exterior stucco with architectural sconce lighting.',
    image: stuccoTextureDetail,
    isIllustrative: true,
  },
  {
    id: 'gal-4',
    title: 'Coffered Ceiling & Drywall',
    category: 'Drywall',
    caption: 'Illustrative precision drywall installation featuring crisp ceiling lines and recessed lighting.',
    image: drywallInstallation,
    isIllustrative: true,
  },
  {
    id: 'gal-5',
    title: 'Seamless Interior Living Space',
    category: 'Drywall',
    caption: 'Illustrative finished interior room highlighting smooth drywall walls and natural daylight.',
    image: interiorLivingDrywall,
    isIllustrative: true,
  },
  {
    id: 'gal-6',
    title: 'Contemporary Stucco Facade',
    category: 'Stucco',
    caption: 'Illustrative contemporary building facade with smooth stucco finish and dark architectural accents.',
    image: commercialStuccoFacade,
    isIllustrative: true,
  },
];

export const HERO_IMAGE = heroExterior;
