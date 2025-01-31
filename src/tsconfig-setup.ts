import fs from 'fs';
import path from 'path';

export const setupTsConfig = (): void => {
  console.log('🛠️ Setting up TypeScript configuration...');

  const templateDir = path.join(__dirname, '../templates');
  const tsConfigTemplate = path.join(templateDir, 'tsconfig.json');
  const tsConfigDest = path.join(process.cwd(), 'tsconfig.json');
  const srcDirPath = path.join(process.cwd(), 'src');
  const srcIndexPath = path.join(srcDirPath, 'index.ts');

  if (fs.existsSync(tsConfigTemplate)) {
    fs.copyFileSync(tsConfigTemplate, tsConfigDest);
    console.log('✅ tsconfig.json file created from template.');
  } else {
    console.error(
      '❌ tsconfig.json template not found in templates directory.'
    );
  }

  if (!fs.existsSync(srcDirPath)) {
    fs.mkdirSync(srcDirPath, { recursive: true });
    console.log('✅ Created src directory.');
  }

  if (!fs.existsSync(srcIndexPath)) {
    fs.writeFileSync(
      srcIndexPath,
      '// Placeholder file to prevent TypeScript errors\n'
    );
    console.log('✅ Created src/index.ts to satisfy TypeScript compiler.');
  }
};
