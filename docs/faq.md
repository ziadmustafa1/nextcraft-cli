# Frequently Asked Questions

## General

### What is NextCraft?

NextCraft is a smart Next.js project generator that helps you create production-ready applications in minutes. It handles all the setup and configuration automatically.

### Is NextCraft free?

Yes! NextCraft is 100% open source under the MIT license.

### What Next.js version does it use?

NextCraft uses Next.js 15 with the App Router.

### Can I use it for production?

Absolutely! NextCraft generates production-ready code with best practices.

## Technical

### What's included in a Frontend project?

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- UI framework (Shadcn/Chakra/Material)
- SWR for data fetching
- Axios for API calls
- SEO optimization
- RTL support (optional)

### What's included in a Fullstack project?

Everything in Frontend, plus:
- Prisma ORM
- Database support (PostgreSQL/SQLite/MySQL)
- Auth.js authentication
- API routes
- Server-side rendering

### Can I switch between modes later?

Yes, but it requires manual migration. Best to choose the right mode initially.

### What databases are supported?

- PostgreSQL (recommended for production)
- SQLite (great for development)
- MySQL

### Does it support MongoDB?

Not yet, but it's planned for future releases.

## Development

### Do I need to know TypeScript?

TypeScript is recommended but not required. You can use JavaScript if you prefer.

### Can I customize generated code?

Yes! All code is yours to modify. NextCraft doesn't lock you in.

### How do I add custom dependencies?

Use your package manager normally:

```bash
pnpm add <package>
```

### Can I use it with an existing project?

Currently, NextCraft creates new projects. Integration with existing projects is planned.

## Modules

### How do modules work?

Modules are pre-built features you add with:

```bash
forge add <module-name>
```

### Can I remove modules?

Yes:

```bash
forge remove <module-name>
```

### Can I create custom modules?

Custom module creation is planned for a future release.

### Are modules required?

No, modules are optional. Use them if they fit your needs.

## Deployment

### Where can I deploy?

Anywhere you can deploy Next.js:
- Vercel (recommended)
- Netlify
- Railway
- Docker
- Self-hosted

### Do I need a database server?

Only for fullstack mode. Frontend mode doesn't require a database.

### How do I set environment variables?

Create a `.env.local` file:

```bash
DATABASE_URL="..."
NEXTAUTH_SECRET="..."
```

### Can I use a different hosting provider?

Yes! NextCraft projects are standard Next.js apps.

## Troubleshooting

### Installation fails

Try:

```bash
pnpm cache clean
pnpm install
```

### Build errors

Run:

```bash
forge doctor
```

This checks your project health and diagnoses issues.

### Database connection fails

Verify:
1. Database is running
2. `DATABASE_URL` is correct
3. Database is accessible

### Authentication not working

Check:
1. `NEXTAUTH_SECRET` is set
2. `NEXTAUTH_URL` matches your URL
3. Database is connected (for fullstack)

## Best Practices

### Should I use Frontend or Fullstack?

- **Frontend**: If you have a separate backend API
- **Fullstack**: If you want an all-in-one solution

### Which UI framework should I choose?

- **Shadcn**: Most flexible, modern (recommended)
- **Chakra**: Best for accessibility
- **Material**: Google's design system

### PostgreSQL or SQLite?

- **Development**: SQLite (easier setup)
- **Production**: PostgreSQL (more robust)

### Should I enable authentication from start?

Enable it from the start if you know you'll need it. Adding it later requires more work.

## Support

### Where can I get help?

- **Documentation**: [docs/](./README.md)
- **GitHub Issues**: Report bugs and request features
- **Discord**: Join our community (coming soon)

### How do I report a bug?

Open an issue on GitHub with:
- Description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, Node version, etc.)

### Can I contribute?

Yes! See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

### Is there a roadmap?

Check [CHANGELOG.md](../CHANGELOG.md) for planned features.

## Comparison

### NextCraft vs Create Next App?

NextCraft includes:
- ✅ Complete setup (UI, database, auth)
- ✅ Module system
- ✅ Production-ready configuration
- ✅ Best practices built-in

CNA provides:
- Basic Next.js setup
- You configure everything manually

### NextCraft vs T3 Stack?

Similar philosophy, different approach:
- NextCraft: More opinionated, more features
- T3: Minimal, community-driven

Both are great choices!

### NextCraft vs Blitz.js?

- NextCraft: Built on top of Next.js
- Blitz: Full framework (different paradigm)

Choose based on your preference.

## License

### Can I use NextCraft commercially?

Yes! MIT license allows commercial use.

### Do I need to credit NextCraft?

Not required, but appreciated!

### Can I modify the source code?

Yes, do whatever you want with it!
