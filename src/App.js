import Handlebars from "handlebars";

import * as Pages from "./pages";

import * as ENV from "./utils/constants/consts.js"
import { TemplateRenderer } from './utils/templateRenderer.js'

import Button from "./components/partials/Button.js";

Handlebars.registerPartial("Button", Button)

// App implementation with handlebars compiler gonna be here

export default class App {
    constructor() {
        this.state = {
            currentPage: ENV.PAGES.PREVIEW_PAGE,
            accessToken: '',
            refreshToken: '',
        }
        this.appElement = document.getElementById('app')
    }

    render() {
        let template;
        let templateData;
        if (this.state.currentPage === ENV.PAGES.PREVIEW_PAGE) {
                template = Handlebars.compile(Pages.PreviewPage);
                templateData = {  
                    links: [
                        { pageSrc: ENV.PAGES.AUTH_PAGE, textContent: TemplateRenderer.escapeHtml("Авторизация")},
                        { pageSrc: ENV.PAGES.REGISTER_PAGE, textContent: TemplateRenderer.escapeHtml("Регистрация")},
                        { pageSrc: ENV.PAGES.MAIN_CONTENT_PAGE, textContent: TemplateRenderer.escapeHtml("Чаты")},
                        { pageSrc: ENV.PAGES.NOT_FOUND_PAGE, textContent: TemplateRenderer.escapeHtml("404")},
                        { pageSrc: ENV.PAGES.BAD_SERVER_PAGE, textContent: TemplateRenderer.escapeHtml("50*")},
                    ]
                }
        } else if (this.state.currentPage === ENV.PAGES.AUTH_PAGE) {
            template = Handlebars.compile(Pages.AuthorizationPage);

        } else if (this.state.currentPage === ENV.PAGES.REGISTER_PAGE) {
            template = Handlebars.compile(/* registerPage.hbs link */); // compile register page
            this.appElement.innerHTML = template({
                /* 
                    register page data
                */
            })
        } else if (this.state.currentPage === ENV.PAGES.MAIN_CONTENT_PAGE) {
            template = Handlebars.compile(/* mainContentPage.hbs link */); // compile main content page
            this.appElement.innerHTML = template({
                /* 
                    main content page data
                */
            })
        } else if (this.state.currentPage === ENV.PAGES.NOT_FOUND_PAGE) {
            template = Handlebars.compile(/* 404Page.hbs link */); // compile 404 page
            this.appElement.innerHTML = template({
                /* 
                    404 page data
                */
            })
        } else if (this.state.currentPage === ENV.PAGES.BAD_SERVER_PAGE) {
            template = Handlebars.compile(/* 500Page.hbs link */); // compile 500 page
            this.appElement.innerHTML = template({
                /* 
                    500 page data
                */
            })
        } else {
            template = Handlebars.compile(/* 404Page.hbs link */); // compile 404 page
            this.appElement.innerHTML = template({
                /* 
                    404 page data
                */
            })
        }

        TemplateRenderer.renderTemplate(this.appElement, template, templateData);
        this.attachEventListeners();
    }

    attachEventListeners() {
        if (this.state.currentPage === ENV.PAGES.PREVIEW_PAGE) {
            const links = document.querySelectorAll('.preview-page__links li a')
            // Attaching event listeners on links for changing pages and rerender
            links.forEach((node) => {
                const pageSrc = node.getAttribute('data-pagesrc')
                node.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.changePage(pageSrc)
                })
            })
        } else if (this.state.currentPage === ENV.PAGES.AUTH_PAGE) {
            /* 
                add buttons and set event listeners with callback which executes this.changePage() and others
            */
        } else if (this.state.currentPage === ENV.PAGES.REGISTER_PAGE) {
            /* 
                add buttons and set event listeners with callback which executes this.changePage() and others
            */
        }
         else if (this.state.currentPage === ENV.PAGES.MAIN_CONTENT_PAGE) {
            /* 
                add buttons and set event listeners with callback which executes this.changePage() and others
            */
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