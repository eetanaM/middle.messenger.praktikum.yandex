export class TemplateRenderer {
    static renderTemplate(container, template, data) {
        const htmlString = template(data);
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        
        const fragment = document.createDocumentFragment();
        
        Array.from(doc.body.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
            fragment.appendChild(document.createTextNode(node.textContent));
            } else {
            fragment.appendChild(node.cloneNode(true));
            }
        });
        
        container.innerHTML = "";
        container.appendChild(fragment);
        return container
    }

    static escapeHtml(unsafe) {
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