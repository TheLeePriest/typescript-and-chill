import { execSync } from 'child_process';

export const setupVitest = (): void => {
  console.log('🛠️ Setting up ViTest...');
  console.log('📦 Installing Vitest...');
  execSync('npm install -D vitest', {
    stdio: 'inherit',
  });
};
