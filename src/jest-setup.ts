import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

export const setupJest = (): void => {
  console.log('🛠️ Setting up Jest...');
  fs.copyFileSync(
    path.join(__dirname, '../templates/jest.config.js'),
    'jest.config.js'
  );

  console.log('📦 Installing Jest...');
  execSync('npm install jest ts-jest @types/jest --save-dev', {
    stdio: 'inherit',
  });
};

module.exports = { setupJest };
