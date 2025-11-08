# 🚀 Next.js 16 Features في NextCraft

## نظرة عامة

NextCraft يستخدم **Next.js 16** (أحدث إصدار) مع **React 19** لتوفير أحدث المميزات والأداء الأفضل.

---

## 🎯 المميزات الأساسية

### 1. **Turbopack (Stable)** ⚡

**ما هو؟** محرك بناء جديد أسرع 10× من Webpack

**كيف يستخدمه NextCraft:**
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build"
  }
}
```

**المميزات:**
- ✅ Hot Reload فوري
- ✅ بناء أسرع
- ✅ استهلاك أقل للذاكرة

---

### 2. **React 19 Support** ⚛️

**المميزات الجديدة:**

#### **Server Actions (محسّنة)**
```typescript
// src/app/actions.ts
'use server'

export async function createUser(formData: FormData) {
  const name = formData.get('name')
  
  // حفظ في قاعدة البيانات
  await db.user.create({ data: { name } })
  
  // إعادة التحقق تلقائياً
  revalidatePath('/users')
}

// src/app/page.tsx
import { createUser } from './actions'

export default function Page() {
  return (
    <form action={createUser}>
      <input name="name" required />
      <button type="submit">Create</button>
    </form>
  )
}
```

#### **useOptimistic Hook**
```typescript
'use client'

import { useOptimistic } from 'react'

export function TodoList({ todos }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  )
  
  return (
    <form action={async (formData) => {
      const todo = formData.get('todo')
      addOptimistic({ id: Date.now(), text: todo })
      await createTodo(todo)
    }}>
      {optimisticTodos.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
      <input name="todo" />
      <button>Add</button>
    </form>
  )
}
```

#### **useActionState Hook**
```typescript
'use client'

import { useActionState } from 'react'

export function LoginForm() {
  const [state, action, pending] = useActionState(loginUser, {
    error: null,
    success: false
  })
  
  return (
    <form action={action}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button disabled={pending}>
        {pending ? 'Logging in...' : 'Login'}
      </button>
      {state.error && <p>{state.error}</p>}
    </form>
  )
}
```

---

### 3. **Async Request APIs** 🔄

**الآن `params`, `searchParams`, `cookies`, `headers` كلها async!**

#### **قبل (Next.js 15):**
```typescript
export default function Page({ params, searchParams }) {
  const id = params.id
  const query = searchParams.q
}
```

#### **بعد (Next.js 16):**
```typescript
export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ q: string }>
}) {
  const { id } = await params
  const { q } = await searchParams
  
  return <div>Post {id}, Search: {q}</div>
}
```

#### **Cookies & Headers:**
```typescript
import { cookies, headers } from 'next/headers'

export default async function Page() {
  // Async cookies
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  
  // Async headers
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
  
  return <div>Token: {token?.value}</div>
}
```

---

### 4. **Enhanced Caching** 💾

#### **New cacheLife API:**
```typescript
'use cache'

import { unstable_cacheLife as cacheLife } from 'next/cache'

export async function getUser(id: string) {
  cacheLife('minutes')
  
  const user = await db.user.findUnique({ where: { id } })
  return user
}

// أو custom:
export async function getProducts() {
  cacheLife({
    stale: 60, // 1 minute
    revalidate: 300, // 5 minutes
    expire: 3600 // 1 hour
  })
  
  return await db.product.findMany()
}
```

#### **cacheTag for Invalidation:**
```typescript
'use cache'

import { unstable_cacheTag as cacheTag } from 'next/cache'

export async function getPost(id: string) {
  cacheTag('posts', `post-${id}`)
  
  return await db.post.findUnique({ where: { id } })
}

// Invalidate من Server Action:
'use server'

import { revalidateTag } from 'next/cache'

export async function updatePost(id: string, data: any) {
  await db.post.update({ where: { id }, data })
  
  revalidateTag(`post-${id}`)
  revalidateTag('posts')
}
```

---

### 5. **Partial Prerendering (PPR)** 🎨

**ما هو؟** يجمع بين Static و Dynamic في نفس الصفحة

#### **Configuration:**
```typescript
// next.config.ts
export default {
  experimental: {
    ppr: true // Enable PPR
  }
}

// app/page.tsx
export const experimental_ppr = true

export default async function Page() {
  return (
    <div>
      {/* Static part - pre-rendered */}
      <Header />
      
      {/* Dynamic part - streamed */}
      <Suspense fallback={<Skeleton />}>
        <UserProfile />
      </Suspense>
      
      {/* Static part */}
      <Footer />
    </div>
  )
}
```

---

### 6. **Server-only & Client-only** 🔒

**منع أخطاء Client/Server Mix:**

#### **Server-only Code:**
```typescript
// lib/db.ts
import 'server-only'

export async function getSecretData() {
  // هذا الكود لن يعمل في Client!
  const secret = process.env.SECRET_KEY
  return await fetch(`api.example.com/${secret}`)
}
```

#### **Client-only Code:**
```typescript
// lib/analytics.ts
import 'client-only'

export function trackEvent(name: string) {
  // هذا الكود لن يعمل في Server!
  window.gtag('event', name)
}
```

---

### 7. **Improved TypeScript** 📘

#### **Better Type Inference:**
```typescript
// Async params are now properly typed
export default async function Page({
  params
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  // slug is string[], fully typed!
}
```

#### **Server Component Types:**
```typescript
import { ReactNode } from 'react'

// Automatic RSC typing
export default function Layout({ children }: { children: ReactNode }) {
  // This is a Server Component by default
  return <div>{children}</div>
}
```

---

### 8. **Turbopack Dev Features** ⚡

#### **Fast Refresh++:**
- تحديث فوري بدون إعادة تحميل الصفحة
- الحفاظ على state
- Hot Module Replacement محسّن

#### **Better Error Messages:**
```
✖ Error in src/app/page.tsx (12:15)

  'user' is not defined

  Suggestion: Did you mean 'users'?
  
  10 | export default function Page() {
  11 |   const data = await getUsers()
> 12 |   return <div>{user.name}</div>
     |                 ^^^^
  13 | }
```

---

## 🎨 NextCraft-Specific Configuration

### **Smart next.config.ts**

NextCraft يولد configuration ذكي حسب احتياجاتك:

```typescript
// Generated by NextCraft
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Turbopack enabled by default in dev
  reactStrictMode: true,
  
  // Next.js 16 features
  experimental: {
    // Partial Prerendering
    ppr: true,
    
    // React Compiler (if enabled)
    reactCompiler: true,
    
    // Server Actions (stable in 16)
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000']
    }
  },
  
  // Automatic static optimization
  output: 'standalone', // For Docker
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com'
      }
    ]
  },
  
  // Headers & Security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains'
          }
        ]
      }
    ]
  },
  
  // Redirects
  async redirects() {
    return []
  },
  
  // Webpack config (if needed)
  webpack: (config) => {
    return config
  }
}

export default nextConfig
```

---

## 📦 NextCraft يولد تلقائياً:

### **1. Server Actions Template**
```typescript
// src/app/actions/users.ts
'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  
  try {
    await db.user.create({
      data: { name, email }
    })
    
    revalidatePath('/users')
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
```

### **2. Async Layout Pattern**
```typescript
// src/app/layout.tsx
import { cookies } from 'next/headers'

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const theme = cookieStore.get('theme')?.value || 'light'
  
  return (
    <html lang="en" data-theme={theme}>
      <body>{children}</body>
    </html>
  )
}
```

### **3. Caching Utilities**
```typescript
// src/lib/cache.ts
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from 'next/cache'

export function withCache(tags: string[], life: 'minutes' | 'hours' | 'days' = 'hours') {
  return function <T extends (...args: any[]) => Promise<any>>(fn: T): T {
    return (async (...args) => {
      'use cache'
      cacheLife(life)
      tags.forEach(tag => cacheTag(tag))
      
      return await fn(...args)
    }) as T
  }
}

// Usage:
export const getUser = withCache(['users'], 'minutes')(async (id: string) => {
  return await db.user.findUnique({ where: { id } })
})
```

---

## 🎯 خلاصة المميزات

| Feature | Next.js 15 | Next.js 16 | NextCraft |
|---------|-----------|-----------|-----------|
| Turbopack | Beta | ✅ Stable | ✅ Default |
| React 19 | ❌ | ✅ | ✅ |
| Async APIs | ❌ | ✅ | ✅ Auto-handled |
| PPR | Experimental | ✅ Stable | ✅ Configured |
| cacheLife | ❌ | ✅ | ✅ Utilities |
| Server Actions | Stable | ✅ Enhanced | ✅ Templates |
| server-only | Manual | ✅ Built-in | ✅ Auto-added |

---

## 🚀 الخطوات التالية

1. ✅ **تم**: ترقية Dependencies
2. ⏳ **قادم**: Server Actions Templates
3. ⏳ **قادم**: Caching Utilities
4. ⏳ **قادم**: PPR Examples
5. ⏳ **قادم**: TypeScript Strict Mode

---

**NextCraft = Next.js 16 + أفضل الممارسات + Zero Config**
