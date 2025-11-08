#!/usr/bin/env node

import { Command } from 'commander';
import { execa } from 'execa';
import path from 'path';
import { NEXTCRAFT_VERSION, AVAILABLE_MODULES } from './constants';
import { logger } from './utils/logger';
import { fileExists } from './utils/fs-utils';
import { detectPackageManager } from './utils/package-manager';
import { validateProjectMode } from './validators/mode-validator';

const program = new Command();

program
  .name('forge')
  .description('NextCraft project management tool')
  .version(NEXTCRAFT_VERSION);

// Add module
program
  .command('add <module>')
  .description('Add a module to your project')
  .action(async (moduleName: string) => {
    try {
      if (!AVAILABLE_MODULES.includes(moduleName as any)) {
        logger.error(`Unknown module: ${moduleName}`);
        logger.info(`Available modules: ${AVAILABLE_MODULES.join(', ')}`);
        process.exit(1);
      }

      logger.startSpinner(`Adding ${moduleName} module...`);

      // Check if nextcraft.config.ts exists
      const configPath = path.join(process.cwd(), 'nextcraft.config.ts');
      if (!(await fileExists(configPath))) {
        logger.failSpinner('Not a NextCraft project');
        logger.error('nextcraft.config.ts not found');
        process.exit(1);
      }

      // Module-specific setup
      switch (moduleName) {
        case 'auth':
          await addAuthModule();
          break;
        case 'users':
          await addUsersModule();
          break;
        case 'blog':
          await addBlogModule();
          break;
        case 'admin':
          await addAdminModule();
          break;
        default:
          logger.warn(`Module ${moduleName} not yet implemented`);
      }

      logger.succeedSpinner(`${moduleName} module added successfully`);
    } catch (error) {
      logger.failSpinner('Failed to add module');
      if (error instanceof Error) {
        logger.error(error.message);
      }
      process.exit(1);
    }
  });

// Dev command
program
  .command('dev')
  .description('Start development server')
  .action(async () => {
    try {
      const packageManager = detectPackageManager();

      logger.info(`Starting development server with ${packageManager}...`);
      logger.newLine();

      await execa(packageManager, ['dev'], {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
    } catch (error) {
      logger.error('Failed to start development server');
      process.exit(1);
    }
  });

// Build command
program
  .command('build')
  .description('Build project for production')
  .action(async () => {
    try {
      const packageManager = detectPackageManager();

      logger.startSpinner('Building project...');

      await execa(packageManager, ['run', 'build'], {
        stdio: 'inherit',
        cwd: process.cwd(),
      });

      logger.succeedSpinner('Build completed');
    } catch (error) {
      logger.failSpinner('Build failed');
      process.exit(1);
    }
  });

// Doctor command
program
  .command('doctor')
  .description('Check project health and validate structure')
  .action(async () => {
    try {
      logger.title('🔍 NextCraft Doctor');

      // 1. Check essential files
      logger.info('Checking essential files...');
      const checks = [
        { name: 'package.json', path: 'package.json', required: true },
        { name: 'next.config.ts', path: 'next.config.ts', required: true },
        { name: 'tsconfig.json', path: 'tsconfig.json', required: true },
        { name: 'nextcraft.config.ts', path: 'nextcraft.config.ts', required: false },
      ];

      let hasErrors = false;

      for (const check of checks) {
        const exists = await fileExists(path.join(process.cwd(), check.path));
        if (exists) {
          logger.success(`✓ ${check.name} found`);
        } else {
          if (check.required) {
            logger.error(`✗ ${check.name} missing (required)`);
            hasErrors = true;
          } else {
            logger.warn(`⚠ ${check.name} missing (optional)`);
          }
        }
      }

      logger.newLine();

      // 2. Validate project mode
      logger.info('Validating project structure...');
      const isValid = await validateProjectMode(process.cwd());

      if (!isValid) {
        hasErrors = true;
      }

      // 3. Final summary
      if (hasErrors) {
        logger.newLine();
        logger.error('❌ Health check found issues. Please fix them before continuing.');
        process.exit(1);
      } else {
        logger.newLine();
        logger.success('✅ All health checks passed! Your project is in good shape.');
      }
    } catch (error) {
      logger.error('Health check failed');
      if (error instanceof Error) {
        logger.error(error.message);
      }
      process.exit(1);
    }
  });

// Helper functions for adding modules
async function addAuthModule(): Promise<void> {
  logger.info('Setting up authentication...');
  // Implementation would go here
}

async function addUsersModule(): Promise<void> {
  logger.info('Setting up users module...');
  // Implementation would go here
}

async function addBlogModule(): Promise<void> {
  logger.info('Setting up blog module...');
  // Implementation would go here
}

async function addAdminModule(): Promise<void> {
  logger.info('Setting up admin dashboard...');
  // Implementation would go here
}

program.parse();
