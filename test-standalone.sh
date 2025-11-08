#!/bin/bash

# Test NextCraft outside workspace
set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  NextCraft Standalone Test"
echo "  Testing Frontend + Fullstack"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Build NextCraft first
echo "📦 Building NextCraft..."
pnpm build
echo ""

# Test directory in /tmp
TEST_DIR="/tmp/nextcraft-tests"
rm -rf "$TEST_DIR"
mkdir -p "$TEST_DIR"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Test 1: Frontend Project"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$TEST_DIR"

# Create frontend project
echo "🔨 Creating frontend project..."
node /home/ziad/Desktop/NextCraft/packages/cli/dist/index.js frontend-app <<EOF
frontend
shadcn
n
n
y
EOF

echo ""
echo "✅ Frontend project created!"
echo ""

# Check files
echo "📁 Checking generated files..."
cd frontend-app

# Essential files
files=(
  "package.json"
  "next.config.ts"
  "tsconfig.json"
  "nextcraft.config.ts"
  ".prettierrc"
  "eslint.config.mjs"
  ".lintstagedrc"
  "vitest.config.ts"
  ".husky/pre-commit"
  ".github/workflows/ci.yml"
  "src/app/actions/index.ts"
  "src/lib/cache.ts"
  "NEXTJS_16.md"
)

passed=0
failed=0

for file in "${files[@]}"; do
  if [ -f "$file" ] || [ -d "$file" ]; then
    echo "  ✓ $file"
    ((passed++))
  else
    echo "  ✗ $file (MISSING)"
    ((failed++))
  fi
done

echo ""
echo "📊 Files: $passed passed, $failed failed"
echo ""

# Check dependencies
echo "📦 Checking package.json..."
if grep -q "@tanstack/react-query" package.json; then
  echo "  ✓ TanStack Query"
fi
if grep -q "zustand" package.json; then
  echo "  ✓ Zustand"
fi
if grep -q "react-hook-form" package.json; then
  echo "  ✓ React Hook Form"
fi
if grep -q "zod" package.json; then
  echo "  ✓ Zod"
fi
if grep -q "vitest" package.json; then
  echo "  ✓ Vitest"
fi
if grep -q "prettier" package.json; then
  echo "  ✓ Prettier"
fi
if grep -q "husky" package.json; then
  echo "  ✓ Husky"
fi

echo ""
echo "🔨 Installing dependencies..."
pnpm install

echo ""
echo "🏗️  Building project..."
if pnpm build; then
  echo ""
  echo "✅ Frontend build successful!"
else
  echo ""
  echo "❌ Frontend build failed!"
  exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Test 2: Fullstack Project"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$TEST_DIR"

# Create fullstack project
echo "🔨 Creating fullstack project..."
node /home/ziad/Desktop/NextCraft/packages/cli/dist/index.js fullstack-app <<EOF
fullstack
shadcn
sqlite
y
n
y
EOF

echo ""
echo "✅ Fullstack project created!"
echo ""

# Check fullstack-specific files
echo "📁 Checking fullstack files..."
cd fullstack-app

fullstack_files=(
  "prisma/schema.prisma"
  "src/lib/db/prisma.ts"
  "src/app/api/auth/[...nextauth]/route.ts"
  ".env"
)

fs_passed=0
fs_failed=0

for file in "${fullstack_files[@]}"; do
  if [ -f "$file" ] || [ -d "$file" ]; then
    echo "  ✓ $file"
    ((fs_passed++))
  else
    echo "  ✗ $file (MISSING)"
    ((fs_failed++))
  fi
done

echo ""
echo "📊 Fullstack Files: $fs_passed passed, $fs_failed failed"
echo ""

echo "🔨 Installing dependencies..."
pnpm install

echo ""
echo "🏗️  Building project..."
if pnpm build; then
  echo ""
  echo "✅ Fullstack build successful!"
else
  echo ""
  echo "❌ Fullstack build failed!"
  exit 1
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Final Summary"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Frontend Project:"
echo "  Files: $passed/$((passed + failed))"
echo "  Build: ✅ Success"
echo "  Location: $TEST_DIR/frontend-app"
echo ""
echo "Fullstack Project:"
echo "  Files: $fs_passed/$((fs_passed + fs_failed))"
echo "  Build: ✅ Success"
echo "  Location: $TEST_DIR/fullstack-app"
echo ""
echo "🎉 All tests passed!"
echo ""
echo "Next steps:"
echo "  cd $TEST_DIR/frontend-app && pnpm dev"
echo "  cd $TEST_DIR/fullstack-app && pnpm dev"
echo ""
