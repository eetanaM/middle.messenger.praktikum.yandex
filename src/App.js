import Handlebars from "handlebars";

import * as Pages from "./pages";

import * as ENV from "./utils/constants/consts.js"
import * as MOCK from "./mocks/mockData.js"
import { TemplateRenderer } from "./utils/templateRenderer.js"

import Button from "./components/partials/Button.js";
import MainLink from "./components/partials/MainLink.js";
import FormInput from "./components/partials/FormInput.js";
import FileInput from "./components/partials/FileInput.js"
import AuthForm from "./components/partials/AuthForm.js";
import ChatItem from "./components/partials/ChatItem.js";
import CredentialsForm from "./components/partials/CredentialsForm.js";

Handlebars.registerPartial("Button", Button)
Handlebars.registerPartial("MainLink", MainLink)
Handlebars.registerPartial("FormInput", FormInput)
Handlebars.registerPartial("FileInput", FileInput)
Handlebars.registerPartial("AuthForm", AuthForm)
Handlebars.registerPartial("ChatItem", ChatItem)
Handlebars.registerPartial("CredentialsForm", CredentialsForm)

export default class App {
    constructor() {
        this.state = {
            currentPage: ENV.PAGES.PREVIEW_PAGE,
            // currentChatItemId - временно для псевдонавигации по чатам
            currentChatItemId: null,
            accessToken: "",
            refreshToken: "",
        }
        this.appElement = document.getElementById("app")
    }

    render() {
        let template;
        let templateData;

        if (this.state.currentPage === ENV.PAGES.PREVIEW_PAGE) {
            template = Handlebars.compile(Pages.PreviewPage);
            templateData = MOCK.PREVIEW_TEMPLATE_DATA;
        } else if (this.state.currentPage === ENV.PAGES.LOGIN_PAGE) {
            template = Handlebars.compile(Pages.LoginPage);
            templateData = MOCK.LOGIN_TEMPLATE_DATA;
        } else if (this.state.currentPage === ENV.PAGES.REGISTER_PAGE) {
            template = Handlebars.compile(Pages.RegisterPage);
            templateData = MOCK.REGISTER_TEMPLATE_DATA;
        } else if (this.state.currentPage === ENV.PAGES.MAIN_CONTENT_PAGE) {
            template = Handlebars.compile(Pages.MainContentPage);
            templateData = MOCK.MAIN_CONTENT_TEMPLATE_DATA;
        } else if (this.state.currentPage === ENV.PAGES.PROFILE_PAGE) {
            template = Handlebars.compile(Pages.ProfilePage);
            templateData = MOCK.PROFILE_TEMPLATE_DATA;
        } else if (this.state.currentPage === ENV.PAGES.BAD_SERVER_PAGE) {
            template = Handlebars.compile(Pages.BadServerPage);
            templateData = MOCK.BAD_SERVER_TEMPLATE_DATA;
        } else if (this.state.currentPage === ENV.PAGES.NOT_FOUND_PAGE) {
            template = Handlebars.compile(Pages.NotFoundPage);
            templateData = MOCK.NOT_FOUND_TEMPLATE_DATA;
        }

        TemplateRenderer.renderTemplate(this.appElement, template, templateData);
        this.attachEventListeners();
    }

    renderChatDetails(currentChatItemId) {
        if (this.state.currentPage !== ENV.PAGES.MAIN_CONTENT_PAGE) {
            return
        } else {
            const chatDetailsData = {
                currentChatItemId,
                ...MOCK.CHAT_DETAILS_TEMPLATE_DATA
            }
            const mainContentNode = document.querySelector(".chat");
            const chatDetailsTemplate = Handlebars.compile(Pages.ChatDetails);

            TemplateRenderer.renderTemplate(mainContentNode, chatDetailsTemplate, chatDetailsData)
        }
    }

    toggleModal(modalTemplateData) {
        const modalContentEl = document.querySelector(".modal__content");
        const modalRoot = document.getElementById("modal");

        if (modalContentEl.childElementCount !== 0) {
            modalContentEl.innerHTML = "";
            modalRoot.removeAttribute("class");
        } else {
            let modalTemplate = Handlebars.compile(CredentialsForm);
            const modalOverlay = document.querySelector(".modal__overlay");
    
            TemplateRenderer.renderTemplate(modalContentEl, modalTemplate, modalTemplateData);
        
            modalRoot.setAttribute("class", "opened")
            modalOverlay.addEventListener("click", this.toggleModal)
        }
    }

    attachEventListeners() {
        if (this.state.currentPage === ENV.PAGES.PREVIEW_PAGE) {
            const links = document.querySelectorAll(".preview-page__links li a")
            // Attaching event listeners on links for changing pages and rerender
            links.forEach((node) => {
                const pageSrc = node.dataset.pagesrc
                node.addEventListener("click", (e) => {
                    e.preventDefault();
                    this.changePage(pageSrc)
                })
            })
        } else if (this.state.currentPage === ENV.PAGES.LOGIN_PAGE) {
            const homeLink = document.querySelector("#preview")
    
            // Attaching event listener to go back to preview page. Temporary
            const pageSrc = ENV.PAGES.PREVIEW_PAGE
            homeLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.changePage(pageSrc)
            })
        } else if (this.state.currentPage === ENV.PAGES.REGISTER_PAGE) {
            const homeLink = document.querySelector("#preview")
    
            // Attaching event listener to go back to preview page. Temporary
            const pageSrc = ENV.PAGES.PREVIEW_PAGE
            homeLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.changePage(pageSrc)
            })
        }
         else if (this.state.currentPage === ENV.PAGES.MAIN_CONTENT_PAGE) {
            const homeLink = document.querySelector("#preview")
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
            const homeLink = document.querySelector(".profile > .app__nav-button");
            const changeCredsButton = document.querySelector("#change-credentials");
            const changePasswordButton = document.querySelector("#change-password")
            const pageSrc = ENV.PAGES.PREVIEW_PAGE;

            homeLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.state.currentChatItemId = null;
                this.changePage(pageSrc)
            })

            changeCredsButton.addEventListener("click", () => {
                this.toggleModal({
                    fileInputs: [
                        { type: "file", name: "display_image", id: "display_image", src: MOCK.PROFILE_TEMPLATE_DATA.profileImg},
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
                resetFormButton.addEventListener("click", this.toggleModal)
            })

        } else if (this.state.currentPage === ENV.PAGES.NOT_FOUND_PAGE) {
            const homeLink = document.querySelector("#preview");
            const pageSrc = ENV.PAGES.PREVIEW_PAGE;
            homeLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.state.currentChatItemId = null;
                this.changePage(pageSrc)
            })

        } else if (this.state.currentPage === ENV.PAGES.BAD_SERVER_PAGE) {
            const homeLink = document.querySelector("#preview");
            const pageSrc = ENV.PAGES.PREVIEW_PAGE;
            homeLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.state.currentChatItemId = null;
                this.changePage(pageSrc)
            })
        }
    }

    changePage(page) {
        this.state.currentPage = page;
        this.render();
        this.renderChatDetails(this.state.currentChatItemId);
    }
}