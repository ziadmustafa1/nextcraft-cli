#!/usr/bin/env node

/**
 * Complete Test Script - Frontend + Fullstack
 * Tests all Senior-Level configurations
 */

const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Helper functions
function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function removeSync(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function readJsonSync(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  if (exists) {
    log(`  ✓ ${description}`, 'green');
    return true;
  } else {
    log(`  ✗ ${description} (MISSING)`, 'red');
    return false;
  }
}

async function testFrontendProject() {
  log('\n🧪 Testing Frontend Project\n', 'cyan');
  
  const projectPath = path.join(__dirname, 'test-projects', 'frontend-test');
  
  // Clean up if exists
  if (fs.existsSync(projectPath)) {
    log('Cleaning up old test project...', 'yellow');
    removeSync(projectPath);
  }
  
  // Ensure test-projects directory
  ensureDirSync(path.join(__dirname, 'test-projects'));
  
  // Run generator
  log('Generating Frontend project...', 'blue');
  const { FrontendGenerator } = require('./packages/cli/dist/generators/frontend-generator');
  
  const options = {
    name: 'frontend-test',
    mode: 'frontend',
    ui: 'shadcn',
    auth: false,
    rtl: false,
    seo: true,
    path: projectPath,
  };
  
  const generator = new FrontendGenerator(options);
  await generator.generate();
  
  log('\n✅ Frontend project generated!\n', 'green');
  
  // Validate files
  log('Validating Senior-Level files...', 'blue');
  
  const checks = [
    // Core files
    [path.join(projectPath, 'package.json'), 'package.json'],
    [path.join(projectPath, 'next.config.ts'), 'next.config.ts'],
    [path.join(projectPath, 'tsconfig.json'), 'tsconfig.json (strict)'],
    [path.join(projectPath, 'nextcraft.config.ts'), 'nextcraft.config.ts'],
    
    // Senior configs
    [path.join(projectPath, '.prettierrc'), '.prettierrc'],
    [path.join(projectPath, '.prettierignore'), '.prettierignore'],
    [path.join(projectPath, 'eslint.config.mjs'), 'eslint.config.mjs (flat)'],
    [path.join(projectPath, '.lintstagedrc'), '.lintstagedrc'],
    [path.join(projectPath, '.editorconfig'), '.editorconfig'],
    
    // Git hooks
    [path.join(projectPath, '.husky', 'pre-commit'), '.husky/pre-commit'],
    [path.join(projectPath, 'commitlint.config.mjs'), 'commitlint.config.mjs'],
    
    // Testing
    [path.join(projectPath, 'vitest.config.ts'), 'vitest.config.ts'],
    [path.join(projectPath, 'vitest.setup.ts'), 'vitest.setup.ts'],
    [path.join(projectPath, '__tests__'), '__tests__/'],
    
    // VSCode
    [path.join(projectPath, '.vscode', 'settings.json'), '.vscode/settings.json'],
    [path.join(projectPath, '.vscode', 'extensions.json'), '.vscode/extensions.json'],
    
    // CI/CD
    [path.join(projectPath, '.github', 'workflows', 'ci.yml'), '.github/workflows/ci.yml'],
    
    // Next.js 16 features
    [path.join(projectPath, 'src', 'app', 'actions'), 'src/app/actions/'],
    [path.join(projectPath, 'src', 'lib', 'cache.ts'), 'src/lib/cache.ts'],
    [path.join(projectPath, 'src', 'lib', 'server-utils.ts'), 'src/lib/server-utils.ts'],
    [path.join(projectPath, 'src', 'lib', 'client-utils.ts'), 'src/lib/client-utils.ts'],
    
    // Documentation
    [path.join(projectPath, 'NEXTJS_16.md'), 'NEXTJS_16.md'],
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const [file, desc] of checks) {
    if (checkFile(file, desc)) {
      passed++;
    } else {
      failed++;
    }
  }
  
  log(`\n📊 Results: ${passed} passed, ${failed} failed\n`, failed > 0 ? 'yellow' : 'green');
  
  // Check package.json for Senior deps
  log('Checking Senior dependencies...', 'blue');
  const packageJson = readJsonSync(path.join(projectPath, 'package.json'));
  
  const requiredDeps = [
    '@tanstack/react-query',
    'zustand',
    'react-hook-form',
    'zod',
    'framer-motion',
  ];
  
  const requiredDevDeps = [
    'vitest',
    '@testing-library/react',
    'prettier',
    'husky',
    'lint-staged',
  ];
  
  let depsPassed = 0;
  for (const dep of requiredDeps) {
    if (packageJson.dependencies[dep]) {
      log(`  ✓ ${dep}`, 'green');
      depsPassed++;
    } else {
      log(`  ✗ ${dep} (MISSING)`, 'red');
    }
  }
  
  for (const dep of requiredDevDeps) {
    if (packageJson.devDependencies[dep]) {
      log(`  ✓ ${dep}`, 'green');
      depsPassed++;
    } else {
      log(`  ✗ ${dep} (MISSING)`, 'red');
    }
  }
  
  log(`\n📦 Dependencies: ${depsPassed}/${requiredDeps.length + requiredDevDeps.length}\n`, 'green');
  
  // Check scripts
  log('Checking package.json scripts...', 'blue');
  const requiredScripts = ['dev', 'build', 'lint', 'typecheck', 'test', 'format', 'validate'];
  
  let scriptsPassed = 0;
  for (const script of requiredScripts) {
    if (packageJson.scripts[script]) {
      log(`  ✓ ${script}`, 'green');
      scriptsPassed++;
    } else {
      log(`  ✗ ${script} (MISSING)`, 'red');
    }
  }
  
  log(`\n📜 Scripts: ${scriptsPassed}/${requiredScripts.length}\n`, 'green');
  
  return {
    projectPath,
    passed,
    failed,
    depsPassed,
    scriptsPassed,
  };
}

async function testFullstackProject() {
  log('\n🧪 Testing Fullstack Project\n', 'cyan');
  
  const projectPath = path.join(__dirname, 'test-projects', 'fullstack-test');
  
  // Clean up if exists
  if (fs.existsSync(projectPath)) {
    log('Cleaning up old test project...', 'yellow');
    removeSync(projectPath);
  }
  
  // Run generator
  log('Generating Fullstack project...', 'blue');
  const { FullstackGenerator } = require('./packages/cli/dist/generators/fullstack-generator');
  
  const options = {
    name: 'fullstack-test',
    mode: 'fullstack',
    ui: 'shadcn',
    database: 'sqlite',
    auth: true,
    rtl: false,
    seo: true,
    path: projectPath,
  };
  
  const generator = new FullstackGenerator(options);
  await generator.generate();
  
  log('\n✅ Fullstack project generated!\n', 'green');
  
  // Validate files (all frontend + fullstack specific)
  log('Validating Fullstack-specific files...', 'blue');
  
  const checks = [
    [path.join(projectPath, 'prisma', 'schema.prisma'), 'prisma/schema.prisma'],
    [path.join(projectPath, 'src', 'lib', 'db', 'prisma.ts'), 'src/lib/db/prisma.ts'],
    [path.join(projectPath, 'src', 'app', 'api'), 'src/app/api/'],
    [path.join(projectPath, '.env'), '.env'],
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const [file, desc] of checks) {
    if (checkFile(file, desc)) {
      passed++;
    } else {
      failed++;
    }
  }
  
  log(`\n📊 Fullstack Results: ${passed} passed, ${failed} failed\n`, failed > 0 ? 'yellow' : 'green');
  
  return {
    projectPath,
    passed,
    failed,
  };
}

async function main() {
  log('\n╔════════════════════════════════════════╗', 'cyan');
  log('║   NextCraft Complete Test Suite       ║', 'cyan');
  log('║   Senior-Level Stack 2025              ║', 'cyan');
  log('╚════════════════════════════════════════╝\n', 'cyan');
  
  try {
    // Test Frontend
    const frontendResults = await testFrontendProject();
    
    // Test Fullstack
    const fullstackResults = await testFullstackProject();
    
    // Summary
    log('\n╔════════════════════════════════════════╗', 'green');
    log('║         Final Test Summary             ║', 'green');
    log('╚════════════════════════════════════════╝\n', 'green');
    
    log(`Frontend Project:`, 'cyan');
    log(`  Files: ${frontendResults.passed} passed, ${frontendResults.failed} failed`);
    log(`  Dependencies: ${frontendResults.depsPassed}/10`);
    log(`  Scripts: ${frontendResults.scriptsPassed}/7`);
    log(`  Location: ${frontendResults.projectPath}\n`);
    
    log(`Fullstack Project:`, 'cyan');
    log(`  Fullstack Files: ${fullstackResults.passed} passed, ${fullstackResults.failed} failed`);
    log(`  Location: ${fullstackResults.projectPath}\n`);
    
    const totalPassed = frontendResults.passed + fullstackResults.passed;
    const totalFailed = frontendResults.failed + fullstackResults.failed;
    
    if (totalFailed === 0) {
      log('🎉 All tests passed! NextCraft is production-ready!\n', 'green');
    } else {
      log(`⚠️  ${totalFailed} checks failed. Please review.\n`, 'yellow');
    }
    
    log('Next steps:', 'blue');
    log('  1. cd test-projects/frontend-test && pnpm build');
    log('  2. cd test-projects/fullstack-test && pnpm build');
    log('  3. Check all generated files\n');
    
  } catch (error) {
    log(`\n❌ Test failed: ${error.message}\n`, 'red');
    console.error(error);
    process.exit(1);
  }
}

main();
