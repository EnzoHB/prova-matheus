module.exports = [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        require: 'readonly',
        module: 'writable',
        console: 'readonly',
        test: 'readonly',
        expect: 'readonly',
      },
    },
    rules: {
      eqeqeq: 'error',
      'no-unused-vars': 'error',
      camelcase: 'error',
    },
  },
  {
    ignores: ['node_modules/'],
  },
]
