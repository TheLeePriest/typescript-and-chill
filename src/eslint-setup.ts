import fs from 'fs';
import path from 'path';

export const setupESLint = (): void => {
  console.log('🛠️ Setting up ESLint...');
  fs.copyFileSync(
    path.join(__dirname, '../templates/eslintrc.js'),
    '.eslintrc.js'
  );
};
