#!/bin/bash
set -e

echo "🧪 NextCraft Quick Test - Final Verification"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Clean up
rm -rf /tmp/nextcraft-final-test
mkdir -p /tmp/nextcraft-final-test
cd /tmp/nextcraft-final-test

echo "📦 Creating new project with NextCraft..."
echo ""

# Run generator with --yes flag (non-interactive)
node /home/ziad/Desktop/NextCraft/packages/cli/dist/index.js final-test --yes

echo ""
echo "✅ Project created!"
echo ""

cd final-test

echo "🔍 Checking fixes..."
echo ""

# Check 1: next.config.ts
if grep -q "cacheComponents: true" next.config.ts; then
  echo "  ✓ next.config.ts: cacheComponents ✅"
else
  echo "  ✗ next.config.ts: Missing cacheComponents ❌"
fi

# Check 2: postcss.config.js
if grep -q "@tailwindcss/postcss" postcss.config.js; then
  echo "  ✓ postcss.config.js: @tailwindcss/postcss ✅"
else
  echo "  ✗ postcss.config.js: Missing @tailwindcss/postcss ❌"
fi

# Check 3: globals.css
if grep -q "@import \"tailwindcss\"" src/app/globals.css; then
  echo "  ✓ globals.css: TailwindCSS 4 syntax ✅"
else
  echo "  ✗ globals.css: Old syntax ❌"
fi

# Check 4: Server actions
if grep -q "_prevState" src/app/actions/index.ts; then
  echo "  ✓ actions/index.ts: TypeScript strict ✅"
else
  echo "  ✗ actions/index.ts: Not fixed ❌"
fi

# Check 5: use-fetch
if grep -q "@tanstack/react-query" src/hooks/use-fetch.ts; then
  echo "  ✓ use-fetch.ts: TanStack Query ✅"
else
  echo "  ✗ use-fetch.ts: Still using SWR ❌"
fi

# Check 6: client-utils
if grep -q "declare global" src/lib/client-utils.ts; then
  echo "  ✓ client-utils.ts: Window interface ✅"
else
  echo "  ✗ client-utils.ts: Missing types ❌"
fi

# Check 7: No async-page
if [ ! -d "src/app/(examples)/async-page" ]; then
  echo "  ✓ No conflicting async-page ✅"
else
  echo "  ✗ async-page still exists ❌"
fi

# Check 8: Dependencies
if grep -q "@tailwindcss/postcss" package.json; then
  echo "  ✓ package.json: @tailwindcss/postcss ✅"
else
  echo "  ✗ package.json: Missing dependency ❌"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📁 Project location: /tmp/nextcraft-final-test/final-test"
echo ""
echo "Next steps:"
echo "  cd /tmp/nextcraft-final-test/final-test"
echo "  pnpm install"
echo "  pnpm build"
echo ""
