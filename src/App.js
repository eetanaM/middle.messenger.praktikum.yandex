import Handlebars from "handlebars";

import * as Pages from "./pages";

import * as ENV from "./utils/constants/consts.js"
import * as MOCK from "./mocks/mockData.js"
import { TemplateRenderer } from "./utils/templateRenderer.js"

import Button from "./components/partials/Button.js";
import MainLink from "./components/partials/MainLink.js";
import FormInput from "./components/partials/FormInput.js";
import AuthForm from "./components/partials/AuthForm.js";
import ChatItem from "./components/partials/ChatItem.js";

Handlebars.registerPartial("Button", Button)
Handlebars.registerPartial("MainLink", MainLink)
Handlebars.registerPartial("FormInput", FormInput)
Handlebars.registerPartial("AuthForm", AuthForm)
Handlebars.registerPartial("ChatItem", ChatItem)

export default class App {
    constructor() {
        this.state = {
            currentPage: ENV.PAGES.MAIN_CONTENT_PAGE,
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
        } else if (this.state.currentPage === ENV.PAGES.BAD_SERVER_PAGE) {
            template = Handlebars.compile(/* 50* page template */);
            templateData = {
                /* 
                    50* page data
                */
            }
        } else {
            template = Handlebars.compile(/* 404 page template */);
            templateData = {
                /* 
                    404 page data
                */
            }
        }

        TemplateRenderer.renderTemplate(this.appElement, template, templateData);
        this.attachEventListeners();
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
            const signInButton = document.querySelector("#login-button")
    
            // Attaching event listener to go back to preview page. Temporary
            const pageSrc = ENV.PAGES.PREVIEW_PAGE
            signInButton.addEventListener("click", (e) => {
                e.preventDefault();
                this.changePage(pageSrc)
            })
        } else if (this.state.currentPage === ENV.PAGES.REGISTER_PAGE) {
            const signInButton = document.querySelector("#register-button")
    
            // Attaching event listener to go back to preview page. Temporary
            const pageSrc = ENV.PAGES.PREVIEW_PAGE
            signInButton.addEventListener("click", (e) => {
                e.preventDefault();
                this.changePage(pageSrc)
            })
        }
         else if (this.state.currentPage === ENV.PAGES.MAIN_CONTENT_PAGE) {
            const homeLink = document.querySelector(".main-content__menu > .app__main-link")
            const chatItems = document.querySelectorAll(".main-content__menu_chat-item")
            const baseClass = "main-content__menu_chat-item"

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
                })
            })

            homeLink.addEventListener("click", (e) => {
                e.preventDefault();
                this.changePage(pageSrc)
            })

        } else if (this.state.currentPage === ENV.PAGES.NOT_FOUND_PAGE) {
            /* 
                add buttons and set event listeners with callback which executes this.changePage() and others
            */
        } else if (this.state.currentPage === ENV.PAGES.BAD_SERVER_PAGE) {
            /* 
                add buttons and set event listeners with callback which executes this.changePage() and others
            */
        }
    }

    changePage(page) {
        this.state.currentPage = page;
        this.render();
    }
}