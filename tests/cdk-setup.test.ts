import { execSync } from 'child_process';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('child_process', () => ({
execSync: vi.fn()
}));

const { setupCDK } = require('../bin/cdk-setup');

describe('CDK setup', () => {
afterEach(() => {
    vi.clearAllMocks();
});

it('should install dependencies', () => {
    setupCDK();
    expect(execSync).toHaveBeenCalledWith(
    'npm install aws-cdk',
    { stdio: 'inherit' }
    );
});
});
