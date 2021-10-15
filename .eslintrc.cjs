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
  },
};
