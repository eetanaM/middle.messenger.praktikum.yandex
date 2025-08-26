import Handlebars from "handlebars";

import * as Pages from "./pages";

import * as ENV from "./utils/constants/consts.js"
import { TemplateRenderer } from "./utils/templateRenderer.js"

import Button from "./components/partials/Button.js";
import MainLink from "./components/partials/MainLink.js";
import FormInput from "./components/partials/FormInput.js";
import AuthForm from "./components/partials/AuthForm.js";

import logo from "../images/logo/logo.png"

Handlebars.registerPartial("Button", Button)
Handlebars.registerPartial("MainLink", MainLink)
Handlebars.registerPartial("FormInput", FormInput)
Handlebars.registerPartial("AuthForm", AuthForm)

export default class App {
    constructor() {
        this.state = {
            currentPage: ENV.PAGES.MAIN_CONTENT_PAGE,
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
            templateData = {  
                links: [
                    { pageSrc: ENV.PAGES.LOGIN_PAGE, textContent: TemplateRenderer.escapeHtml("Вход")},
                    { pageSrc: ENV.PAGES.REGISTER_PAGE, textContent: TemplateRenderer.escapeHtml("Регистрация")},
                    { pageSrc: ENV.PAGES.MAIN_CONTENT_PAGE, textContent: TemplateRenderer.escapeHtml("Чаты")},
                    { pageSrc: ENV.PAGES.NOT_FOUND_PAGE, textContent: TemplateRenderer.escapeHtml("404")},
                    { pageSrc: ENV.PAGES.BAD_SERVER_PAGE, textContent: TemplateRenderer.escapeHtml("50*")},
                ]
            }
        } else if (this.state.currentPage === ENV.PAGES.LOGIN_PAGE) {
            template = Handlebars.compile(Pages.LoginPage);
            templateData = {
                logoUrl: logo,
                inputs: [
                    { type: "text", name: "login", placeholder: "Email/Login"},
                    { type: "password", name: "password", placeholder: "Пароль"},
                ],
                button: {
                    ID: 'login-button',
                    textContent: TemplateRenderer.escapeHtml("Войти")
                },
                link: {
                    href: "#",
                    textContent: TemplateRenderer.escapeHtml("Нет аккаунта?")
                }
            }

        } else if (this.state.currentPage === ENV.PAGES.REGISTER_PAGE) {
            template = Handlebars.compile(Pages.RegisterPage);
            templateData = {
                logoUrl: logo,
                inputs: [
                    { type: "email", name: "email", placeholder: "Email"},
                    { type: "login", name: "login", placeholder: "Логин"},
                    { type: "text", name: "firstname", placeholder: "Имя"},
                    { type: "text", name: "lastname", placeholder: "Фамилия"},
                    { type: "tel", name: "phone", placeholder: "Телефон"},
                    { type: "password", name: "password", placeholder: "Пароль"},
                    { type: "password", name: "password-confirm", placeholder: "Подтвердите пароль"},
                ],
                button: {
                    ID: 'register-button',
                    textContent: TemplateRenderer.escapeHtml("Зарегистрироваться")
                },
                link: {
                    href: "#",
                    textContent: TemplateRenderer.escapeHtml("Уже есть аккаунт?")
                }
            }
        } else if (this.state.currentPage === ENV.PAGES.MAIN_CONTENT_PAGE) {
            template = Handlebars.compile(Pages.MainContentPage);
            templateData = {
                link: {
                    href: "#",
                    text: TemplateRenderer.escapeHtml("Назад к превью")
                }
            }
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

            // Attaching event listener to go back to preview page. Temporary
            const pageSrc = ENV.PAGES.PREVIEW_PAGE

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