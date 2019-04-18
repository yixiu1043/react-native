module.exports = {
  "parser": "babel-eslint",
  'extends': 'standard',
  'env': {
    "react-native/react-native": true
  },
  "plugins": [
    "react",
    "react-native"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "legacyDecorators": true
    }
  },
  'rules': {
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 2,
    "no-unused-vars": 0,
    'comma-dangle': 'off',
    'generator-star-spacing': 0,
    'no-new': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'semi': [2, 'never'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    "no-var": 2,
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    "prefer-const": [2, {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    "eqeqeq": 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  'globals': {
    "fetch": false
  }
}