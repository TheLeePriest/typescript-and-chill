const child_process = require('child_process');

jest.mock('child_process', () => ({
execSync: jest.fn()
}));

const { setupCDK } = require('../bin/cdk-setup');

describe('CDK setup', () => {
afterEach(() => {
    jest.clearAllMocks();
});

it('should install dependencies', () => {
    setupCDK();
    expect(child_process.execSync).toHaveBeenCalledWith(
    'npm install -g aws-cdk',
    { stdio: 'inherit' }
    );
});
});
