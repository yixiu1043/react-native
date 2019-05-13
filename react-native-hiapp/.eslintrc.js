module.exports = {
	'env': {
		'browser': true,
		'es6': true,
		'node': true
	},
	'extends': 'airbnb',
	'parser': 'babel-eslint',
	'plugins': [
		'react',
		"jsx-a11y",
		"import"
	],
	'rules': {
		'import/prefer-default-export': 0,
		'no-console': 0,
		'import/no-unresolved': 0,
		'react/no-array-index-key': 0,
    'react/prop-types': 0,
    'global-require': 0,
    'prefer-promise-reject-errors': 0,
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 0,
    'linebreak-style': 0,
		'import/prefer-default-export': 0,
		
	},
	"parserOptions": {
		"ecmaFeatures": {
			"legacyDecotators": true
		}
	}
};