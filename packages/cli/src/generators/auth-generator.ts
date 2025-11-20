import path from 'path';
import { logger } from '../utils/logger';
import { execa } from 'execa';
import { readFile, writeFile, ensureDir } from '../utils/fs-utils';
import { authConfig, authRoute, prismaAuthModels } from '../templates/auth';

export class AuthGenerator {
    private projectPath: string;

    constructor(projectPath: string) {
        this.projectPath = projectPath;
    }

    async generate(): Promise<void> {
        logger.info('🔐 Adding Authentication...');

        await this.installDependencies();
        await this.createAuthFiles();
        await this.updatePrismaSchema();
        await this.generatePrismaClient();

        logger.success('✅ Authentication added successfully!');
        logger.info('Next steps:');
        logger.info('1. Add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET to your .env');
        logger.info('2. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to your .env');
        logger.info('3. Add NEXTAUTH_SECRET to your .env');
    }

    private async installDependencies(): Promise<void> {
        logger.startSpinner('Installing dependencies...');
        try {
            await execa('pnpm', ['add', 'next-auth', '@auth/prisma-adapter', '@prisma/client'], {
                cwd: this.projectPath,
            });
            await execa('pnpm', ['add', '-D', 'prisma'], {
                cwd: this.projectPath,
            });
            logger.succeedSpinner('Dependencies installed');
        } catch (error) {
            logger.error('Failed to install dependencies');
            throw error;
        }
    }

    private async createAuthFiles(): Promise<void> {
        logger.startSpinner('Creating auth files...');

        // src/lib/auth.ts
        const libDir = path.join(this.projectPath, 'src', 'lib');
        await ensureDir(libDir);
        await writeFile(path.join(libDir, 'auth.ts'), authConfig);

        // src/app/api/auth/[...nextauth]/route.ts
        const apiDir = path.join(this.projectPath, 'src', 'app', 'api', 'auth', '[...nextauth]');
        await ensureDir(apiDir);
        await writeFile(path.join(apiDir, 'route.ts'), authRoute);

        logger.succeedSpinner('Auth files created');
    }

    private async updatePrismaSchema(): Promise<void> {
        logger.startSpinner('Updating Prisma schema...');

        const schemaPath = path.join(this.projectPath, 'prisma', 'schema.prisma');

        try {
            // Check if schema exists, if not create basic one
            let schemaContent = '';
            try {
                schemaContent = await readFile(schemaPath);
            } catch {
                // Create prisma directory if it doesn't exist
                await ensureDir(path.join(this.projectPath, 'prisma'));
                schemaContent = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
`;
            }

            if (!schemaContent.includes('model User')) {
                schemaContent += prismaAuthModels;
                await writeFile(schemaPath, schemaContent);
            }

            logger.succeedSpinner('Prisma schema updated');
        } catch (error) {
            logger.error('Failed to update Prisma schema');
            throw error;
        }
    }

    private async generatePrismaClient(): Promise<void> {
        logger.startSpinner('Generating Prisma Client...');
        try {
            await execa('npx', ['prisma', 'generate'], {
                cwd: this.projectPath,
            });
            logger.succeedSpinner('Prisma Client generated');
        } catch (error) {
            logger.warn('Failed to generate Prisma Client. You may need to run "npx prisma generate" manually.');
        }
    }
}
