const fs = require('fs');
const { setupCICD } = require('../bin/ci-cd-setup');

test('CI/CD setup should create the GitHub Actions workflow file', () => {
    jest.spyOn(fs, 'copyFileSync').mockImplementation(() => {});
    setupCICD();
    expect(fs.copyFileSync).toHaveBeenCalled();
});
