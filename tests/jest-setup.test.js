const fs = require('fs');
const { setupJest } = require('../bin/jest-setup');

test('Jest setup should create the correct config file', () => {
    jest.spyOn(fs, 'copyFileSync').mockImplementation(() => {});
    setupJest();
    expect(fs.copyFileSync).toHaveBeenCalled();
});
