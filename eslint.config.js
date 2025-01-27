// eslint.config.js

import globals from "globals";

export default [
	{
		files: ["**/*.test.js"], // Apply only to test files
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "module",
			globals: {
				...globals.node,
				...globals.jest,
			},
		},
		plugins: {
			jest: {
				recommended: true,
			},
		},
	},
];
