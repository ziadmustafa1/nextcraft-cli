import path from 'path';
import { BaseGenerator } from './base-generator';
import { ensureDir, writeFile } from '../utils/fs-utils';

export class FrontendGenerator extends BaseGenerator {
  protected async createProjectStructure(): Promise<void> {
    const dirs = [
      'src/app',
      'src/components',
      'src/lib',
      'src/hooks',
      'src/config',
      'src/types',
      'public',
    ];

    for (const dir of dirs) {
      await ensureDir(path.join(this.projectPath, dir));
    }
  }

  protected async setupBaseDependencies(): Promise<void> {
    const dependencies = {
      // Next.js 16 + React 19 (Senior Stack 2025)
      next: '^16.0.1',
      react: '^19.2.0',
      'react-dom': '^19.2.0',
      
      // Data fetching & State Management
      '@tanstack/react-query': '^5.60.0', // Industry standard
      axios: '^1.7.9',
      'zustand': '^5.0.3', // Lightweight state management
      
      // Form Handling (Senior Standard)
      'react-hook-form': '^7.54.0',
      '@hookform/resolvers': '^3.10.0',
      
      // Validation (Required for all inputs)
      zod: '^3.24.1',
      
      // UI Framework (2025 Standard)
      'class-variance-authority': '^0.7.1',
      clsx: '^2.1.1',
      'tailwind-merge': '^2.6.0',
      'tailwind-variants': '^0.3.0',
      'lucide-react': '^0.460.0',
      
      // Animation (Senior UX)
      'framer-motion': '^11.15.0',
      
      // Next.js 16 specific
      'server-only': '^0.0.1',
      'client-only': '^0.0.1',
    };

    const devDependencies = {
      // TypeScript (Strict Mode)
      '@types/node': '^22.10.0',
      '@types/react': '^19.0.6',
      '@types/react-dom': '^19.0.3',
      typescript: '^5.7.0',
      
      // Styling (TailwindCSS 4)
      tailwindcss: '^4.1.0',
      '@tailwindcss/postcss': '^4.1.0',
      'tailwindcss-animate': '^1.0.7',
      autoprefixer: '^10.4.20',
      postcss: '^8.4.49',
      
      // Linting & Formatting (Senior Standards)
      eslint: '^9.16.0',
      'eslint-config-next': '^16.0.1',
      '@typescript-eslint/eslint-plugin': '^8.18.0',
      '@typescript-eslint/parser': '^8.18.0',
      prettier: '^3.4.2',
      'prettier-plugin-tailwindcss': '^0.6.11',
      
      // Git Hooks (Code Quality)
      husky: '^9.1.7',
      'lint-staged': '^15.2.11',
      
      // Testing (Senior Must-Have)
      '@testing-library/react': '^16.1.0',
      '@testing-library/jest-dom': '^6.6.3',
      vitest: '^2.1.8',
      '@vitejs/plugin-react': '^4.3.4',
    };

    // Update package.json
    const packageJsonPath = path.join(this.projectPath, 'package.json');
    const packageJson = require(packageJsonPath);
    packageJson.dependencies = dependencies;
    packageJson.devDependencies = devDependencies;

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  protected async customSetup(): Promise<void> {
    await this.createAppLayout();
    await this.createHomePage();
    await this.setupAPIClient();
    await this.setupHooks();
  }

  private async createAppLayout(): Promise<void> {
    const layout = `import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
${this.options.seo ? "import { siteConfig } from '@/config/site'\n" : ''}
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: '${this.options.name}',
    template: \`%s | ${this.options.name}\`,
  },
  description: 'Built with NextCraft',${
    this.options.seo
      ? `
  keywords: ['Next.js', 'React', 'TypeScript'],
  authors: [{ name: '${this.options.name}' }],
  creator: '${this.options.name}',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: '@${this.options.name}',
  },`
      : ''
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"${this.options.rtl ? ' dir="rtl"' : ''}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
`;

    await writeFile(path.join(this.projectPath, 'src', 'app', 'layout.tsx'), layout);
  }

  private async createHomePage(): Promise<void> {
    const page = `export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to ${this.options.name} 🚀
        </h1>
      </div>
      
      <div className="mt-8 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with quizzes!
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Explore starter templates for Next.js.
          </p>
        </div>

        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500">
          Built with NextCraft 💎
        </p>
      </div>
    </main>
  )
}
`;

    await writeFile(path.join(this.projectPath, 'src', 'app', 'page.tsx'), page);
  }

  private async setupAPIClient(): Promise<void> {
    const apiClient = `import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

class APIClient {
  private client: AxiosInstance

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if exists
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (token) {
          config.headers.Authorization = \`Bearer \${token}\`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token')
            window.location.href = '/login'
          }
        }
        return Promise.reject(error)
      }
    )
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config)
    return response.data
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config)
    return response.data
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config)
    return response.data
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config)
    return response.data
  }
}

export const api = new APIClient()
`;

    await writeFile(path.join(this.projectPath, 'src', 'lib', 'api-client.ts'), apiClient);
  }

  private async setupHooks(): Promise<void> {
    const useFetch = `/**
 * Custom fetch hook using TanStack Query (Senior Stack 2025)
 * Industry-standard data fetching & caching
 */
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { api } from '@/lib/api-client'

export function useFetch<T = unknown>(
  url: string,
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T, Error>({
    queryKey: [url],
    queryFn: () => api.get<T>(url),
    ...options,
  })
}
`;

    await writeFile(path.join(this.projectPath, 'src', 'hooks', 'use-fetch.ts'), useFetch);
  }
}
