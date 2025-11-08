export type ProjectMode = 'frontend' | 'fullstack';

export type DatabaseType = 'postgres' | 'sqlite' | 'mysql';

export type UIFramework = 'shadcn' | 'chakra' | 'material';

export interface NextCraftConfig {
  mode: ProjectMode;
  ui: UIFramework;
  db?: DatabaseType;
  auth: boolean;
  rtl: boolean;
  seo: boolean;
  modules?: string[];
}

export interface ProjectOptions {
  name: string;
  mode: ProjectMode;
  ui: UIFramework;
  database?: DatabaseType;
  auth: boolean;
  rtl: boolean;
  seo: boolean;
  path?: string;
}

export interface ModuleConfig {
  name: string;
  description: string;
  dependencies: string[];
  files: ModuleFile[];
}

export interface ModuleFile {
  path: string;
  content: string;
  type: 'route' | 'component' | 'api' | 'prisma' | 'config';
}

export interface TemplateFile {
  source: string;
  destination: string;
  transform?: (content: string, options: ProjectOptions) => string;
}
