import path from 'path';
import { ensureDir, writeFile } from '../utils/fs-utils';
import { logger } from '../utils/logger';
import { execa } from 'execa';
import {
  prettierConfig,
  prettierIgnore,
  eslintConfigFlat,
  huskyPreCommit,
  lintStagedConfig,
  vitestConfig,
  vitestSetup,
  tsConfigStrict,
  commitlintConfig,
  editorConfig,
  vscodeSettings,
  vscodeExtensions,
  githubWorkflowCI
} from '../templates/senior-configs';

/**
 * Senior-Level Setup (2025 Standards)
 * Configures project with industry-standard tooling
 */
export class SeniorSetup {
  private projectPath: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
  }

  /**
   * Setup all senior-level configurations
   */
  async setupAll(): Promise<void> {
    logger.info('⚙️  Setting up Senior-Level configurations...');

    await this.setupPrettier();
    await this.setupESLint();
    await this.setupTypeScriptStrict();
    await this.setupHusky();
    await this.setupTesting();
    await this.setupEditorConfig();
    await this.setupVSCode();
    await this.setupGitHubActions();
    await this.updatePackageScripts();

    logger.success('✓ Senior-Level setup completed');
  }

  /**
   * Setup Prettier (Code Formatting)
   */
  private async setupPrettier(): Promise<void> {
    await writeFile(
      path.join(this.projectPath, '.prettierrc'),
      prettierConfig
    );

    await writeFile(
      path.join(this.projectPath, '.prettierignore'),
      prettierIgnore
    );

    logger.info('✓ Prettier configured');
  }

  /**
   * Setup ESLint (Code Quality)
   */
  private async setupESLint(): Promise<void> {
    await writeFile(
      path.join(this.projectPath, 'eslint.config.mjs'),
      eslintConfigFlat
    );

    logger.info('✓ ESLint configured (Flat Config)');
  }

  /**
   * Setup TypeScript with Strict Mode
   */
  private async setupTypeScriptStrict(): Promise<void> {
    await writeFile(
      path.join(this.projectPath, 'tsconfig.json'),
      tsConfigStrict
    );

    logger.info('✓ TypeScript strict mode enabled');
  }

  /**
   * Setup Husky (Git Hooks)
   */
  private async setupHusky(): Promise<void> {
    // Create .husky directory
    const huskyDir = path.join(this.projectPath, '.husky');
    await ensureDir(huskyDir);

    // Pre-commit hook
    await writeFile(
      path.join(huskyDir, 'pre-commit'),
      huskyPreCommit
    );

    // Make pre-commit executable
    try {
      await execa('chmod', ['+x', path.join(huskyDir, 'pre-commit')]);
    } catch {
      // Ignore on Windows
    }

    // lint-staged config
    await writeFile(
      path.join(this.projectPath, '.lintstagedrc'),
      lintStagedConfig
    );

    // commitlint config
    await writeFile(
      path.join(this.projectPath, 'commitlint.config.mjs'),
      commitlintConfig
    );

    logger.info('✓ Husky & Git hooks configured');
  }

  /**
   * Setup Testing (Vitest)
   */
  private async setupTesting(): Promise<void> {
    // Vitest config
    await writeFile(
      path.join(this.projectPath, 'vitest.config.ts'),
      vitestConfig
    );

    // Vitest setup
    await writeFile(
      path.join(this.projectPath, 'vitest.setup.ts'),
      vitestSetup
    );

    // Create __tests__ directory
    const testsDir = path.join(this.projectPath, '__tests__');
    await ensureDir(testsDir);

    // Example test
    const exampleTest = `import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('Example Test', () => {
  it('should work', () => {
    expect(true).toBe(true)
  })
})
`;

    await writeFile(
      path.join(testsDir, 'example.test.tsx'),
      exampleTest
    );

    logger.info('✓ Testing configured (Vitest)');
  }

  /**
   * Setup .editorconfig
   */
  private async setupEditorConfig(): Promise<void> {
    await writeFile(
      path.join(this.projectPath, '.editorconfig'),
      editorConfig
    );

    logger.info('✓ EditorConfig created');
  }

  /**
   * Setup VSCode settings
   */
  private async setupVSCode(): Promise<void> {
    const vscodeDir = path.join(this.projectPath, '.vscode');
    await ensureDir(vscodeDir);

    // Settings
    await writeFile(
      path.join(vscodeDir, 'settings.json'),
      vscodeSettings
    );

    // Extensions
    await writeFile(
      path.join(vscodeDir, 'extensions.json'),
      vscodeExtensions
    );

    logger.info('✓ VSCode settings configured');
  }

  /**
   * Setup GitHub Actions CI/CD
   */
  private async setupGitHubActions(): Promise<void> {
    const workflowsDir = path.join(this.projectPath, '.github', 'workflows');
    await ensureDir(workflowsDir);

    await writeFile(
      path.join(workflowsDir, 'ci.yml'),
      githubWorkflowCI
    );

    logger.info('✓ GitHub Actions CI/CD configured');
  }

  /**
   * Update package.json scripts
   */
  private async updatePackageScripts(): Promise<void> {
    const packageJsonPath = path.join(this.projectPath, 'package.json');
    const fs = await import('fs-extra');
    const packageJson = await fs.readJson(packageJsonPath);

    // Add senior-level scripts
    packageJson.scripts = {
      ...packageJson.scripts,
      dev: 'next dev --turbo',
      build: 'next build',
      start: 'next start',
      lint: 'eslint . --ext .ts,.tsx --max-warnings 0',
      'lint:fix': 'eslint . --ext .ts,.tsx --fix',
      format: 'prettier --write "**/*.{ts,tsx,json,md}"',
      'format:check': 'prettier --check "**/*.{ts,tsx,json,md}"',
      typecheck: 'tsc --noEmit',
      test: 'vitest run',
      'test:watch': 'vitest',
      'test:coverage': 'vitest run --coverage',
      'test:ui': 'vitest --ui',
      prepare: 'husky',
      validate: 'pnpm lint && pnpm typecheck && pnpm test',
    };

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    logger.info('✓ Package scripts updated');
  }

  /**
   * Initialize Husky after install
   */
  static async initializeHusky(projectPath: string): Promise<void> {
    try {
      await execa('pnpm', ['exec', 'husky', 'init'], {
        cwd: projectPath,
      });
      logger.info('✓ Husky initialized');
    } catch (error) {
      logger.warn('⚠ Husky init skipped (will be initialized on first install)');
    }
  }
}

/**
 * Helper function to setup senior-level configurations
 */
export async function setupSeniorConfig(projectPath: string): Promise<void> {
  const setup = new SeniorSetup(projectPath);
  await setup.setupAll();
}
