import fs from 'fs';
import path from 'path';

export const setupJest = (): void => {
  console.log('🛠️ Setting up Jest...');
  fs.copyFileSync(
    path.join(__dirname, '../templates/jest.config.js'),
    'jest.config.js'
  );
};

module.exports = { setupJest };
