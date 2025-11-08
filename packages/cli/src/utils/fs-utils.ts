import fs from 'fs-extra';
import path from 'path';

export async function ensureDir(dirPath: string): Promise<void> {
  await fs.ensureDir(dirPath);
}

export async function copyTemplate(
  templatePath: string,
  targetPath: string
): Promise<void> {
  await fs.copy(templatePath, targetPath, {
    overwrite: false,
    errorOnExist: false,
  });
}

export async function writeFile(
  filePath: string,
  content: string
): Promise<void> {
  await fs.outputFile(filePath, content, 'utf-8');
}

export async function readFile(filePath: string): Promise<string> {
  return await fs.readFile(filePath, 'utf-8');
}

export async function fileExists(filePath: string): Promise<boolean> {
  return await fs.pathExists(filePath);
}

export async function removeFile(filePath: string): Promise<void> {
  await fs.remove(filePath);
}

export function getTemplatesPath(): string {
  return path.resolve(__dirname, '../../templates');
}

export function getModulesPath(): string {
  return path.resolve(__dirname, '../../modules');
}

export async function isDirectoryEmpty(dirPath: string): Promise<boolean> {
  try {
    const files = await fs.readdir(dirPath);
    return files.length === 0;
  } catch {
    return true; // Directory doesn't exist, consider it empty
  }
}

export function validateProjectName(name: string): boolean {
  return /^[a-z0-9-]+$/.test(name);
}

export async function replaceInFile(
  filePath: string,
  replacements: Record<string, string>
): Promise<void> {
  let content = await readFile(filePath);
  
  Object.entries(replacements).forEach(([key, value]) => {
    const regex = new RegExp(key, 'g');
    content = content.replace(regex, value);
  });
  
  await writeFile(filePath, content);
}
