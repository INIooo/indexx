export type TabType = 'HOME' | 'PROJECTS' | 'LAB' | 'CONTACT';

export interface FeaturedProject {
  id: string;
  projectCode: string;
  title: string;
  description: string;
  image: string;
  categoryBadge: string;
  badgeBg: string;
  badgeText: string;
}

export interface DeployedModule {
  id: string;
  num: string;
  category: 'GAMES' | 'ENGINES' | 'UTILITIES';
  tags: string[];
  title: string;
  description: string;
  image?: string;
  cpuEff?: string;
  ledStatus: ('teal' | 'orange' | 'dim')[];
  modelId?: string;
  accuracy?: string;
}

export interface VuMeterData {
  name: string;
  pwr: number;
}
