#!/usr/bin/env node

import { setupESLint } from './eslint-setup';
import { setupPrettier } from './prettier-setup';
import { setupJest } from './jest-setup';
import { setupCDK } from './cdk-setup';
import { setupCICD } from './ci-cd-setup';
import { setupTsConfig } from './tsconfig-setup';
import path from 'path';
import readline from 'readline';
import { execSync } from 'child_process';
import fs from 'fs';
import { setupGitIgnore } from './git-ignore-stup';

const args = process.argv.slice(2);
const autoYes = args.includes('-y');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const questions = [
  {
    name: 'npmInit',
    message: 'Initialise an NPM package (yes/no)?',
    default: 'yes',
  },
  { name: 'awsCdk', message: 'Install AWS CDK (yes/no)?', default: 'yes' },
  {
    name: 'testing',
    message: 'Include Jest for testing (yes/no)?',
    default: 'yes',
  },
  {
    name: 'ciCd',
    message: 'Set up CI/CD with GitHub Actions (yes/no)?',
    default: 'yes',
  },
  {
    name: 'installTypescript',
    message: 'Install TypeScript as a project dependency? (yes/no)?',
    default: 'yes',
  },
  {
    name: 'installEsbuild',
    message: 'Install esbuild for TypeScript compilation? (yes/no)?',
    default: 'yes',
  },
];

const askQuestion = (query: string): Promise<string> =>
  new Promise((resolve) => rl.question(query, (answer) => resolve(answer)));

(async () => {
  console.log('⚡ Setting up your development environment...');
  const responses: Record<string, string> = {};

  if (autoYes) {
    questions.forEach((q) => (responses[q.name] = 'yes'));
    console.log('✅ Running with all answers defaulted to YES');
  } else {
    for (const q of questions) {
      responses[q.name] =
        (await askQuestion(`${q.message} [${q.default}]: `)) || q.default;
    }
  }

  rl.close();

  const directories = ['cdk/stacks', 'src'];

  directories.forEach((dir) => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });

  if (responses.npmInit === 'yes') {
    console.log('📦 Initialising NPM...');
    execSync(`npm init ${autoYes ? '-y' : ''}`, { stdio: 'inherit' });
  }

  if (responses.installTypescript === 'yes') {
    console.log('📦 Installing TypeScript as a project dependency...');
    execSync('npm install --save-dev typescript', { stdio: 'inherit' });
  }

  if (responses.installEsbuild === 'yes') {
    console.log('📦 Installing esbuild for TypeScript compilation...');
    execSync('npm install --save-dev esbuild', { stdio: 'inherit' });
  }

  setupESLint();
  setupPrettier();
  setupTsConfig();
  setupGitIgnore();
  if (responses.testing === 'yes') setupJest();
  if (responses.awsCdk === 'yes') setupCDK();
  if (responses.ciCd === 'yes') setupCICD();

  console.log(
    '🎉 Setup complete! Don’t forget to add your secrets to GitHub Settings.'
  );
})();
