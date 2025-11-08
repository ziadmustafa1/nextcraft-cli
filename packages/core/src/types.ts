export type ProjectMode = 'frontend' | 'fullstack';
export type UIFramework = 'shadcn' | 'chakra' | 'material';
export type DatabaseType = 'postgres' | 'sqlite' | 'mysql';

export interface NextCraftConfig {
  mode: ProjectMode;
  ui: UIFramework;
  db?: DatabaseType;
  auth: boolean;
  rtl: boolean;
  seo: boolean;
  modules?: string[];
}
