import logo from "../../images/logo/logo.png"
import * as ENV from "../utils/constants/consts"
import { TemplateRenderer } from "../utils/templateRenderer"

export const PREVIEW_TEMPLATE_DATA = {  
    links: [
        { pageSrc: ENV.PAGES.LOGIN_PAGE, textContent: TemplateRenderer.escapeHtml("Вход")},
        { pageSrc: ENV.PAGES.REGISTER_PAGE, textContent: TemplateRenderer.escapeHtml("Регистрация")},
        { pageSrc: ENV.PAGES.MAIN_CONTENT_PAGE, textContent: TemplateRenderer.escapeHtml("Чаты")},
        { pageSrc: ENV.PAGES.NOT_FOUND_PAGE, textContent: TemplateRenderer.escapeHtml("404")},
        { pageSrc: ENV.PAGES.BAD_SERVER_PAGE, textContent: TemplateRenderer.escapeHtml("50*")},
    ]
}
export const LOGIN_TEMPLATE_DATA = {
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

export const REGISTER_TEMPLATE_DATA = {
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

export const MAIN_CONTENT_TEMPLATE_DATA = {
    link: {
        href: "#",
        text: TemplateRenderer.escapeHtml("Назад к превью")
    },
    chatItems: [
        {
            avatarSrc: "../../../images/profile/avatar.png",
            chatName: TemplateRenderer.escapeHtml("Chat Name"),
            lastMessage: TemplateRenderer.escapeHtml("Any text typed in last message column of the chat item"),
            timeStamp: TemplateRenderer.escapeHtml("15:35"),
            disabled: "",
            unreadMessagesCount: TemplateRenderer.escapeHtml(1),
            chatItemId: "1",
        },
        {
            avatarSrc: "../../../images/profile/avatar.png",
            chatName: TemplateRenderer.escapeHtml("Chat Name"),
            lastMessage: TemplateRenderer.escapeHtml("Last message"),
            timeStamp: TemplateRenderer.escapeHtml("14:12"),
            disabled: "disabled",
            unreadMessagesCount: TemplateRenderer.escapeHtml(0),
            chatItemId: "2",
        },
        {
            avatarSrc: "../../../images/profile/avatar.png",
            chatName: TemplateRenderer.escapeHtml("Chat Name"),
            lastMessage: TemplateRenderer.escapeHtml("Last message"),
            timeStamp: TemplateRenderer.escapeHtml("Вчера"),
            disabled: "disabled",
            unreadMessagesCount: TemplateRenderer.escapeHtml(0),
            chatItemId: "3",
        },
        {
            avatarSrc: "../../../images/profile/avatar.png",
            chatName: TemplateRenderer.escapeHtml("Chat Name"),
            lastMessage: TemplateRenderer.escapeHtml("Last message"),
            timeStamp: TemplateRenderer.escapeHtml("Пн"),
            disabled: "",
            unreadMessagesCount: TemplateRenderer.escapeHtml(4),
            chatItemId: "4",
        },
        {
            avatarSrc: "../../../images/profile/avatar.png",
            chatName: TemplateRenderer.escapeHtml("Chat Name"),
            lastMessage: TemplateRenderer.escapeHtml("Last message"),
            timeStamp: TemplateRenderer.escapeHtml("Вс"),
            disabled: "disabled",
            unreadMessagesCount: TemplateRenderer.escapeHtml(0),
            chatItemId: "5",
        },
        {
            avatarSrc: "../../../images/profile/avatar.png",
            chatName: TemplateRenderer.escapeHtml("Chat Name"),
            lastMessage: TemplateRenderer.escapeHtml("Last message"),
            timeStamp: TemplateRenderer.escapeHtml("01 авг."),
            disabled: "disabled",
            unreadMessagesCount: TemplateRenderer.escapeHtml(0),
            chatItemId: "6",
        },
    ]
}