const fs = require('fs');
const child_process = require('child_process');

jest.mock('child_process', () => ({
execSync: jest.fn()
}));

const { setupESLint } = require('../bin/eslint-setup');
const { setupPrettier } = require('../bin/prettier-setup');
const { setupJest } = require('../bin/jest-setup');
const { setupCDK } = require('../bin/cdk-setup');
const { setupCICD } = require('../bin/ci-cd-setup');

describe('Setup Scripts', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('ESLint setup creates the correct file', () => {
        jest.spyOn(fs, 'copyFileSync').mockImplementation(() => {});
        setupESLint();
        expect(fs.copyFileSync).toHaveBeenCalled();
    });

    test('Prettier setup creates the correct file', () => {
        jest.spyOn(fs, 'copyFileSync').mockImplementation(() => {});
        setupPrettier();
        expect(fs.copyFileSync).toHaveBeenCalled();
    });

    test('Jest setup creates the correct file', () => {
        jest.spyOn(fs, 'copyFileSync').mockImplementation(() => {});
        setupJest();
        expect(fs.copyFileSync).toHaveBeenCalled();
    });

    test('CDK setup installs the correct dependencies', () => {
        setupCDK();
        expect(child_process.execSync).toHaveBeenCalledWith('npm install -g aws-cdk', { stdio: 'inherit' });
    });

    test('CI/CD setup creates workflow file', () => {
        jest.spyOn(fs, 'copyFileSync').mockImplementation(() => {});
        setupCICD();
        expect(fs.copyFileSync).toHaveBeenCalled();
    });
});
