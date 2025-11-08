# Modules

NextCraft modules are pre-built features you can add to your project.

## Installing Modules

```bash
forge add <module-name>
```

## Available Modules

### 🔐 Auth Module

Authentication system with Auth.js.

```bash
forge add auth
```

**Includes:**
- Credentials authentication
- JWT sessions
- User model (Prisma)
- Login/Register pages
- Protected routes
- Auth API routes

**Files added:**
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/lib/auth/auth-options.ts`
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/register/page.tsx`
- `src/components/auth/login-form.tsx`
- `src/middleware.ts`

### 👤 Users Module

User management system.

```bash
forge add users
```

**Includes:**
- User CRUD operations
- User list/detail pages
- Profile management
- API endpoints

**Files added:**
- `src/app/api/users/route.ts`
- `src/app/api/users/[id]/route.ts`
- `src/app/users/page.tsx`
- `src/app/users/[id]/page.tsx`
- `src/components/users/user-card.tsx`

### 📝 Blog Module

Blogging system with Markdown support.

```bash
forge add blog
```

**Includes:**
- Markdown parser
- Blog post CRUD
- Category/Tags
- SEO optimization
- RSS feed

**Files added:**
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `src/lib/markdown.ts`
- `src/components/blog/post-card.tsx`
- `prisma/schema.prisma` (Post model)

### 🎛️ Admin Module

Admin dashboard.

```bash
forge add admin
```

**Includes:**
- Dashboard layout
- Stats widgets
- User management
- Settings page
- Role-based access

**Files added:**
- `src/app/admin/layout.tsx`
- `src/app/admin/page.tsx`
- `src/app/admin/users/page.tsx`
- `src/app/admin/settings/page.tsx`
- `src/components/admin/sidebar.tsx`

### 📊 Dashboard Module

Analytics dashboard.

```bash
forge add dashboard
```

**Includes:**
- Charts (Chart.js)
- Analytics widgets
- Real-time data
- Export functionality

**Files added:**
- `src/app/dashboard/page.tsx`
- `src/components/dashboard/chart.tsx`
- `src/lib/analytics.ts`

### 💳 Payments Module

Payment integration (Stripe).

```bash
forge add payments
```

**Includes:**
- Stripe integration
- Checkout flow
- Webhook handlers
- Payment history

**Files added:**
- `src/app/api/payments/route.ts`
- `src/app/api/webhooks/stripe/route.ts`
- `src/lib/stripe.ts`
- `src/components/payments/checkout.tsx`

## Module Dependencies

Some modules require others:

- **users** → requires **auth**
- **admin** → requires **auth** + **users**
- **payments** → requires **auth** + **users**

NextCraft will automatically install dependencies.

## Creating Custom Modules

Coming soon! You'll be able to create and share your own modules.

## Module Configuration

Modules can be configured in `nextcraft.config.ts`:

```typescript
export default defineConfig({
  mode: 'fullstack',
  modules: ['auth', 'users', 'blog'],
});
```

Or add them later:

```bash
forge add blog
```

## Removing Modules

```bash
forge remove <module-name>
```

**Note:** This will remove module files. Always commit changes first!

## Module Updates

```bash
forge update <module-name>
```

Updates a module to the latest version.

## Troubleshooting

### Module Not Installing

1. Check you're in a NextCraft project
2. Run `forge doctor` to diagnose
3. Ensure dependencies are installed

### Conflicts

If a module conflicts with existing code:

```bash
forge add <module-name> --force
```

This will overwrite conflicting files (use with caution!).
