import { NextCraftConfig } from './types';

export function defineConfig(config: NextCraftConfig): NextCraftConfig {
  return config;
}

export const defaultConfig: NextCraftConfig = {
  mode: 'frontend',
  ui: 'shadcn',
  auth: false,
  rtl: false,
  seo: true,
  modules: [],
};
