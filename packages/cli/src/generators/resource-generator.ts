import path from 'path';
import { logger } from '../utils/logger';
import { writeFile, ensureDir } from '../utils/fs-utils';
import { zodSchemaTemplate, serverActionsTemplate, formComponentTemplate, pageTemplate } from '../templates/resource';

export class ResourceGenerator {
    private projectPath: string;
    private name: string;

    constructor(projectPath: string, name: string) {
        this.projectPath = projectPath;
        this.name = name.toLowerCase();
    }

    async generate(): Promise<void> {
        const pascalName = this.name.charAt(0).toUpperCase() + this.name.slice(1);

        logger.info(`🚀 Generating resource: ${this.name}...`);

        // 1. Validation Schema
        await this.createFile(
            `src/lib/validations/${this.name}.ts`,
            zodSchemaTemplate(this.name)
        );

        // 2. Server Actions
        await this.createFile(
            `src/lib/actions/${this.name}.ts`,
            serverActionsTemplate(this.name, pascalName)
        );

        // 3. Form Component
        await this.createFile(
            `src/components/${this.name}/${this.name}-form.tsx`,
            formComponentTemplate(this.name, pascalName)
        );

        // 4. Page
        await this.createFile(
            `src/app/${this.name}s/page.tsx`,
            pageTemplate(this.name, pascalName)
        );

        logger.success(`✅ Resource ${this.name} generated successfully!`);
        logger.info('⚠️  Don\'t forget to add the model to your schema.prisma:');
        logger.info(`
model ${pascalName} {
  id        String   @id @default(cuid())
  title     String
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
    `);
    }

    private async createFile(filePath: string, content: string): Promise<void> {
        const fullPath = path.join(this.projectPath, filePath);
        await ensureDir(path.dirname(fullPath));
        await writeFile(fullPath, content);
        logger.info(`  Created ${filePath}`);
    }
}
