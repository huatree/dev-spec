module.exports = {
  extends: ['huatree/typescript/node', 'prettier'],
  plugins: ['simple-import-sort'],
  rules: {
    '@typescript-eslint/no-require-imports': 0,
    'no-console': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
};
