import { execSync } from 'child_process';
import { SUPPORTED_PACKAGE_MANAGERS } from '../constants';

export type PackageManager = (typeof SUPPORTED_PACKAGE_MANAGERS)[number];

export function detectPackageManager(): PackageManager {
  // Check from user agent (when running via npx, pnpm dlx, etc.)
  const userAgent = process.env.npm_config_user_agent;
  
  if (userAgent) {
    if (userAgent.includes('pnpm')) return 'pnpm';
    if (userAgent.includes('yarn')) return 'yarn';
    if (userAgent.includes('bun')) return 'bun';
    if (userAgent.includes('npm')) return 'npm';
  }

  // Check which is available in the system
  try {
    execSync('pnpm --version', { stdio: 'ignore' });
    return 'pnpm';
  } catch {
    // pnpm not available
  }

  try {
    execSync('yarn --version', { stdio: 'ignore' });
    return 'yarn';
  } catch {
    // yarn not available
  }

  try {
    execSync('bun --version', { stdio: 'ignore' });
    return 'bun';
  } catch {
    // bun not available
  }

  return 'npm'; // fallback to npm
}

export function getInstallCommand(packageManager: PackageManager): string {
  const commands = {
    npm: 'npm install',
    pnpm: 'pnpm install',
    yarn: 'yarn',
    bun: 'bun install',
  };

  return commands[packageManager];
}

export function getDevCommand(packageManager: PackageManager): string {
  const commands = {
    npm: 'npm run dev',
    pnpm: 'pnpm dev',
    yarn: 'yarn dev',
    bun: 'bun dev',
  };

  return commands[packageManager];
}

export function getAddCommand(packageManager: PackageManager, packages: string[]): string {
  const pkgs = packages.join(' ');
  
  const commands = {
    npm: `npm install ${pkgs}`,
    pnpm: `pnpm add ${pkgs}`,
    yarn: `yarn add ${pkgs}`,
    bun: `bun add ${pkgs}`,
  };

  return commands[packageManager];
}
