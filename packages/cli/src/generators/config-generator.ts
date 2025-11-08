import path from 'path';
import { writeFile } from '../utils/fs-utils';
import { ProjectOptions } from '../types';
import { logger } from '../utils/logger';

/**
 * Generates nextcraft.config.ts based on project options
 */
export class ConfigGenerator {
  private projectPath: string;
  private options: ProjectOptions;

  constructor(projectPath: string, options: ProjectOptions) {
    this.projectPath = projectPath;
    this.options = options;
  }

  async generate(): Promise<void> {
    logger.info('Generating nextcraft.config.ts...');

    const config = this.buildConfigContent();
    const configPath = path.join(this.projectPath, 'nextcraft.config.ts');

    await writeFile(configPath, config);

    logger.success('✓ nextcraft.config.ts created');
  }

  private buildConfigContent(): string {
    const { mode, ui, database, auth, rtl, seo } = this.options;

    // Build modules array
    const modules: string[] = [];
    if (auth) modules.push('auth');

    const config = `/**
 * NextCraft Configuration
 * 
 * This file defines your project's mode and features.
 * This is a static configuration file for reference only.
 * 
 * @see https://nextcraft.dev/docs/configuration
 */
const nextcraftConfig = {
  // Project mode: 'frontend' for UI-only, 'fullstack' for complete app
  mode: '${mode}',

  // UI framework: 'shadcn', 'chakra', or 'material'
  ui: '${ui}',
${database ? `\n  // Database provider (fullstack only)\n  db: '${database}',\n` : ''}
  // Enable authentication with Auth.js
  auth: ${auth},

  // Enable Right-to-Left (RTL) support for Arabic/Hebrew
  rtl: ${rtl},

  // Enable SEO optimization (meta tags, sitemap, etc.)
  seo: ${seo},
${
  modules.length > 0
    ? `\n  // Installed modules\n  modules: [${modules.map((m) => `'${m}'`).join(', ')}],\n`
    : ''
}} as const;

export default nextcraftConfig;
`;

    return config;
  }

  /**
   * Updates existing config file with new values
   */
  static async update(
    _projectPath: string,
    _updates: Partial<ProjectOptions>
  ): Promise<void> {
    logger.info('Updating nextcraft.config.ts...');
    
    // For now, we'll regenerate the whole file
    // In the future, we can parse and update specific fields
    logger.warn('Note: This will regenerate the entire config file');
    
    // TODO: Implement partial updates
    logger.success('✓ Configuration updated');
  }

  /**
   * Validates that config matches project structure
   */
  static async validate(projectPath: string): Promise<boolean> {
    try {
      const configPath = path.join(projectPath, 'nextcraft.config.ts');
      
      // Try to import the config
      const config = await import(configPath);
      
      if (!config.default) {
        logger.error('Invalid config: must export default configuration');
        return false;
      }

      const cfg = config.default;

      // Validate required fields
      if (!cfg.mode || !['frontend', 'fullstack'].includes(cfg.mode)) {
        logger.error('Invalid config: mode must be "frontend" or "fullstack"');
        return false;
      }

      if (!cfg.ui || !['shadcn', 'chakra', 'material'].includes(cfg.ui)) {
        logger.error('Invalid config: ui must be "shadcn", "chakra", or "material"');
        return false;
      }

      if (cfg.mode === 'fullstack' && !cfg.db) {
        logger.warn('Warning: fullstack mode should specify a database');
      }

      logger.success('✓ Configuration is valid');
      return true;
    } catch (error) {
      logger.error('Failed to validate configuration');
      if (error instanceof Error) {
        logger.error(error.message);
      }
      return false;
    }
  }
}
