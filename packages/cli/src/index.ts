#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import { NEXTCRAFT_VERSION } from './constants';
import { logger } from './utils/logger';
import { promptForProjectOptions, confirmOverwrite } from './prompts';
import { validateProjectName, isDirectoryEmpty } from './utils/fs-utils';
import { FrontendGenerator } from './generators/frontend-generator';
import { FullstackGenerator } from './generators/fullstack-generator';

const program = new Command();

program
  .name('create-nextcraft-app')
  .description('Create a new NextCraft project')
  .version(NEXTCRAFT_VERSION)
  .argument('[project-name]', 'Name of the project')
  .option('-m, --mode <mode>', 'Project mode (frontend|fullstack)')
  .option('--ui <framework>', 'UI framework (shadcn|chakra|material)')
  .option('--db <database>', 'Database (postgres|sqlite|mysql)')
  .option('--auth', 'Include authentication')
  .option('--rtl', 'Enable RTL support')
  .option('--no-seo', 'Disable SEO optimization')
  .option('-y, --yes', 'Use default options (non-interactive)')
  .action(async (projectName: string | undefined, options: any) => {
    try {
      logger.title('🎨 Welcome to NextCraft');

      // Get project name
      if (!projectName) {
        const { prompt } = await import('enquirer');
        const answer = await prompt<{ name: string }>({
          type: 'input',
          name: 'name',
          message: 'What is your project name?',
          initial: 'my-nextcraft-app',
        });
        projectName = answer.name;
      }

      // Validate project name
      if (!validateProjectName(projectName)) {
        logger.error('Invalid project name. Use lowercase letters, numbers, and hyphens only.');
        process.exit(1);
      }

      // Check if directory exists and is not empty
      const projectPath = path.resolve(process.cwd(), projectName);
      const isEmpty = await isDirectoryEmpty(projectPath);

      if (!isEmpty) {
        // Skip overwrite confirmation in non-interactive mode
        if (!options.yes) {
          const shouldContinue = await confirmOverwrite(projectPath);
          if (!shouldContinue) {
            logger.info('Operation cancelled.');
            process.exit(0);
          }
        }
      }

      // Get project options
      let projectOptions;
      
      // Non-interactive mode with --yes or all options provided via CLI
      if (options.yes || (options.mode && options.ui)) {
        projectOptions = {
          name: projectName,
          mode: options.mode || 'frontend',
          ui: options.ui || 'shadcn',
          database: options.db || 'sqlite',
          auth: options.auth || false,
          rtl: options.rtl || false,
          seo: options.seo !== false,
          path: projectPath,
        };
      } else {
        // Interactive mode with prompts
        projectOptions = await promptForProjectOptions(projectName);
      }

      // Generate project
      logger.newLine();
      logger.title(`Creating ${projectOptions.mode} project...`);

      const Generator =
        projectOptions.mode === 'fullstack' ? FullstackGenerator : FrontendGenerator;

      const generator = new Generator(projectOptions);
      await generator.generate();

      logger.newLine();
      logger.success('🎉 Project created successfully!');
    } catch (error) {
      logger.error('Failed to create project');
      if (error instanceof Error) {
        logger.error(error.message);
      }
      process.exit(1);
    }
  });

program.parse();
