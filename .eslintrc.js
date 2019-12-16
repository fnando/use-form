module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    module: true,
  },
  extends: [
    "@fnando/codestyle/javascript",
    "@fnando/codestyle/react",
    "@fnando/codestyle/typescript",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "react/jsx-props-no-spreading": "off",
  },
};
