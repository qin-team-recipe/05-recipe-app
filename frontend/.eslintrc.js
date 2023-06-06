module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  settings: {
    tailwindcss: {
      groupByResponsive: true,
    },
    react: {
      version: "detect",
    },
  },
  extends: [
    "next/core-web-vitals",
    "next",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
  plugins: [
    "react",
    "@typescript-eslint",
    "import",
    "unused-imports",
    "sort-destructure-keys",
    "sort-keys-custom-order",
    "tailwindcss",
    "import-access",
  ],
  rules: {
    "no-console": [
      "error",
      {
        allow: ["warn", "info", "error"],
      },
    ],
    // コールバック関数に必ずreturnを書く
    "prefer-arrow-callback": "error",
    // functionを無効
    "func-style": ["error", "expression"],
    // () => {} を必須
    "arrow-body-style": ["error", "always"],
    "no-var": "error",
    "sort-destructure-keys/sort-destructure-keys": 2,
    "unused-imports/no-unused-imports": "error",
    // オブジェクトのキーをソートする
    "sort-keys-custom-order/object-keys": [
      "error",
      {
        orderedKeys: ["id"],
      },
    ],
    "sort-keys-custom-order/type-keys": [
      "error",
      {
        orderedKeys: ["id"],
      },
    ],
    // export defaultを禁止
    "import/no-default-export": "error",
    "import-access/jsdoc": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "react/jsx-handler-names": [
      "error",
      {
        eventHandlerPrefix: "handle",
        eventHandlerPropPrefix: "on",
        checkLocalVariables: false,
        checkInlineFunction: true,
      },
    ],
    "react/destructuring-assignment": ["error", "always"],
    "react/prop-types": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: ["typeAlias", "typeParameter"],
        format: ["PascalCase"],
      },
      {
        selector: ["classProperty", "method"],
        format: ["camelCase"],
      },
      {
        selector: "variable",
        types: ["boolean"],
        format: ["PascalCase"],
        prefix: ["is", "has", "should"],
      },
    ],
  },
  overrides: [
    {
      files: ["src/**/page.tsx", "src/**/layout.tsx", "src/**/loading.tsx", "src/**/error.tsx"],
      rules: { "import/no-default-export": "off" },
    },
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        // "no-undef": "always",
        "no-undef": "off",
      },
    },
  ],
  ignorePatterns: ["node_modules", ".next", "out", ".eslintrc.js"],
}
