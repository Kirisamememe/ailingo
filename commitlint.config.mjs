export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "refactor", "docs", "chore", "style", "test"]],
    "subject-case": [0, "never"],
  },
};
