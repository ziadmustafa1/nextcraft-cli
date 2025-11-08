#!/bin/bash
set -e

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🧪 NextCraft Complete Test"
echo "  Testing Frontend + Fullstack Projects"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Clean up
rm -rf /tmp/nextcraft-test-both
mkdir -p /tmp/nextcraft-test-both
cd /tmp/nextcraft-test-both

CLI_PATH="/home/ziad/Desktop/NextCraft/packages/cli/dist/index.js"

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Test 1: Frontend Project
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo "📦 Test 1: Creating Frontend Project"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

node "$CLI_PATH" frontend-app --mode frontend --ui shadcn --yes

echo ""
echo "✅ Frontend project created!"
echo ""

cd frontend-app

echo "🔍 Validating Frontend files..."
checks_passed=0
checks_failed=0

# Check fixes
if grep -q "cacheComponents: true" next.config.ts; then
  echo "  ✓ next.config.ts: cacheComponents ✅"
  ((checks_passed++))
else
  echo "  ✗ next.config.ts: Missing cacheComponents ❌"
  ((checks_failed++))
fi

if grep -q "@tailwindcss/postcss" postcss.config.js; then
  echo "  ✓ postcss.config.js: TailwindCSS 4 ✅"
  ((checks_passed++))
else
  echo "  ✗ postcss.config.js: Wrong config ❌"
  ((checks_failed++))
fi

if grep -q "@import \"tailwindcss\"" src/app/globals.css; then
  echo "  ✓ globals.css: TailwindCSS 4 syntax ✅"
  ((checks_passed++))
else
  echo "  ✗ globals.css: Old syntax ❌"
  ((checks_failed++))
fi

if grep -q "_prevState" src/app/actions/index.ts; then
  echo "  ✓ Server Actions: TypeScript strict ✅"
  ((checks_passed++))
else
  echo "  ✗ Server Actions: Not fixed ❌"
  ((checks_failed++))
fi

if grep -q "@tanstack/react-query" src/hooks/use-fetch.ts; then
  echo "  ✓ use-fetch: TanStack Query ✅"
  ((checks_passed++))
else
  echo "  ✗ use-fetch: Still using SWR ❌"
  ((checks_failed++))
fi

if grep -q "declare global" src/lib/client-utils.ts; then
  echo "  ✓ client-utils: Window interface ✅"
  ((checks_passed++))
else
  echo "  ✗ client-utils: Missing types ❌"
  ((checks_failed++))
fi

echo ""
echo "📊 Frontend Validation: $checks_passed passed, $checks_failed failed"
echo ""

echo "🔨 Installing dependencies..."
pnpm install > /dev/null 2>&1

echo "🏗️  Building frontend project..."
if pnpm build > /tmp/frontend-build.log 2>&1; then
  echo "  ✅ Frontend build: SUCCESS ✅"
  frontend_build="success"
else
  echo "  ❌ Frontend build: FAILED ❌"
  echo ""
  echo "Build errors:"
  tail -20 /tmp/frontend-build.log
  frontend_build="failed"
fi

echo ""

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Test 2: Fullstack Project
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
cd /tmp/nextcraft-test-both

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Test 2: Creating Fullstack Project"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

node "$CLI_PATH" fullstack-app --mode fullstack --ui shadcn --db sqlite --auth --yes

echo ""
echo "✅ Fullstack project created!"
echo ""

cd fullstack-app

echo "🔍 Validating Fullstack files..."
fs_checks_passed=0
fs_checks_failed=0

# Check fullstack-specific files
if [ -f "prisma/schema.prisma" ]; then
  echo "  ✓ Prisma schema exists ✅"
  ((fs_checks_passed++))
else
  echo "  ✗ Prisma schema missing ❌"
  ((fs_checks_failed++))
fi

if [ -f "src/lib/db/prisma.ts" ]; then
  echo "  ✓ Prisma client configured ✅"
  ((fs_checks_passed++))
else
  echo "  ✗ Prisma client missing ❌"
  ((fs_checks_failed++))
fi

if [ -d "src/app/api" ]; then
  echo "  ✓ API routes exist ✅"
  ((fs_checks_passed++))
else
  echo "  ✗ API routes missing ❌"
  ((fs_checks_failed++))
fi

if [ -f ".env" ]; then
  echo "  ✓ Environment file exists ✅"
  ((fs_checks_passed++))
else
  echo "  ✗ Environment file missing ❌"
  ((fs_checks_failed++))
fi

# Check same frontend fixes
if grep -q "cacheComponents: true" next.config.ts; then
  echo "  ✓ next.config.ts: cacheComponents ✅"
  ((fs_checks_passed++))
else
  echo "  ✗ next.config.ts: Missing cacheComponents ❌"
  ((fs_checks_failed++))
fi

if grep -q "@tailwindcss/postcss" postcss.config.js; then
  echo "  ✓ postcss.config.js: TailwindCSS 4 ✅"
  ((fs_checks_passed++))
else
  echo "  ✗ postcss.config.js: Wrong config ❌"
  ((fs_checks_failed++))
fi

echo ""
echo "📊 Fullstack Validation: $fs_checks_passed passed, $fs_checks_failed failed"
echo ""

echo "🔨 Installing dependencies..."
pnpm install > /dev/null 2>&1

echo "🏗️  Building fullstack project..."
if pnpm build > /tmp/fullstack-build.log 2>&1; then
  echo "  ✅ Fullstack build: SUCCESS ✅"
  fullstack_build="success"
else
  echo "  ❌ Fullstack build: FAILED ❌"
  echo ""
  echo "Build errors:"
  tail -20 /tmp/fullstack-build.log
  fullstack_build="failed"
fi

echo ""

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Final Summary
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  📊 Final Test Results"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Frontend Project:"
echo "  Location: /tmp/nextcraft-test-both/frontend-app"
echo "  Validation: $checks_passed/$((checks_passed + checks_failed)) checks"
echo "  Build: $frontend_build"
echo ""

echo "Fullstack Project:"
echo "  Location: /tmp/nextcraft-test-both/fullstack-app"
echo "  Validation: $fs_checks_passed/$((fs_checks_passed + fs_checks_failed)) checks"
echo "  Build: $fullstack_build"
echo ""

# Overall status
total_passed=$((checks_passed + fs_checks_passed))
total_failed=$((checks_failed + fs_checks_failed))

if [ "$frontend_build" = "success" ] && [ "$fullstack_build" = "success" ]; then
  echo "🎉 Overall Status: ALL TESTS PASSED! ✅"
  echo ""
  echo "Both projects built successfully!"
  echo "  ✅ Frontend: Ready"
  echo "  ✅ Fullstack: Ready"
  exit 0
else
  echo "⚠️  Overall Status: SOME TESTS FAILED ❌"
  echo ""
  if [ "$frontend_build" = "failed" ]; then
    echo "  ❌ Frontend build failed"
    echo "     Log: /tmp/frontend-build.log"
  fi
  if [ "$fullstack_build" = "failed" ]; then
    echo "  ❌ Fullstack build failed"
    echo "     Log: /tmp/fullstack-build.log"
  fi
  exit 1
fi
