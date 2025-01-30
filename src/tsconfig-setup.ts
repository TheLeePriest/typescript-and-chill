import fs from 'fs';
import path from 'path';

export const setupTsConfig = (): void => {
  console.log('🛠️ Setting up TypeScript configuration...');

  const templateDir = path.join(__dirname, '../templates');
  const tsConfigTemplate = path.join(templateDir, 'tsconfig.json');
  const tsConfigDest = path.join(process.cwd(), 'tsconfig.json');

  if (fs.existsSync(tsConfigTemplate)) {
    fs.copyFileSync(tsConfigTemplate, tsConfigDest);
    console.log('✅ tsconfig.json file created from template.');
  } else {
    console.error(
      '❌ tsconfig.json template not found in templates directory.'
    );
  }
};
