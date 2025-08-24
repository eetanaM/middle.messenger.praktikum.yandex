import Handlebars from "handlebars";

import * as ENV from "./utils/constants/consts.js"

// App implementation with handlebars compiler gonna be here

export default class App {
    constructor() {
        this.state = {
            currentPage: ENV.AUTH_PAGE,
            accessToken: '',
            refreshToken: '',
        }
        this.appElement = document.getElementById('app')
    }

    render() {
        let template;
        if (this.state.currentPage === ENV.AUTH_PAGE) {
            template = Handlebars.compile(/* authPage.hbs link */); // compile auth page
            this.appElement.textContent = template({
                /* 
                    auth page data
                */
            })
        } else if (this.state.currentPage === ENV.REGISTER_PAGE) {
            template = Handlebars.compile(/* registerPage.hbs link */); // compile register page
            this.appElement.textContent = template({
                /* 
                    register page data
                */
            })
        } else if (this.state.currentPage === ENV.MAIN_CONTENT_PAGE) {
            template = Handlebars.compile(/* mainContentPage.hbs link */); // compile main content page
            this.appElement.textContent = template({
                /* 
                    main content page data
                */
            })
        } else if (this.state.currentPage === ENV.NOT_FOUND_PAGE) {
            template = Handlebars.compile(/* 404Page.hbs link */); // compile 404 page
            this.appElement.textContent = template({
                /* 
                    404 page data
                */
            })
        } else if (this.state.currentPage === ENV.BAD_SERVER_PAGE) {
            template = Handlebars.compile(/* 500Page.hbs link */); // compile 500 page
            this.appElement.textContent = template({
                /* 
                    500 page data
                */
            })
        }
    }

    attachEventListeners() {
        if (this.state.currentPage === ENV.AUTH_PAGE) {
            /* 
                add buttons and set event listeners with callback which executes this.changePage() and others
            */
        } else if (this.state.currentPage === ENV.REGISTER_PAGE) {
            /* 
                add buttons and set event listeners with callback which executes this.changePage() and others
            */
        }
         else if (this.state.currentPage === ENV.MAIN_CONTENT_PAGE) {
            /* 
                add buttons and set event listeners with callback which executes this.changePage() and others
            */
        } else if (this.state.currentPage === ENV.NOT_FOUND_PAGE) {
            /* 
                add buttons and set event listeners with callback which executes this.changePage() and others
            */
        } else if (this.state.currentPage === ENV.BAD_SERVER_PAGE) {
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