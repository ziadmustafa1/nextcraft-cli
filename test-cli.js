#!/usr/bin/env node

/**
 * Script لاختبار CLI محلياً
 * يحاكي تنفيذ: npx create-nextcraft-app test-app
 */

const path = require('path');
const { spawn } = require('child_process');

const cliPath = path.join(__dirname, 'packages/cli/dist/index.js');
const projectName = process.argv[2] || 'test-frontend-app';

console.log('🧪 Testing NextCraft CLI...\n');
console.log(`📦 CLI Path: ${cliPath}`);
console.log(`📁 Project Name: ${projectName}\n`);

// تشغيل CLI
const child = spawn('node', [cliPath, projectName], {
  stdio: 'inherit',
  cwd: '/tmp'
});

child.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ CLI test completed successfully!');
  } else {
    console.log(`\n❌ CLI test failed with code ${code}`);
  }
  process.exit(code);
});
