import eslint from '@eslint/js';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
    { ignores: ['*.d.ts', '**/coverage', '**/dist'] },
    {
        extends: [
            eslint.configs.recommended,
            ...typescriptEslint.configs.strict,
        ],
        files: ['**/*.{js,ts}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
            parserOptions: {
                parser: typescriptEslint.parser,
                ecmaFeatures: {
                    jsx: false,
                }
            },
        },
        rules: {
            'no-useless-escape': ['off'],
            'quotes': [2, 'single', { 'avoidEscape': true }],
            'keyword-spacing': ['error', {
                'before': true,
                'after': true,
                'overrides': {
                    'if': { 'after': false },
                    'while': { 'after': false },
                    'for': { 'after': false },
                }
            }],
            'indent': ['error', 4],
            'semi': [2, 'always'],
            'object-curly-spacing': ['error', 'always'],
            'space-before-blocks': ['error', 'always'],
        },
        // Add plugins section
        plugins: {
            '@typescript-eslint': typescriptEslint.plugin
        }
    },
);