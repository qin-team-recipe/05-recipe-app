/** @type {import('prettier').Config} */
module.exports = {
  // prettier
  printWidth: 80,
  singleQuote: false,
  semi: false,
  trailingComma: "all",
  arrowParens: "always",

  // @ianvs/prettier-plugin-sort-imports
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/components/(.*)$",
    "^@/app/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.1.3",
}
