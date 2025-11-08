import path from 'path';
import { FrontendGenerator } from './frontend-generator';
import { ensureDir, writeFile } from '../utils/fs-utils';
import { logger } from '../utils/logger';

export class FullstackGenerator extends FrontendGenerator {
  protected async createProjectStructure(): Promise<void> {
    await super.createProjectStructure();

    const additionalDirs = [
      'src/app/api',
      'prisma',
      'src/lib/db',
      'src/lib/auth',
    ];

    for (const dir of additionalDirs) {
      await ensureDir(path.join(this.projectPath, dir));
    }
  }

  protected async setupBaseDependencies(): Promise<void> {
    await super.setupBaseDependencies();

    const packageJsonPath = path.join(this.projectPath, 'package.json');
    const packageJson = require(packageJsonPath);

    // Add fullstack dependencies
    packageJson.dependencies = {
      ...packageJson.dependencies,
      '@prisma/client': '^5.7.0',
      'next-auth': '^4.24.5',
      bcryptjs: '^2.4.3',
      zod: '^3.22.4',
    };

    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      prisma: '^5.7.0',
      '@types/bcryptjs': '^2.4.6',
    };

    packageJson.scripts = {
      ...packageJson.scripts,
      'db:push': 'prisma db push',
      'db:studio': 'prisma studio',
      'db:generate': 'prisma generate',
    };

    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  }

  protected async customSetup(): Promise<void> {
    await super.customSetup();
    
    logger.startSpinner('Setting up Prisma...');
    await this.setupPrisma();
    logger.succeedSpinner('Prisma configured');

    if (this.options.auth) {
      logger.startSpinner('Setting up authentication...');
      await this.setupAuth();
      logger.succeedSpinner('Authentication configured');
    }

    await this.createAPIRoutes();
  }

  private async setupPrisma(): Promise<void> {
    const dbUrl = this.getDatabaseUrl();

    // .env
    const env = `DATABASE_URL="${dbUrl}"
${this.options.auth ? 'NEXTAUTH_URL="http://localhost:3000"\nNEXTAUTH_SECRET="your-secret-key-change-this-in-production"\n' : ''}`;

    await writeFile(path.join(this.projectPath, '.env'), env);

    // prisma/schema.prisma
    const schema = `generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "${this.getDatabaseProvider()}"
  url      = env("DATABASE_URL")
}

${this.options.auth ? this.getAuthModels() : this.getBasicModels()}
`;

    await writeFile(path.join(this.projectPath, 'prisma', 'schema.prisma'), schema);

    // lib/db/prisma.ts
    const prismaClient = `import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
`;

    await writeFile(
      path.join(this.projectPath, 'src', 'lib', 'db', 'prisma.ts'),
      prismaClient
    );
  }

  private getDatabaseProvider(): string {
    const providers = {
      postgres: 'postgresql',
      sqlite: 'sqlite',
      mysql: 'mysql',
    };

    return providers[this.options.database || 'sqlite'];
  }

  private getDatabaseUrl(): string {
    const urls = {
      postgres: 'postgresql://user:password@localhost:5432/mydb',
      sqlite: 'file:./dev.db',
      mysql: 'mysql://user:password@localhost:3306/mydb',
    };

    return urls[this.options.database || 'sqlite'];
  }

  private getAuthModels(): string {
    return `model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  accounts      Account[]
  sessions      Session[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`;
  }

  private getBasicModels(): string {
    return `model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
`;
  }

  private async setupAuth(): Promise<void> {
    // NextAuth config
    const authConfig = `import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/db/prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          throw new Error('Invalid credentials')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error('Invalid credentials')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
  },
}
`;

    await writeFile(
      path.join(this.projectPath, 'src', 'lib', 'auth', 'auth-options.ts'),
      authConfig
    );

    // API route
    const authRoute = `import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth/auth-options'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
`;

    await ensureDir(path.join(this.projectPath, 'src', 'app', 'api', 'auth', '[...nextauth]'));
    await writeFile(
      path.join(
        this.projectPath,
        'src',
        'app',
        'api',
        'auth',
        '[...nextauth]',
        'route.ts'
      ),
      authRoute
    );
  }

  private async createAPIRoutes(): Promise<void> {
    // Health check route
    const healthRoute = `import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
}
`;

    await ensureDir(path.join(this.projectPath, 'src', 'app', 'api', 'health'));
    await writeFile(
      path.join(this.projectPath, 'src', 'app', 'api', 'health', 'route.ts'),
      healthRoute
    );

    // Example CRUD route
    const usersRoute = `import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
`;

    await ensureDir(path.join(this.projectPath, 'src', 'app', 'api', 'users'));
    await writeFile(
      path.join(this.projectPath, 'src', 'app', 'api', 'users', 'route.ts'),
      usersRoute
    );
  }
}
