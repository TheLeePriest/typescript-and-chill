# TypeScript and Chill

## Overview

**TypeScript and Chill** is an NPM package that automates the process of setting up a modern TypeScript development environment. Designed for developers working with **AWS CDK**, **serverless applications**, and **microservices**, this CLI tool ensures that every new project starts with a standardized and optimized development environment.

This tool eliminates the need for manually setting up **ESLint, Prettier, Jest, AWS CDK**, and **CI/CD pipelines**, saving time and reducing setup inconsistencies across projects.

## Features

✅ **Interactive CLI Setup** - Choose what to install based on project needs  
✅ **Project Structure Creation** - Automatically sets up directories for CDK, source code, and testing  
✅ **AWS CDK Initialization** - Ensures an up-to-date `cdk.json` configuration  
✅ **Linting & Formatting** - Installs and configures **ESLint** and **Prettier**, including `.prettierignore`  
✅ **Testing** - Configures **Jest** for unit and integration testing  
✅ **CI/CD Integration** - Automatically sets up GitHub Actions for deployment  
✅ **Automatic TypeScript Compilation** - Installs and configures `esbuild`  
✅ **Deployment Ready** - Ensures TypeScript projects are ready for AWS deployments  
✅ **Changelog Management** - Automatically updates `CHANGELOG.md` and versioning for NPM releases

## Installation

To install and use this package in a new project:

```sh
npx typescript-and-chill
```

This will run the interactive CLI, guiding you through the setup process.

## How It Works

When you run `npx typescript-and-chill`, the CLI:

1. **Prompts for setup options** (CDK, Jest, ESLint, etc.).
2. **Installs dependencies** (`aws-cdk`, `eslint`, `jest`, `prettier`, `typescript`, `esbuild`).
3. **Creates project directories** (`cdk/`, `cdk/stacks/`, `src/`, `tests/`).
4. **Generates configuration files** (`.eslintrc.js`, `.prettierrc`, `.prettierignore`, `jest.config.js`, `tsconfig.json`, `cdk.json`).
5. **Sets up CI/CD** - Adds a GitHub Actions workflow for automated deployments.
6. **Ensures TypeScript Compilation** - Installs `esbuild` for efficient TS-to-JS compilation.
7. **Automates Changelog Updates** - Updates `CHANGELOG.md` and increments the version on NPM releases.

## Directory Structure (For Development)

This package includes the following structure for development and publishing:

```
typescript-and-chill/
├── bin/                # Internal CLI scripts (not included in installer output)
├── templates/          # Configuration templates (used during setup, not included in installer output)
├── scripts/            # Utility scripts (e.g., changelog updater)
├── src/                # Source code for the package
├── tests/              # Unit tests
├── cdk/                # AWS CDK-specific infrastructure
│   ├── stacks/         # CDK stacks
├── package.json        # Project dependencies and scripts
├── CHANGELOG.md        # Changelog for package updates
├── README.md           # Documentation
└── .gitignore          # Git ignore rules
```

## What Happens When You Run `npx typescript-and-chill`

The installer will **NOT** include internal directories such as `bin/` or `templates/` in the created project. Instead, it will:

- Generate necessary configuration files (`.eslintrc.js`, `.prettierrc`, `.prettierignore`, etc.).
- Set up essential dependencies.
- Create the correct project directory structure.

## Customization

You can choose which features to enable during setup:

- Install **AWS CDK** (`cdk init` is automatically run for accuracy).
- Enable **Jest** for testing.
- Add **CI/CD GitHub Actions workflow**.
- Install **TypeScript** and `esbuild` for deployments.
- Automate **changelog updates and version management**.

## Running Tests

Unit tests ensure that all setup scripts function correctly:

```sh
npm test
```

This will run Jest tests that validate the correct setup of **ESLint, Prettier, Jest, AWS CDK, CI/CD workflows, and TypeScript compilation**.

## Contributing

Want to improve this package? Feel free to contribute by submitting a pull request!

## License

MIT License
