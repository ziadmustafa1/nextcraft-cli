import path from 'path';
import { fileExists } from '../utils/fs-utils';
import { logger } from '../utils/logger';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  mode: 'frontend' | 'fullstack' | 'unknown';
  name: string;
}

/**
 * Validates the project structure based on detected mode
 */
export class ModeValidator {
  private projectPath: string;

  constructor(projectPath: string) {
    this.projectPath = projectPath;
  }

  async validate(): Promise<ValidationResult> {
    const result: ValidationResult = {
      valid: true,
      errors: [],
      warnings: [],
      mode: 'unknown',
      name: 'production', // Default value
    };

    // Detect mode
    const mode = await this.detectMode();
    result.mode = mode;

    if (mode === 'frontend') {
      await this.validateFrontendMode(result);
    } else if (mode === 'fullstack') {
      await this.validateFullstackMode(result);
    } else {
      result.valid = false;
      result.errors.push('Could not detect project mode');
    }

    return result;
  }

  private async detectMode(): Promise<'frontend' | 'fullstack' | 'unknown'> {
    // Check for Prisma schema (indicator of fullstack)
    const hasPrisma = await fileExists(path.join(this.projectPath, 'prisma', 'schema.prisma'));
    
    // Check for API routes beyond basic structure
    const hasApiAuth = await fileExists(
      path.join(this.projectPath, 'src', 'app', 'api', 'auth')
    );
    
    const hasDbLib = await fileExists(
      path.join(this.projectPath, 'src', 'lib', 'db', 'prisma.ts')
    );

    if (hasPrisma || hasApiAuth || hasDbLib) {
      return 'fullstack';
    }

    // Check for basic Next.js structure
    const hasAppDir = await fileExists(path.join(this.projectPath, 'src', 'app'));
    
    if (hasAppDir) {
      return 'frontend';
    }

    return 'unknown';
  }

  private async validateFrontendMode(result: ValidationResult): Promise<void> {
    logger.info('🔍 Validating Frontend mode...');

    // Required files/dirs for Frontend
    const requiredPaths = [
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/components',
      'src/lib',
      'src/hooks',
      'next.config.ts',
      'package.json',
      'tsconfig.json',
    ];

    for (const requiredPath of requiredPaths) {
      const exists = await fileExists(path.join(this.projectPath, requiredPath));
      if (!exists) {
        result.errors.push(`Missing required file/directory: ${requiredPath}`);
        result.valid = false;
      }
    }

    // Files that should NOT exist in Frontend mode
    const forbiddenPaths = [
      'prisma/schema.prisma',
      'src/lib/db/prisma.ts',
      'src/app/api/auth/[...nextauth]',
    ];

    for (const forbiddenPath of forbiddenPaths) {
      const exists = await fileExists(path.join(this.projectPath, forbiddenPath));
      if (exists) {
        result.warnings.push(
          `Frontend mode should not have: ${forbiddenPath} (consider using fullstack mode)`
        );
      }
    }

    // Check for API client
    const hasApiClient = await fileExists(
      path.join(this.projectPath, 'src', 'lib', 'api-client.ts')
    );
    if (!hasApiClient) {
      result.warnings.push('Missing src/lib/api-client.ts - recommended for API calls');
    }

    logger.success(`✓ Frontend mode validation completed`);
  }

  private async validateFullstackMode(result: ValidationResult): Promise<void> {
    logger.info('🔍 Validating Fullstack mode...');

    // Required files for Fullstack (includes all Frontend requirements)
    const requiredPaths = [
      'src/app/layout.tsx',
      'src/app/page.tsx',
      'src/components',
      'src/lib',
      'prisma/schema.prisma',
      'src/lib/db/prisma.ts',
      'src/app/api',
      '.env.example',
      'next.config.ts',
      'package.json',
      'tsconfig.json',
    ];

    for (const requiredPath of requiredPaths) {
      const exists = await fileExists(path.join(this.projectPath, requiredPath));
      if (!exists) {
        result.errors.push(`Missing required file/directory: ${requiredPath}`);
        result.valid = false;
      }
    }

    // Check for API routes
    const hasHealthRoute = await fileExists(
      path.join(this.projectPath, 'src', 'app', 'api', 'health', 'route.ts')
    );
    if (!hasHealthRoute) {
      result.warnings.push('Missing health check API route');
    }

    // Check for .env file
    const hasEnv = await fileExists(path.join(this.projectPath, '.env'));
    if (!hasEnv) {
      result.warnings.push('Missing .env file - copy from .env.example and configure');
    }

    logger.success(`✓ Fullstack mode validation completed`);
  }

  async printReport(result: ValidationResult): Promise<void> {
    logger.newLine();
    logger.title('📋 Mode Validation Report');
    
    logger.info(`Detected Mode: ${result.mode.toUpperCase()}`);
    logger.info(`Project Name: ${result.name}`);
    logger.newLine();

    if (result.errors.length === 0 && result.warnings.length === 0) {
      logger.success('✓ All checks passed! Project structure is valid.');
    } else {
      if (result.errors.length > 0) {
        logger.error(`Found ${result.errors.length} error(s):`);
        result.errors.forEach((err) => logger.error(`  ✗ ${err}`));
        logger.newLine();
      }

      if (result.warnings.length > 0) {
        logger.warn(`Found ${result.warnings.length} warning(s):`);
        result.warnings.forEach((warn) => logger.warn(`  ⚠ ${warn}`));
      }
    }

    logger.newLine();
  }
}

/**
 * Quick validation helper
 */
export async function validateProjectMode(projectPath: string): Promise<boolean> {
  const validator = new ModeValidator(projectPath);
  const result = await validator.validate();
  await validator.printReport(result);
  return result.valid;
}
