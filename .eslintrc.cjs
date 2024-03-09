/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	'extends': [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
	],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	plugins: [
		'@stylistic',
	],
	rules: {
		'@stylistic/semi': 'error',
		'@stylistic/indent': [1, 'tab'],

		'@typescript-eslint/no-unused-vars': [1, {
			'argsIgnorePattern': '^_',
			'caughtErrorsIgnorePattern': '^_',
			'destructuredArrayIgnorePattern': '^_',
			'varsIgnorePattern': '^_',
		}],
		'no-unused-vars': [1, {
			'argsIgnorePattern': '^_',
			'caughtErrorsIgnorePattern': '^_',
			'destructuredArrayIgnorePattern': '^_',
			'varsIgnorePattern': '^_',
		}],
	},
};
