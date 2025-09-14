/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard-less"],
  ignoreFiles: [
    "build/*"
  ],
  rules: {
    "selector-class-pattern": "",
    "at-rule-no-unknown": null,
  }
};
