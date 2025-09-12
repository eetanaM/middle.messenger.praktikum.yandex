import Block from "../../utils/Block";
import { TemplateRenderer } from "../../utils/TemplateRenderer";

import { MainLink } from "../../components/partials/";

import notFoundLogoSrc from "../../../images/logo/logo404.png";

export default class NotFoundPage extends Block {
    constructor() {
        super({
            notFoundLogoSrc: notFoundLogoSrc,
            events: {},
            MainLink: new MainLink({
                href: "#",
                id: "preview",
                textContent: TemplateRenderer.escapeHtml("Домой")
            })
        })
    }

    override render() {
        return `<div id="app">
                    <main class="not-found">
                        <div class="not-found__logo">
                            <img src={{ notFoundLogoSrc }} alt="logo">
                            <h1>Упс, кажется Вы сбились с курса...</h1>
                        </div>
                        <div class="not-found__404">
                            <h2>404</h2>
                            <p>Page not found</p>
                        </div>
                        <nav>
                            {{{ MainLink }}}
                        </nav>
                        </main>
                    <div id="modal">
                        <div class="modal__overlay"></div>
                        <div class="modal__content"></div> 
                    </div>
                </div>`
    }
}

