import Handlebars from "handlebars";

import * as Pages from "./pages";

import * as ENV from "./utils/constants/consts.js"

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
        if (this.state.currentPage === ENV.PAGES.PREVIEW_PAGE) {
            template = Handlebars.compile(Pages.PreviewPage); // compile preview page
            this.appElement.innerHTML = template({
                links: [
                    { pageSrc: ENV.PAGES.AUTH_PAGE, textContent: "Авторизация"},
                    { pageSrc: ENV.PAGES.REGISTER_PAGE, textContent: "Регистрация"},
                    { pageSrc: ENV.PAGES.MAIN_CONTENT_PAGE, textContent: "Чаты"},
                    { pageSrc: ENV.PAGES.NOT_FOUND_PAGE, textContent: "404"},
                    { pageSrc: ENV.PAGES.BAD_SERVER_PAGE, textContent: "50*"},
                ]
            })
            this.attachEventListeners()
        } else if (this.state.currentPage === ENV.PAGES.AUTH_PAGE) {
            template = Handlebars.compile(/* authPage.hbs link */); // compile auth page
            this.appElement.textContent = template({
                /* 
                    auth page data
                */
            })
        } else if (this.state.currentPage === ENV.PAGES.REGISTER_PAGE) {
            template = Handlebars.compile(/* registerPage.hbs link */); // compile register page
            this.appElement.textContent = template({
                /* 
                    register page data
                */
            })
        } else if (this.state.currentPage === ENV.PAGES.MAIN_CONTENT_PAGE) {
            template = Handlebars.compile(/* mainContentPage.hbs link */); // compile main content page
            this.appElement.textContent = template({
                /* 
                    main content page data
                */
            })
        } else if (this.state.currentPage === ENV.PAGES.NOT_FOUND_PAGE) {
            template = Handlebars.compile(/* 404Page.hbs link */); // compile 404 page
            this.appElement.textContent = template({
                /* 
                    404 page data
                */
            })
        } else if (this.state.currentPage === ENV.PAGES.BAD_SERVER_PAGE) {
            template = Handlebars.compile(/* 500Page.hbs link */); // compile 500 page
            this.appElement.textContent = template({
                /* 
                    500 page data
                */
            })
        } else {
            /* 
                describe logic when app couldn't compile template
            */
        }
    }

    attachEventListeners() {
        if (this.state.currentPage === ENV.PAGES.PREVIEW_PAGE) {
            const links = document.querySelectorAll('.preview-page__links li a')
            // Вешаем слушатели событий для перехода на другие страницы и ререндера
            links.forEach((node) => {
                const pageSrc = node.getAttribute('data-pagesrc')
                node.addEventListener('click', () => {
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