module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		// extends two more configuration from "import" plugin
		'plugin:import/recommended',
		'plugin:import/typescript',
	],
	plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'import'],
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
		'max-len': ['error', { code: 150, tabWidth: 4, ignoreComments: true }],
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'internal', 'sibling', 'parent', 'index', 'unknown'],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
			},
		],
		'sort-imports': [
			'error',
			{
				ignoreCase: true,
				ignoreDeclarationSort: true,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
				allowSeparatedGroups: false,
			},
		],
		'linebreak-style': 0,
	},
	settings: {
		'import/resolver': {
			typescript: {
				project: './tsconfig.json',
			},
			node: true,
		},
	},
};
