#!/usr/bin/env node

/**
 * اختبار مباشر للـ Generators
 */

const path = require('path');

async function testFrontendGenerator() {
  console.log('🧪 Testing Frontend Generator...\n');
  
  try {
    // استيراد الـ Generator
    const { FrontendGenerator } = require('./packages/cli/dist/generators/frontend-generator');
    
    // إعداد الخيارات
    const options = {
      name: 'test-frontend-app',
      mode: 'frontend',
      ui: 'shadcn',
      auth: false,
      rtl: false,
      seo: true,
      path: '/tmp/test-frontend-app'
    };
    
    console.log('📋 Options:', options);
    console.log('');
    
    // إنشاء Generator
    const generator = new FrontendGenerator(options);
    
    // تنفيذ التوليد
    console.log('⚙️  Generating project...\n');
    await generator.generate();
    
    console.log('\n✅ Frontend project generated successfully!');
    console.log(`📁 Location: ${options.path}`);
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

async function testFullstackGenerator() {
  console.log('\n🧪 Testing Fullstack Generator...\n');
  
  try {
    const { FullstackGenerator } = require('./packages/cli/dist/generators/fullstack-generator');
    
    const options = {
      name: 'test-fullstack-app',
      mode: 'fullstack',
      ui: 'shadcn',
      database: 'sqlite',
      auth: true,
      rtl: false,
      seo: true,
      path: '/tmp/test-fullstack-app'
    };
    
    console.log('📋 Options:', options);
    console.log('');
    
    const generator = new FullstackGenerator(options);
    
    console.log('⚙️  Generating project...\n');
    await generator.generate();
    
    console.log('\n✅ Fullstack project generated successfully!');
    console.log(`📁 Location: ${options.path}`);
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// تشغيل الاختبارات
(async () => {
  const testType = process.argv[2] || 'frontend';
  
  if (testType === 'frontend') {
    await testFrontendGenerator();
  } else if (testType === 'fullstack') {
    await testFullstackGenerator();
  } else if (testType === 'both') {
    await testFrontendGenerator();
    await testFullstackGenerator();
  } else {
    console.log('Usage: node test-generator.js [frontend|fullstack|both]');
    process.exit(1);
  }
  
  console.log('\n🎉 All tests completed!');
})();
