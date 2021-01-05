module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/html-self-closing': 0,
    'vue/html-closing-bracket-spacing': 0,
    'vue/html-closing-bracket-newline': 0,
    'space-before-function-paren': 0,
    'no-console': 0,
    'arrow-parens': 0,
  },
}
