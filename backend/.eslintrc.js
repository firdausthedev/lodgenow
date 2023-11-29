module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["@typescript-eslint","import","prettier"],
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-empty-function": 0
  },
  "parser": "@typescript-eslint/parser",
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      },
      "typescript": {
        "alwaysTryTypes": true
      }
    }
  }
};
