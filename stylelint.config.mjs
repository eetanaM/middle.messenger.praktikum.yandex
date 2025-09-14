/** @type {import("stylelint").Config} */
export default {
  extends: ["stylelint-config-standard"],
  ignoreFiles: [
    "build/*"
  ],
  rules: {
    "selector-class-pattern": ""
  }
};
