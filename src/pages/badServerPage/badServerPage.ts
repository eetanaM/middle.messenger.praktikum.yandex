import Block from "../../utils/Block";
import notFoundLogoSrc from "../../../images/logo/logo404.png"
import { MainLink } from "../../components/partials/MainLink";
import { TemplateRenderer } from "../../utils/TemplateRenderer";

export default class BadServerPage extends Block {
    constructor() {
        super({
            notFoundLogoSrc: notFoundLogoSrc, 
            events: {},
            MainLink: new MainLink({
                href: "#",
                id: "#preview",
                textContent: TemplateRenderer.escapeHtml("Домой")
            })
        })
    }

    override render() {
        return `
        <div id="app">
            <main class="bad-server">
                <div class="bad-server__logo">
                    <img src={{ notFoundLogoSrc }} alt="logo">
                    <h1>Что-то с сервером. Чиним...</h1>
                </div>
                <div class="bad-server__500">
                    <h2>500</h2>
                    <p>Internal server error</p>
                </div>
                <nav>
                    {{{ MainLink }}}
                </nav>
            </main>
            <div id="modal">
                <div class="modal__overlay"></div>
                <div class="modal__content"></div> 
            </div>
        </div>
        `
    }
}