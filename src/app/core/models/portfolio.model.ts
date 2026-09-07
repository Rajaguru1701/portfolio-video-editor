export type ProjectType = 'image' | 'video';

export type ProjectCategory = 
  | 'Video Editing'
  | 'Photography'
  | 'Graphic Design'
  | 'Branding'
  | 'Motion Graphics'
  | 'Logo Design'
  | 'Other Works'
  | 'Commercial Posters'
  | string;

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory | string;
  type: ProjectType;
  thumbnail: string;
  media: string;
  featured: boolean;
  year: number;
  client?: string;
  role?: string;
  duration?: string;
  tools?: string[];
  tags: string[];
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:5' | string;
}

export interface CategoryFilterItem {
  name: string;
  count: number;
}
