import fs from 'fs';
import path from 'path';

export const setupGitIgnore = (): void => {
  console.log('🛠️ Setting up Gitignore...');
  fs.copyFileSync(path.join(__dirname, '../templates/gitignore'), '.gitignore');
};
