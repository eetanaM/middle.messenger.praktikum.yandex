export class TemplateRenderer {
    static renderTemplate(container, template, data) {
        const fragment = document.createDocumentFragment();
        const tempDiv = document.createElement("div");

        tempDiv.innerHTML = template(data);

        while (tempDiv.firstChild) {
            fragment.appendChild(tempDiv.firstChild)
        }

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