import { prompt } from 'enquirer';
import { ProjectOptions, ProjectMode, UIFramework, DatabaseType } from './types';

export async function promptForProjectOptions(
  projectName: string
): Promise<ProjectOptions> {
  const answers = await prompt<{
    mode: ProjectMode;
    ui: UIFramework;
    database?: DatabaseType;
    auth: boolean;
    rtl: boolean;
    seo: boolean;
    modules: string[];
  }>([
    {
      type: 'select',
      name: 'mode',
      message: 'Select project mode:',
      choices: [
        { name: 'frontend', message: '🎨 Frontend (Next.js + UI + API calls)' },
        { name: 'fullstack', message: '🚀 Fullstack (Frontend + Backend + Database)' },
      ],
    },
    {
      type: 'select',
      name: 'ui',
      message: 'Select UI framework:',
      choices: [
        { name: 'shadcn', message: 'Shadcn UI (Recommended)' },
        { name: 'chakra', message: 'Chakra UI' },
        { name: 'material', message: 'Material UI' },
      ],
    },
    {
      type: 'select',
      name: 'database',
      message: 'Select database:',
      skip() {
        return (this as any).state.answers.mode === 'frontend';
      },
      choices: [
        { name: 'postgres', message: 'PostgreSQL (Recommended)' },
        { name: 'sqlite', message: 'SQLite' },
        { name: 'mysql', message: 'MySQL' },
      ],
    },
    {
      type: 'confirm',
      name: 'auth',
      message: 'Add authentication (Auth.js)?',
      initial: false,
    },
    {
      type: 'confirm',
      name: 'rtl',
      message: 'Enable RTL (Right-to-Left) support?',
      initial: false,
    },
    {
      type: 'confirm',
      name: 'seo',
      message: 'Enable SEO optimization?',
      initial: true,
    },
  ]);

  return {
    name: projectName,
    mode: answers.mode,
    ui: answers.ui,
    database: answers.database,
    auth: answers.auth,
    rtl: answers.rtl,
    seo: answers.seo,
  };
}

export async function confirmOverwrite(projectPath: string): Promise<boolean> {
  const { confirm } = await prompt<{ confirm: boolean }>({
    type: 'confirm',
    name: 'confirm',
    message: `Directory ${projectPath} is not empty. Overwrite?`,
    initial: false,
  });

  return confirm;
}
