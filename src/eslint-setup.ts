import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

export const setupESLint = (): void => {
  console.log('🛠️ Setting up ESLint...');
  fs.copyFileSync(
    path.join(__dirname, '../templates/eslintrc.js'),
    '.eslintrc.js'
  );

  console.log('📦 Installing ESLint...');
  execSync('npm install eslint', { stdio: 'inherit' });

  console.log('📦 Installing ESLint...');
  execSync(
    'npm install @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier --save-dev',
    { stdio: 'inherit' }
  );
};
