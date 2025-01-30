import fs from 'fs';
import path from 'path';

export const setupPrettier = (): void => {
  console.log('🛠️ Setting up Prettier...');

  const prettierConfigPath = path.join(process.cwd(), '.prettierrc');
  const prettierIgnorePath = path.join(process.cwd(), '.prettierignore');
  const templateDir = path.join(__dirname, '../templates');

  // Copy .prettierrc from template
  const prettierTemplate = path.join(templateDir, '.prettierrc');
  if (!fs.existsSync(prettierConfigPath) && fs.existsSync(prettierTemplate)) {
    fs.copyFileSync(prettierTemplate, prettierConfigPath);
    console.log('✅ .prettierrc file created from template.');
  } else {
    console.log('ℹ️ .prettierrc file already exists or template is missing.');
  }

  // Copy .prettierignore from template
  const prettierIgnoreTemplate = path.join(templateDir, '.prettierignore');
  if (
    !fs.existsSync(prettierIgnorePath) &&
    fs.existsSync(prettierIgnoreTemplate)
  ) {
    fs.copyFileSync(prettierIgnoreTemplate, prettierIgnorePath);
    console.log('✅ .prettierignore file created from template.');
  } else {
    console.log(
      'ℹ️ .prettierignore file already exists or template is missing.'
    );
  }
};

module.exports = { setupPrettier };
