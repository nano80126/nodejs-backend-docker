module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint/eslint-plugin'],
	// extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		tsconfigRootDir: __dirname,
	},
	root: true,
	env: {
		node: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'max-len': ['error', { code: 120, tabWidth: 4, ignoreComments: true }],
		// '@typescript-eslint/interface-name-prefix': 'off',
		// '@typescript-eslint/explicit-function-return-type': 'off',
		// '@typescript-eslint/explicit-module-boundary-types': 'off',
		// '@typescript-eslint/no-explicit-any': 'off',
	},
};
