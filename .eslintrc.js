module.exports = {
  parser: '@babel/eslint-parser', // Default parser for JavaScript files
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
  ],
  plugins: ['prettier'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    requireConfigFile: false, // For @babel/eslint-parser to work without a Babel config file
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'warn',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Targeting TypeScript files
      parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
      ],
      plugins: ['@typescript-eslint', 'prettier'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ],
        // You can override/add specific rules for TypeScript files here
      },
    },
  ],
};
