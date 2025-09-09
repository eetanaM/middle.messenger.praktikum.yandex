import Block from "../../utils/Block";
import notFoundLogoSrc from "../../../images/logo/logo404.png"
import { MainLink } from "../../components/partials/MainLink";
import { TemplateRenderer } from "../../utils/TemplateRenderer";

export class NotFoundPage extends Block {
    constructor() {
        super({
            notFoundLogoSrc: notFoundLogoSrc,
            events: {},
            MainLink: new MainLink({
                href: "#",
                id: "test-id",
                text: TemplateRenderer.escapeHtml("Домой")
            })
        })
    }

    override render() {
        return `<div id=app>
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
        <div class="modal__overlay">
        </div>
        <div class="modal__content">
            
        </div> 
    </div>
    </div>`
    }
}