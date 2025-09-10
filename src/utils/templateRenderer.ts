import type { ITemplateRenderer } from "./types/TemplateRenderer";

export class TemplateRenderer implements ITemplateRenderer {
    static renderTemplate(template:HandlebarsTemplateDelegate<any>, container?: HTMLElement, data?:unknown) {
        const htmlString = template(data);
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        
        const fragment = document.createDocumentFragment();
        
        Array.from(doc.body.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.textContent) {
                    fragment.appendChild(document.createTextNode(node.textContent));
                }
            } else {
            fragment.appendChild(node.cloneNode(true));
            }
        });
        
        if (container) {
            container.innerHTML = "";
            container.appendChild(fragment);
            return container
        } else {
            return fragment
        }
    }

    static escapeHtml(unsafe: string | number) {
        if (typeof unsafe !== "string") {
            return unsafe
        } else {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
    }
}

