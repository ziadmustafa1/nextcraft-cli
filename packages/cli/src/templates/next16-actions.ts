/**
 * Next.js 16 Server Actions Templates
 */

export const serverActionsTemplate = `'use server'

import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

/**
 * Generic form action with error handling
 */
export async function submitForm(
  _prevState: { message: string } | null,
  formData: FormData
) {
  try {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    }

    // Validate
    if (!data.name || !data.email) {
      return { message: 'All fields are required' }
    }

    // Process (e.g., save to database)
    // await db.create({ data })

    // Revalidate the page
    revalidatePath('/')

    return { message: 'Success!' }
  } catch (_error) {
    return { message: 'Failed to submit form' }
  }
}

/**
 * Delete action with redirect
 */
export async function deleteItem(_id: string) {
  try {
    // await db.delete({ where: { id: _id } })

    revalidatePath('/items')
    redirect('/items')
  } catch (_error) {
    throw new Error('Failed to delete item')
  }
}

/**
 * Update action with tag revalidation
 */
export async function updateItem(id: string, _data: unknown) {
  try {
    // await db.update({ where: { id }, data: _data })

    // Revalidate specific tags
    revalidateTag(\`item-\${id}\`, 'fetch')
    revalidateTag('items', 'fetch')

    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: message }
  }
}
`;

export const asyncLayoutTemplate = `import { cookies, headers } from 'next/headers'
import type { Metadata } from 'next'

/**
 * Next.js 16 Async Root Layout
 * Demonstrates async cookies and headers
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Async cookies in Next.js 16
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value || 'light'

  // Async headers
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''

  return (
    <html lang="en" data-theme={theme}>
      <body>
        {/* Optional: Debug info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-0 right-0 p-2 text-xs bg-black text-white">
            Theme: {theme}
          </div>
        )}
        {children}
      </body>
    </html>
  )
}
`;

export const asyncPageTemplate = `import { Suspense } from 'react'

/**
 * Next.js 16 Async Page Component
 * Demonstrates async params and searchParams
 */
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  // Await params
  const { slug } = await params
  
  // Await searchParams
  const { q, page = '1' } = await searchParams

  return (
    <div>
      <h1>Page: {slug}</h1>
      {q && <p>Search: {q}</p>}
      <p>Page: {page}</p>

      <Suspense fallback={<div>Loading...</div>}>
        <DynamicContent slug={slug} />
      </Suspense>
    </div>
  )
}

async function DynamicContent({ slug }: { slug: string }) {
  // This can be async and fetch data
  const data = await fetchData(slug)
  
  return <div>{data}</div>
}

async function fetchData(slug: string) {
  // Fetch logic
  return \`Data for \${slug}\`
}
`;

export const cacheUtilitiesTemplate = `'use cache'

import { 
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag 
} from 'next/cache'

/**
 * Cache utility with tags and lifecycle
 */
export async function getCachedData(id: string) {
  // Define cache lifecycle
  cacheLife('hours')
  
  // Add cache tags for invalidation
  cacheTag('data', \`data-\${id}\`)

  // Fetch data
  const data = await fetch(\`https://api.example.com/data/\${id}\`)
  return data.json()
}

/**
 * Custom cache wrapper
 */
export function withCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  tags: string[],
  life: 'minutes' | 'hours' | 'days' = 'hours'
): T {
  return (async (...args: Parameters<T>) => {
    'use cache'
    
    cacheLife(life)
    tags.forEach(tag => cacheTag(tag))
    
    return await fn(...args)
  }) as T
}

// Usage example:
export const getUser = withCache(
  async (id: string) => {
    const res = await fetch(\`https://api.example.com/users/\${id}\`)
    return res.json()
  },
  ['users'],
  'hours'
)
`;

export const useOptimisticTemplate = `'use client'

import { useOptimistic, useTransition } from 'react'

// Mock add item action for demo purposes
async function addItem(name: string): Promise<{ id: string; name: string }> {
  'use server'
  
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    id: Math.random().toString(36).slice(2),
    name,
  }
}

/**
 * Optimistic UI with Next.js 16
 */
export function OptimisticList({ items }: { items: string[] }) {
  const [isPending, startTransition] = useTransition()
  const [optimisticItems, addOptimisticItem] = useOptimistic(
    items,
    (state, newItem: string) => [...state, newItem]
  )

  async function handleSubmit(formData: FormData) {
    const newItem = formData.get('item') as string
    
    // Add optimistically
    addOptimisticItem(newItem)
    
    // Then add to server
    startTransition(async () => {
      await addItem(newItem)
    })
  }

  return (
    <div>
      <ul>
        {optimisticItems.map((item, i) => (
          <li key={i} className={isPending ? 'opacity-50' : ''}>
            {item}
          </li>
        ))}
      </ul>

      <form action={handleSubmit}>
        <input name="item" required />
        <button disabled={isPending}>
          {isPending ? 'Adding...' : 'Add Item'}
        </button>
      </form>
    </div>
  )
}
`;

export const useActionStateTemplate = `'use client'

import { useActionState } from 'react'

// Mock login action for demo purposes
async function loginUser(
  _prevState: { error: string | null; success: boolean },
  formData: FormData
): Promise<{ error: string | null; success: boolean }> {
  'use server'
  
  const email = formData.get('email')
  const password = formData.get('password')
  
  // Simulate validation
  if (!email || !password) {
    return { error: 'All fields are required', success: false }
  }
  
  // Simulate async login
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return { error: null, success: true }
}

/**
 * Form with useActionState hook (React 19 + Next.js 16)
 */
export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginUser,
    { error: null, success: false }
  )

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={isPending}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          disabled={isPending}
        />
      </div>

      {state.error && (
        <div className="text-red-500">{state.error}</div>
      )}

      {state.success && (
        <div className="text-green-500">Login successful!</div>
      )}

      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
`;

export const serverOnlyTemplate = `import 'server-only'

/**
 * Server-only utilities
 * This code will throw error if imported in client components
 */

export async function getSecretData() {
  const secret = process.env.SECRET_API_KEY
  
  const response = await fetch(\`https://api.example.com/secret\`, {
    headers: {
      Authorization: \`Bearer \${secret}\`
    }
  })
  
  return response.json()
}

export async function validateToken(token: string) {
  // Server-only validation logic
  return token === process.env.SECRET_TOKEN
}
`;

export const clientOnlyTemplate = `import 'client-only'

/**
 * Client-only utilities
 * This code will throw error if imported in server components
 */

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    // Analytics tracking
    window.gtag('event', name, properties)
  }
}

export function getLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key)
  }
  return null
}

export function playSound(src: string) {
  if (typeof window !== 'undefined') {
    const audio = new Audio(src)
    audio.play()
  }
}
`;
