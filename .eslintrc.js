module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
    },
    env: {
      es6: true,
      node: true,
      browser: false, // Set to true if using in a browser environment
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
      'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
      'prettier/prettier': 'error', // Ensures code conforms to Prettier rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Allow unused variables that start with '_'
      '@typescript-eslint/no-explicit-any': 'off', // Set this to 'error' if you want to disallow 'any' type
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Set this to 'error' if you require return type annotations
    },
    ignorePatterns: ['node_modules/', 'dist/', 'build/'], // Ignore these directories
  };