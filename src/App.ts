import Handlebars from "handlebars";

import * as Pages from "./pages/index.ts";

import * as MOCK from "./mocks/mockData.ts"
import * as ENV from "./utils/constants/consts.ts"
import { TemplateRenderer } from "./utils/TemplateRenderer.ts"

import type { IApp, IAppState, IModalTemplateData } from "./utils/types/App.ts";

import Button from "./components/partials/Button.ts";
import MainLink from "./components/partials/MainLink.ts";
import FormInput from "./components/partials/FormInput.ts";
import FileInput from "./components/partials/FileInput.ts"
import AuthForm from "./components/partials/AuthForm.ts";
import ChatItem from "./components/partials/ChatItem.ts";
import CredentialsForm from "./components/partials/CredentialsForm.ts";
import { NotFoundPage } from "./pages/notFoundPage/notFoundPage.ts";

Handlebars.registerPartial("Button", Button)
Handlebars.registerPartial("MainLink", MainLink)
Handlebars.registerPartial("FormInput", FormInput)
Handlebars.registerPartial("FileInput", FileInput)
Handlebars.registerPartial("AuthForm", AuthForm)
Handlebars.registerPartial("ChatItem", ChatItem)
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

    render() {
        let template: HandlebarsTemplateDelegate<any>;
        let templateData;

        if (this.state.currentPage === ENV.PAGES.PREVIEW_PAGE) {
            template = Handlebars.compile(Pages.PreviewPage);
            templateData = MOCK.PREVIEW_TEMPLATE_DATA;
            TemplateRenderer.renderTemplate(template, this.appElement, templateData);
            this.attachEventListeners();
        } else if (this.state.currentPage === ENV.PAGES.LOGIN_PAGE) {
            template = Handlebars.compile(Pages.LoginPage);
            templateData = MOCK.LOGIN_TEMPLATE_DATA;
            TemplateRenderer.renderTemplate(template, this.appElement, templateData);
            this.attachEventListeners();
        } else if (this.state.currentPage === ENV.PAGES.REGISTER_PAGE) {
            template = Handlebars.compile(Pages.RegisterPage);
            templateData = MOCK.REGISTER_TEMPLATE_DATA;
            TemplateRenderer.renderTemplate(template, this.appElement, templateData);
            this.attachEventListeners();
        } else if (this.state.currentPage === ENV.PAGES.MAIN_CONTENT_PAGE) {
            template = Handlebars.compile(Pages.MainContentPage);
            templateData = MOCK.MAIN_CONTENT_TEMPLATE_DATA;
            TemplateRenderer.renderTemplate(template, this.appElement, templateData);
            this.attachEventListeners();
        } else if (this.state.currentPage === ENV.PAGES.PROFILE_PAGE) {
            template = Handlebars.compile(Pages.ProfilePage);
            templateData = MOCK.PROFILE_TEMPLATE_DATA;
            TemplateRenderer.renderTemplate(template, this.appElement, templateData);
            this.attachEventListeners();
        } else if (this.state.currentPage === ENV.PAGES.BAD_SERVER_PAGE) {
            template = Handlebars.compile(Pages.BadServerPage);
            templateData = MOCK.BAD_SERVER_TEMPLATE_DATA;
            TemplateRenderer.renderTemplate(template, this.appElement, templateData);
            this.attachEventListeners();
        } else {
            const notFoundPage = new NotFoundPage();
            if (this.appElement) {
                this.appElement.firstElementChild?.replaceWith(notFoundPage.getContent())
            }
        }
    }

    renderChatDetails(currentChatItemId?: string | null) {
        if (this.state.currentPage !== ENV.PAGES.MAIN_CONTENT_PAGE) {
            return
        } else {
            const chatDetailsData = {
                currentChatItemId,
                ...MOCK.CHAT_DETAILS_TEMPLATE_DATA
            }
            const mainContentNode = document.querySelector(".chat") as HTMLElement;
            const chatDetailsTemplate = Handlebars.compile(Pages.ChatDetails);

            TemplateRenderer.renderTemplate(chatDetailsTemplate, mainContentNode, chatDetailsData)
        }
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
    
            TemplateRenderer.renderTemplate(modalTemplate, modalContentEl, modalTemplateData);
        
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
        } else if (this.state.currentPage === ENV.PAGES.LOGIN_PAGE) {
            const homeLink = document.querySelector("#preview");
            const submitButton = document.querySelector("#login-button");

            if (!homeLink) {
                throw new Error("There is no #preview element in DOM")
            }

            if (!submitButton) {
                throw new Error("There is no #login-button element in DOM")
            }
    
            // Attaching event listener to go back to preview page. Temporary
            const pageSrc = ENV.PAGES.PREVIEW_PAGE
            homeLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.changePage(pageSrc)
            })

            // Temporary attaching event listener to show incorrect inputs
            submitButton.addEventListener("click", (e) => {
                e.preventDefault();
                const incorrectInputs = document.querySelectorAll(".app__invalid-input");
                incorrectInputs.forEach((node) => {
                    node.setAttribute("class", "app__invalid-input shown")
                })
            })

        } else if (this.state.currentPage === ENV.PAGES.REGISTER_PAGE) {
            const homeLink = document.querySelector("#preview");
            const submitButton = document.querySelector("#register-button");

            if (!homeLink) {
                throw new Error("There is no #preview element in DOM")
            }

            if (!submitButton) {
                throw new Error("There is no #register-button element in DOM")
            }

            // Attaching event listener to go back to preview page. Temporary
            const pageSrc = ENV.PAGES.PREVIEW_PAGE
            homeLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.changePage(pageSrc)
            })

            // Temporary attaching event listener to show incorrect inputs
            submitButton.addEventListener("click", (e) => {
                e.preventDefault();
                const incorrectInputs = document.querySelectorAll(".app__invalid-input");
                incorrectInputs.forEach((node) => {
                    node.setAttribute("class", "app__invalid-input shown")
                })
            })
        } else if (this.state.currentPage === ENV.PAGES.MAIN_CONTENT_PAGE) {
            const homeLink = document.querySelector("#preview");
            if (!homeLink) {
                throw new Error("There is no #preview element in DOM")
            }
            const chatItems = document.querySelectorAll(".chat-item")
            const baseClass = "chat-item"

            // Attaching event listener to go back to preview page. Temporary
            const pageSrc = ENV.PAGES.PREVIEW_PAGE

            chatItems.forEach((node) => {
                node.addEventListener("click", (e) => {
                    e.preventDefault();
                    let id = node.getAttribute("id");
                    chatItems.forEach((node) => {
                        node.setAttribute("class", baseClass)
                    })
                    node.setAttribute("class", baseClass + " active")
                    this.state.currentChatItemId = id;
                    this.renderChatDetails(this.state.currentChatItemId);
                })
            })

            homeLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.state.currentChatItemId = null;
                this.changePage(pageSrc)
            })

        } else if (this.state.currentPage === ENV.PAGES.PROFILE_PAGE) {
            const homeLink = document.querySelector("#preview");
            if (!homeLink) {
                throw new Error("There is no #preview element in DOM")
            }
            const changeCredsButton = document.querySelector("#change-credentials");
            const changePasswordButton = document.querySelector("#change-password")
            const pageSrc = ENV.PAGES.PREVIEW_PAGE;

            if (!changeCredsButton) {
                throw new Error("There is no #change-credentials element in DOM")
            }

            if (!changePasswordButton) {
                throw new Error("There is no #change-password element in DOM")
            }

            homeLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.state.currentChatItemId = null;
                this.changePage(pageSrc)
            })

            changeCredsButton.addEventListener("click", () => {
                this.toggleModal({
                    fileInputs: [
                        { type: "file", name: "avatar", id: "avatar", src: MOCK.PROFILE_TEMPLATE_DATA.profileImg},
                    ],
                    inputs: [
                        
                        { type: "email", name: "email", placeholder: "Email"},
                        { type: "login", name: "login", placeholder: "Логин"},
                        { type: "text", name: "first_name", placeholder: "Имя"},
                        { type: "text", name: "second_name", placeholder: "Фамилия"},
                        { type: "text", name: "display_name", placeholder: "Имя в чате"},
                        { type: "tel", name: "phone", placeholder: "Телефон"},
                    ],
                    button: [
                        { id: "confirm", type:"submit", textContent: TemplateRenderer.escapeHtml("Подтвердить")},
                        { id: "reset", type:"reset", textContent: TemplateRenderer.escapeHtml("Отменить")},
                    ]
                });

                const resetFormButton = document.querySelector("#reset");

                if (!resetFormButton) {
                    throw new Error("There is no #reset element in DOM")
                }

                resetFormButton.addEventListener("click", this.toggleModal)
            })

            changePasswordButton.addEventListener("click", () => {
                this.toggleModal({
                    inputs: [
                        { type: "password", name: "oldPassword", placeholder: "Старый пароль"},
                        { type: "password", name: "newPassword", placeholder: "Новый пароль"},
                    ],
                    button: [
                        { id: "confirm", type:"submit", textContent: TemplateRenderer.escapeHtml("Подтвердить")},
                        { id: "reset", type:"reset", textContent: TemplateRenderer.escapeHtml("Отменить")},
                    ]
                });
                const resetFormButton = document.querySelector("#reset");
                
                if (!resetFormButton) {
                    throw new Error("There is no #reset element in DOM")
                }

                resetFormButton.addEventListener("click", this.toggleModal)
            })

        } else if (this.state.currentPage === ENV.PAGES.NOT_FOUND_PAGE) {
            const homeLink = document.querySelector("#preview");
            if (!homeLink) {
                throw new Error("There is no #preview element in DOM")
            }
            const pageSrc = ENV.PAGES.PREVIEW_PAGE;
            homeLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.state.currentChatItemId = null;
                this.changePage(pageSrc)
            })

        } else if (this.state.currentPage === ENV.PAGES.BAD_SERVER_PAGE) {
            const homeLink = document.querySelector("#preview");
            if (!homeLink) {
                throw new Error("There is no #preview element in DOM")
            }
            const pageSrc = ENV.PAGES.PREVIEW_PAGE;
            homeLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.state.currentChatItemId = null;
                this.changePage(pageSrc)
            })
        }
    }

    changePage(page: string) {
        this.state.currentPage = page;
        this.render();
        this.renderChatDetails(this.state.currentChatItemId);
    }
}

