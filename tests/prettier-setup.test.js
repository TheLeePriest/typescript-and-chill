const fs = require('fs');
const { setupPrettier } = require('../bin/prettier-setup');

test('Prettier setup should create the correct config file', () => {
    jest.spyOn(fs, 'copyFileSync').mockImplementation(() => {});
    setupPrettier();
    expect(fs.copyFileSync).toHaveBeenCalled();
});
