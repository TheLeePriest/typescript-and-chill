const fs = require('fs');
const { setupESLint } = require('../bin/eslint-setup');

test('ESLint setup should create the correct config file', () => {
    jest.spyOn(fs, 'copyFileSync').mockImplementation(() => {});
    setupESLint();
    expect(fs.copyFileSync).toHaveBeenCalled();
});
