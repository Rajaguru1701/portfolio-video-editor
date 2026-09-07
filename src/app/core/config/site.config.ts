import { resolveAssetUrl } from '../utils/asset.util';

export interface SiteConfig {
  name: string;
  creatorName: string;
  title: string;
  tagline: string;
  bioSummary: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  heroBg?: string;
  education: {
    institution: string;
    course: string;
  }[];
  experiences: {
    title: string;
    type: string;
    role: string;
    bullets?: string[];
    description?: string;
  }[];
  tools: {
    code: string;
    name: string;
  }[];
  expertise: string[];
  creativeFocus: string[];
  socials: {
    instagram?: string;
    whatsapp?: string;
    behance?: string;
    youtube?: string;
    linkedin?: string;
  };
  navigation: {
    label: string;
    path: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: 'PORTFOLIO // NALLAMUTHU M',
  creatorName: 'Nallamuthu M',
  title: 'Graphic Designer & Video Editor',
  tagline: 'Visual stories crafted through graphic design, video editing, and UI/UX design.',
  bioSummary: 'I am a creative designer with expertise in graphic design, video editing, and UI/UX design. I create visually engaging designs and digital experiences with a strong focus on creativity, quality, and attention to detail.',
  email: 'Sabarinaren1978@gmail.com',
  phone: '+91 824-859-9446',
  location: 'Madurai, Tamil Nadu, India',
  avatar: resolveAssetUrl('assets/images/sab.jpeg'),
  heroBg: resolveAssetUrl('assets/images/sabbk.jpeg'),
  education: [
    {
      institution: 'The American College',
      course: 'B.Voc Media Technology (2025 – 2027)'
    },
    {
      institution: 'Buff Institute of Design Madurai',
      course: 'AD Tech (6-Month Professional Design Course)'
    }
  ],
  experiences: [
    {
      title: 'Buff Institute of Design',
      type: '3-Month Internship',
      role: 'Graphic Design Intern',
      bullets: [
        'Designed posters, banners, and social media creatives.',
        'Created logo concepts and branding materials.',
        'Assisted in print and digital design projects.',
        'Worked extensively with Adobe Photoshop & Illustrator.'
      ]
    },
    {
      title: 'Freelance Designer & Editor',
      type: 'Client Projects',
      role: 'Freelance Designer & Video Editor',
      description: 'Designed brand identities, logos, social media content, and promotional videos for diverse freelance clients.'
    }
  ],
  tools: [
    { code: 'Ps', name: 'Adobe Photoshop' },
    { code: 'Ai', name: 'Adobe Illustrator' },
    { code: 'Pr', name: 'Adobe Premiere Pro' },
    { code: 'Ae', name: 'Adobe After Effects' },
    { code: 'Fg', name: 'Figma' },
    { code: '📷', name: 'DSLR / Mirrorless Camera' }
  ],
  expertise: [
    'Graphic Design',
    'Video Editing',
    'UI/UX Design',
    'Photography',
    'Videography',
    'Branding',
    'Social Media Design'
  ],
  creativeFocus: [
    'Logo Identity',
    'Poster Design',
    'Video Reels',
    'UI Layouts',
    'Print Media',
    'Brand Kits'
  ],
  socials: {
    whatsapp: 'https://wa.me/918248599446',
    instagram: 'https://instagram.com',
    behance: 'https://behance.net'
  },
  navigation: [
    { label: 'Home', path: '/' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ]
};
