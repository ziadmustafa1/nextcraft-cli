# Issues to Create

Here are the 10 issues you requested. You can copy and paste these into GitHub Issues.

## 1. fix: typo in README quick start
**Body:**
Correct the spelling in README Quick Start. Verify command examples work.

## 2. docs: add Quick Start example for frontend mode
**Body:**
Add step by step Quick Start that shows npx create-nextcraft-app my-app --mode frontend.

## 3. example: add minimal Next.js starter for examples/basic
**Body:**
Create a minimal Next.js example that runs with pnpm --filter examples dev. Include README.

## 4. chore: add CONTRIBUTORS file
**Body:**
Add a CONTRIBUTORS.md listing project lead and placeholder for future contributors.

## 5. test: add simple unit test for CLI entry
**Body:**
Add a test that imports cli/index and asserts expected help output.

## 6. docs: add CLI usage section in README
**Body:**
Document npx create-nextcraft-app usage, flags list, and examples.

## 7. feat: add package.json bin field for CLI
**Body:**
Add "bin": {"nextcraft":"./cli/index.js"} and ensure executable file exists.

## 8. refactor: move examples to /examples folder
**Body:**
Create examples/ with one small project. Update README links.

## 9. ci: add node 20 matrix to CI
**Body:**
Extend CI to test node 18 and 20. Add caching for pnpm store.

## 10. docs: add CODE_OF_CONDUCT.md
**Body:**
Create a simple code of conduct using our standard template.
