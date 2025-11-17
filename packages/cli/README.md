# nextcraft-cli

Smart Next.js project generator with CLI and templates.

[![npm version](https://img.shields.io/npm/v/nextcraft-cli.svg)](https://www.npmjs.com/package/nextcraft-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npx nextcraft-cli my-app
```

Or install globally:

```bash
npm install -g nextcraft-cli
nextcraft my-app
```

## Features

- Multiple UI frameworks (Shadcn, Chakra, Material-UI)
- Database support (PostgreSQL, MySQL, SQLite)
- Authentication ready
- RTL support
- SEO optimized
- Responsive design

## Usage

```bash
nextcraft [project-name] [options]

Options:
  -m, --mode <mode>        Project mode (frontend|fullstack)
  --ui <framework>         UI framework (shadcn|chakra|material)
  --db <database>          Database (postgres|sqlite|mysql)
  --auth                   Include authentication
  --rtl                    Enable RTL support
  --no-seo                 Disable SEO optimization
  -y, --yes                Use default options
  -V, --version            Show version
  -h, --help               Show help
```

## Examples

### Interactive mode

```bash
npx nextcraft-cli my-app
```

### Fullstack with options

```bash
npx nextcraft-cli my-app --mode fullstack --ui shadcn --db postgres --auth
```

### With RTL support

```bash
npx nextcraft-cli my-app --rtl
```

## Requirements

- Node.js >= 18.0.0
- npm, pnpm, or yarn

## License

MIT

## Links

- [npm](https://www.npmjs.com/package/nextcraft-cli)
- [GitHub](https://github.com/ziadmustafa1/NextCraft)
- [Issues](https://github.com/ziadmustafa1/NextCraft/issues)
