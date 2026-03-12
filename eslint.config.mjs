import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
    {
        ignores: ['node_modules/**', 'dist/**'],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'error',
            'no-console': 'warn',
            'no-plusplus': 'error',
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'ForOfStatement',
                    message: 'Use standard for loop instead of for...of',
                },
                {
                    selector: "CallExpression[callee.property.name='forEach']",
                    message: 'Use standard for loop instead of forEach',
                },
                {
                    selector: "CallExpression[callee.property.name='map']",
                    message: 'Use array or object iteration instead of map',
                },
                {
                    selector: "CallExpression[callee.property.name='set']",
                    message: 'Use array or object iteration instead of set',
                },
                {
                    selector: "NewExpression[callee.name='Map']",
                    message: 'Use plain object instead of Map',
                },
                {
                    selector: "NewExpression[callee.name='Set']",
                    message: 'Use array instead of Set',
                },
            ],
            'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
            'padding-line-between-statements': [
                'error',
                {
                    blankLine: 'always',
                    prev: 'block-like',
                    next: '*',
                },
                {
                    blankLine: 'always',
                    prev: '*',
                    next: 'block-like',
                },
            ],
        },
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig,
];
