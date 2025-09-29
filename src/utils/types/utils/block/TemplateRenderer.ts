abstract class ITemplateRenderer {
  static renderTemplate: (container: HTMLElement, template:HandlebarsTemplateDelegate<unknown>, data?:unknown) => HTMLElement;

  static escapeHtml: (unsafe: string | number) => string | number | void;
}

export type {
  ITemplateRenderer,
};
