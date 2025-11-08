# Deployment

Deploy your NextCraft project to production.

## Vercel (Recommended)

NextCraft projects are optimized for Vercel deployment.

### 1. Install Vercel CLI

```bash
pnpm add -g vercel
```

### 2. Deploy

```bash
vercel
```

Follow the prompts to link your project.

### Environment Variables

Set up environment variables in Vercel dashboard:

- `DATABASE_URL` - Your database connection string
- `NEXTAUTH_URL` - Your production URL
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`

### Automatic Deployments

Connect your GitHub repository for automatic deployments on push.

## Netlify

### 1. Build Settings

- **Build command:** `pnpm build`
- **Publish directory:** `.next`
- **Functions directory:** `.netlify/functions`

### 2. Environment Variables

Add the same variables as Vercel.

### 3. Deploy

```bash
pnpm add -g netlify-cli
netlify deploy --prod
```

## Docker

### Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable pnpm && pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
docker build -t nextcraft-app .
docker run -p 3000:3000 nextcraft-app
```

## Railway

### 1. Connect Repository

Link your GitHub repository in Railway dashboard.

### 2. Configure

Railway auto-detects Next.js projects.

### 3. Environment Variables

Add your environment variables in Railway dashboard.

### 4. Deploy

Push to your main branch to trigger deployment.

## Self-Hosted (Ubuntu/Debian)

### 1. Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install PM2

```bash
sudo npm install -g pm2
```

### 3. Build Project

```bash
pnpm install
pnpm build
```

### 4. Start with PM2

```bash
pm2 start npm --name "nextcraft-app" -- start
pm2 save
pm2 startup
```

### 5. Configure Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Database Setup

### PostgreSQL on Render

1. Create PostgreSQL database on Render
2. Copy connection string
3. Add to environment variables:
   ```
   DATABASE_URL="postgresql://..."
   ```

### PostgreSQL on Railway

Railway provides one-click PostgreSQL setup.

### Supabase

Free PostgreSQL hosting:

1. Create project on Supabase
2. Get connection string from project settings
3. Add to environment:
   ```
   DATABASE_URL="postgresql://..."
   ```

## Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] `NEXTAUTH_SECRET` generated and set
- [ ] Build tested locally (`pnpm build`)
- [ ] `robots.txt` configured
- [ ] Sitemap generated
- [ ] Analytics set up (optional)
- [ ] Error monitoring configured (Sentry, etc.)

## Post-Deployment

### Run Migrations

```bash
# On Vercel/Netlify, use build command:
pnpm prisma migrate deploy && pnpm build

# Or manually:
pnpm prisma migrate deploy
```

### Monitor Performance

Use Vercel Analytics or add:
- Google Analytics
- Vercel Speed Insights
- Sentry for error tracking

## Troubleshooting

### Build Fails

Check:
- All dependencies installed
- Environment variables set
- TypeScript errors resolved
- Build command correct

### Database Connection Issues

Verify:
- `DATABASE_URL` format correct
- Database is accessible from deployment platform
- Prisma schema matches database

### Authentication Not Working

Ensure:
- `NEXTAUTH_URL` matches production URL
- `NEXTAUTH_SECRET` is set and unique
- Cookies are allowed (not blocked by browser)

## Scaling

### Serverless (Vercel/Netlify)

Automatically scales with traffic.

### Containerized (Docker)

Use orchestration:
- Kubernetes
- Docker Swarm
- AWS ECS

### Database

For high traffic:
- Use connection pooling (PgBouncer)
- Add read replicas
- Use CDN for static assets
