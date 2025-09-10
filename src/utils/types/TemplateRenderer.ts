abstract class ITemplateRenderer {
    static renderTemplate: (container: HTMLElement, template:HandlebarsTemplateDelegate<any>, data?:unknown) => HTMLElement | HTMLTemplateElement;
    static escapeHtml: (unsafe: string | number) => string | number | void
}

export type {
    ITemplateRenderer,
}