module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  plugins: ['jest'],
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': [
      'error',
      {
        js: 'ignorePackages',
      },
    ],
    'import/no-unresolved': 'off',
    'max-len': [
      'error',
      {
        code: 100,
      },
    ],
  },
};
