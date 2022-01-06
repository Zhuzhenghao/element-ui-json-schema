module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential"],
  globals: {
    _: true,
  },
  rules: {
    // https://eslint.org/docs/rules/no-unused-expressions
    "no-unused-expressions": [
      "off",
      { allowShortCircuit: true, allowTernary: true },
    ],
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // https://eslint.org/docs/rules/arrow-parens
    "arrow-parens": ["warn", "as-needed"],
    // https://eslint.org/docs/rules/arrow-body-style
    "arrow-body-style": ["off", "as-needed"],
    // https://eslint.org/docs/rules/arrow-spacing
    "arrow-spacing": "error",
    // https://eslint.org/docs/rules/class-methods-use-this
    "class-methods-use-this": ["off"],
    // https://eslint.org/docs/rules/no-mixed-operators#allowsameprecedence
    "no-mixed-operators": ["off", { allowSamePrecedence: false }],
    // https://eslint.org/docs/rules/no-param-reassign
    "no-param-reassign": ["off"],
    // https://eslint.org/docs/rules/no-console
    "no-console": ["warn", { allow: ["warn", "error", "log"] }],
    "linebreak-style": "off",

    // vue lint
    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/html-self-closing.md
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
          component: "never",
        },
        svg: "any",
        math: "always",
      },
    ],
    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/max-attributes-per-line.md
    "vue/max-attributes-per-line": [
      0,
      {
        singleline: 2,
        multiline: {
          max: 1,
          allowFirstLine: true,
        },
      },
    ],
    "object-curly-newline": ["off"],
    "function-paren-newline": ["off"],
    camelcase: ["off"],
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
