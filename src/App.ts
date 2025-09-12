import Handlebars from "handlebars";
import { TemplateRenderer } from "./utils/TemplateRenderer.ts"

import CredentialsForm from "./components/blocks/CredentialsForm.ts";

import * as Pages from "./pages/index.ts";

import * as MOCK from "./mocks/mockData.ts"
import * as ENV from "./utils/constants/consts.ts"

import type { IApp, IAppState, IModalTemplateData } from "./utils/types/App.ts";
import type { IBlock } from "./utils/types/Block.ts";

// Хелпер для создания заглушек для элементов массива
// В шаблоне вызывается как {{{ blockList "Имя массива"}}}
Handlebars.registerHelper('blockList', function(listName, context) {
    const items = context.data.root[listName];
    if (!Array.isArray(items)) return '';
    
    return items.map((item) => {
        return `<div data-id="list-${listName}-${item._id}"></div>`;
    }).join('');
});

Handlebars.registerPartial("CredentialsForm", CredentialsForm)

export default class App implements IApp {
    state: IAppState;
    appElement: HTMLElement;

    constructor() {
        this.state = {
            currentPage: ENV.PAGES.PREVIEW_PAGE,
            // currentChatItemId - временно для псевдонавигации по чатам
            currentChatItemId: null,
            accessToken: null,
            refreshToken: null,
        }
        const appEl = document.getElementById("app");

        if (!appEl) {
            throw new Error("There is no app element in DOM")
        }

        this.appElement = appEl;
    }

    protected _replaceContent(page: IBlock) {
        if (this.appElement.firstElementChild) {
                this.appElement.firstElementChild.replaceWith(page.getContent())
            } else {
                this.appElement.appendChild(page.getContent())
        }
    }

    render() {
        let template: HandlebarsTemplateDelegate<any>;
        let templateData;
        let page;

        if (this.state.currentPage === ENV.PAGES.PREVIEW_PAGE) {
            template = Handlebars.compile(Pages.PreviewPage);
            templateData = MOCK.PREVIEW_TEMPLATE_DATA;
            TemplateRenderer.renderTemplate(template, templateData, this.appElement);
            this.attachEventListeners();
            return
        } else if (this.state.currentPage === ENV.PAGES.LOGIN_PAGE) {
            page = new Pages.LoginPage({
                appEl: this.app
            });
        } else if (this.state.currentPage === ENV.PAGES.REGISTER_PAGE) {
            page = new Pages.RegisterPage({
                appEl: this.app
            });
        } else if (this.state.currentPage === ENV.PAGES.MAIN_CONTENT_PAGE) {
            page = new Pages.MainContentPage({
                appEl: this.app
            })
        } else if (this.state.currentPage === ENV.PAGES.PROFILE_PAGE) {
            page = new Pages.ProfilePage({
                appEl: this.app
            });
        } else if (this.state.currentPage === ENV.PAGES.BAD_SERVER_PAGE) {
            page = new Pages.BadServerPage({
                appEl: this.app
            });
        } else {
            page = new Pages.NotFoundPage({
                appEl: this.app
            });
        }

        this._replaceContent(page)
    }

    toggleModal(modalTemplateData: Event | IModalTemplateData) {
        const modalContentEl = document.querySelector(".modal__content") as HTMLElement;
        const modalRoot = document.getElementById("modal");

        if (!modalRoot) {
            throw new Error("There is no modal root element in DOM")
        }

        if (modalContentEl.childElementCount !== 0) {
            modalContentEl.innerHTML = "";
            modalRoot.removeAttribute("class");
        } else {
            let modalTemplate = Handlebars.compile(CredentialsForm);
            const modalOverlay = document.querySelector(".modal__overlay");
    
            TemplateRenderer.renderTemplate(modalTemplate, modalTemplateData, modalContentEl);
        
            modalRoot.setAttribute("class", "opened")
            if (!modalOverlay) {
                throw new Error ("There is no modal__overlay element in DOM")
            }
            modalOverlay.addEventListener("click", this.toggleModal)
        }
    }

    attachEventListeners() {
        const links = document.querySelectorAll(".preview-page__links li a") as NodeListOf<HTMLElement>

        if (this.state.currentPage === ENV.PAGES.PREVIEW_PAGE) {
            // Attaching event listeners on links for changing pages and rerender
            links.forEach((node) => {
                if (node.dataset.pagesrc) {
                    const pageSrc = node.dataset.pagesrc
                    node.addEventListener("click", (e) => {
                        e.preventDefault();
                        this.changePage(pageSrc)
                    })
                }
            })
        }
    }

    get app() {
        return this
    }

    changePage(page: string) {
        console.log(page)
        console.log(this)
        this.state.currentPage = page;
        console.log(this.state.currentPage)
        this.render();
    }
}

