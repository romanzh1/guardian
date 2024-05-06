/* 
Процесс создания этого конфига:
1. Разворачиваем пустое приложение на базе Create React App v5.0.0.
   npx create-react-app@5.0.0 app-name --template redux-typescript
   в create-react-app присутствует eslint 8.8.0
2. Согласно доке с https://eslint.org/ создаем конфиг.
   npm init @eslint/config
   В процессе отвечаем на вопросы о том что используем react, typescript и style guid от airbnb.
   Ответы:
   - To check syntax,find problems, and enforce code style
   - JavaScript modules (import/export)
   - React
   - Yes (Does your project use TypeScript?)
   - Browser
   - Use a popular style guide
   - Airbnb
   - JavaScript
   - Yes(Would you like to install them now with npm?)
3. Переносим из package.json настройки eslint в .eslintrc.js
   Удаляем в package.json объект "eslintConfig"
   Добавляем в .eslintrc.js eslint-config-react
   " extends: [
    'react-app', 
     ...
    ]"
4. Согласно доке https://prettier.io/ ставим Prettier 2.5.1, плагин,конфиг для интеграции prettier с eslint.
   npm install --save-dev --save-exact prettier
   npm install --save-dev eslint-plugin-prettier
   npm install --save-dev eslint-config-prettier
   Добавляем eslint-config-prettier в .eslintrc.js (обязательно идет последним в "extends" что бы затереть предыдущие настройки)
   "{
    "extends": [
      ...
      "plugin:prettier/recommended"]
    }"
5. Ставим typescript resolver
   npm i eslint-import-resolver-typescript
   Добавляем в .eslintrc.js
   "settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },"
6. Добавляем собственные недостающие правила eslint
7. Добавляем собственные недостающие правила prettier
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'react-app', // перенесен из package.json. это базовые настройки линтера из create-react-app
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended', // обязательно последним идет что бы затереть пред идущие конфиги
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'unused-imports'],
  rules: {
    'import/extensions': ['error', 'always', { ts: 'never', tsx: 'never' }], // отключает расширения в импортах
    'import/prefer-default-export': 'off', // требует экспорт по дефолту
    'import/no-extraneous-dependencies': 'off', // хочет что бы все используемые пакеты были из dependencies (не дает использовать reselect т.к он часть redux-toolkit)
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }], // по умолчанию jsx лежит в .js или .jsx
    'react/function-component-definition': [
      'warn',
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ], //  что бы задать один тип объявления функциональных компонентов
    'react/destructuring-assignment': 'off', // принуждает делать деструктуризацию в компонентах, выглядит полезной.
    'no-unused-vars': 'off', // обязательно отключить что бы работало правило '@typescript-eslint/no-unused-vars'(версия под typescript)
    'react/jsx-sort-props': 'error', // сортировка пропсов
    'react/no-unused-prop-types': 'error', // неспользуемые пропсы
    'react/require-default-props': 'off', // требует дефолтные пропсы для компонентов react. выглядит полезной но как использовать с typescript не понятно.
    'react/react-in-jsx-scope': 'off',
    'no-restricted-exports': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'class-methods-use-this': 'off', // если внутри метода класса нет this заставляет метод переделать в static
    'no-shadow': 'off', // обязательно отключить что бы работало правило '@typescript-eslint/no-shadow'(версия под typescript)
    '@typescript-eslint/no-shadow': 'error', // полезная штука, следит за тем что бы не было повторного объявления переменной в одной области видимости
    'unused-imports/no-unused-imports': 'warn', // неиспользуемые импорты
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
