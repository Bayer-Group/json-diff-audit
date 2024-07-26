module.exports = {
  env: {
    node: true,
  },
  extends: ["google", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "prettier/prettier": "error",
    "object-curly-newline": [
      "error",
      {
        consistent: true,
      },
    ],
    "eol-last": "off",
    "max-len": ["error", 300],
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "new-cap": [
      "error",
      {
        newIsCap: true,
        capIsNew: true,
      },
    ],
    semi: ["error", "never"],
    "no-unused-vars": ["error", { vars: "all", args: "after-used", varsIgnorePattern: "^_" }],
  },
  globals: {
    expect: true,
    jest: true,
    beforeAll: true,
    afterAll: true,
    describe: true,
  },
}
