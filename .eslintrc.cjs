/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks", "@stylistic"],
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-console": 2,
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/explicit-function-return-type": 2,
    curly: [2, "all"],
    "no-plusplus": [2, { allowForLoopAfterthoughts: true }],
    complexity: [1, 20],
    "@typescript-eslint/promise-function-async": 2,
    "@stylistic/quotes": [2, "double"],
    "@stylistic/max-len": [1, { code: 100, ignoreUrls: true }],
    "@stylistic/no-tabs": 1,
    "@stylistic/linebreak-style": [1, "unix"],
    "@stylistic/jsx-quotes": [1, "prefer-double"],
    "react/require-default-props": 0,
  },
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
