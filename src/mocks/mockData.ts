import logo from "../../images/logo/logo.png"
import avatar from "../../images/profile/avatar.png"
import profileDefault from "../../images/profile/profileDefault.png"
import navButtonSrc from "../../images/nav-button.png"
import notFoundLogoSrc from "../../images/logo/logo404.png"
import menuButton from "../../images/chat/menu1.png"
import mockImg from "../../images/chat/mockimage.png"
import paperClip from "../../images/chat/paperclip.png"
import sendButton from "../../images/chat/send.png"


import * as ENV from "../utils/constants/consts"
import { TemplateRenderer } from "../utils/TemplateRenderer"

import type { AuthDataTemplate, ChatDetailsDataTemplate, ErrorPageDataTemplate, MainContentDataTemplate, PreviewDataTemplate, ProfileDataTemplate } from "../utils/types/api/mockData"

export const PREVIEW_TEMPLATE_DATA: PreviewDataTemplate = {  
    links: [
        { pageSrc: ENV.PAGES.LOGIN_PAGE, textContent: TemplateRenderer.escapeHtml("Вход")},
        { pageSrc: ENV.PAGES.REGISTER_PAGE, textContent: TemplateRenderer.escapeHtml("Регистрация")},
        { pageSrc: ENV.PAGES.MAIN_CONTENT_PAGE, textContent: TemplateRenderer.escapeHtml("Чаты")},
        { pageSrc: ENV.PAGES.PROFILE_PAGE, textContent: TemplateRenderer.escapeHtml("Профиль")},
        { pageSrc: ENV.PAGES.NOT_FOUND_PAGE, textContent: TemplateRenderer.escapeHtml("404")},
        { pageSrc: ENV.PAGES.BAD_SERVER_PAGE, textContent: TemplateRenderer.escapeHtml("50*")},
    ]
}
export const LOGIN_TEMPLATE_DATA: AuthDataTemplate = {
    logoUrl: logo,
    inputs: [
        { type: "text", name: "login", placeholder: "Email/Login"},
        { type: "password", name: "password", placeholder: "Пароль"},
    ],
    button: {
        id: 'login-button',
        textContent: TemplateRenderer.escapeHtml("Войти")
    },
    link: {
        href: "#",
        id: "no-acc",
        textContent: TemplateRenderer.escapeHtml("Нет аккаунта?")
    },
    preview: {
        href: "#",
        id: "preview",
        textContent: TemplateRenderer.escapeHtml("Вернуться к превью")
    }
}

export const REGISTER_TEMPLATE_DATA: AuthDataTemplate = {
    logoUrl: logo,
    inputs: [
        { type: "email", name: "email", placeholder: "Email"},
        { type: "login", name: "login", placeholder: "Логин"},
        { type: "text", name: "first_name", placeholder: "Имя"},
        { type: "text", name: "second_name", placeholder: "Фамилия"},
        { type: "tel", name: "phone", placeholder: "Телефон"},
        { type: "password", name: "password", placeholder: "Пароль"},
    ],
    button: {
        id: 'register-button',
        textContent: TemplateRenderer.escapeHtml("Зарегистрироваться")
    },
    link: {
        href: "#",
        id: "no-acc",
        textContent: TemplateRenderer.escapeHtml("Уже есть аккаунт?")
    },
    preview: {
        href: "#",
        id: "preview",
        textContent: TemplateRenderer.escapeHtml("Вернуться к превью")
    }
}

export const MAIN_CONTENT_TEMPLATE_DATA: MainContentDataTemplate = {
    profileImgSrc: avatar,
    preview: {
        href: "#",
        id: "preview",
        textContent: TemplateRenderer.escapeHtml("Вернуться к превью")
    },
    chatItems: [
        {
            avatarSrc: avatar,
            chatName: TemplateRenderer.escapeHtml("Chat Name"),
            lastMessage: TemplateRenderer.escapeHtml("Any text typed in last message column of the chat item"),
            timeStamp: TemplateRenderer.escapeHtml("15:35"),
            disabled: false,
            unreadMessagesCount: TemplateRenderer.escapeHtml(1),
            chatItemId: "1",
        },
        {
            avatarSrc: avatar,
            chatName: TemplateRenderer.escapeHtml("Chat Name"),
            lastMessage: TemplateRenderer.escapeHtml("Last message"),
            timeStamp: TemplateRenderer.escapeHtml("14:12"),
            disabled: true,
            unreadMessagesCount: TemplateRenderer.escapeHtml(0),
            chatItemId: "2",
        },
        {
            avatarSrc: avatar,
            chatName: TemplateRenderer.escapeHtml("Chat Name"),
            lastMessage: TemplateRenderer.escapeHtml("Last message"),
            timeStamp: TemplateRenderer.escapeHtml("Вчера"),
            disabled: true,
            unreadMessagesCount: TemplateRenderer.escapeHtml(0),
            chatItemId: "3",
        },
        {
            avatarSrc: avatar,
            chatName: TemplateRenderer.escapeHtml("Chat Name"),
            lastMessage: TemplateRenderer.escapeHtml("Last message"),
            timeStamp: TemplateRenderer.escapeHtml("Пн"),
            disabled: false,
            unreadMessagesCount: TemplateRenderer.escapeHtml(4),
            chatItemId: "4",
        },
        {
            avatarSrc: avatar,
            chatName: TemplateRenderer.escapeHtml("Chat Name"),
            lastMessage: TemplateRenderer.escapeHtml("Last message"),
            timeStamp: TemplateRenderer.escapeHtml("Вс"),
            disabled: true,
            unreadMessagesCount: TemplateRenderer.escapeHtml(0),
            chatItemId: "5",
        },
        {
            avatarSrc: avatar,
            chatName: TemplateRenderer.escapeHtml("Chat Name"),
            lastMessage: TemplateRenderer.escapeHtml("Last message"),
            timeStamp: TemplateRenderer.escapeHtml("01 авг."),
            disabled: true,
            unreadMessagesCount: TemplateRenderer.escapeHtml(0),
            chatItemId: "6",
        },
    ]
}

export const CHAT_DETAILS_TEMPLATE_DATA: ChatDetailsDataTemplate = {
    form: {
        type: "text", 
        name: "message", 
        placeholder: "Введите сообщение...",
    },
    icons: {
        menuButton,
        mockImg,
        sendButton,
        paperClip
    }
}

export const PROFILE_TEMPLATE_DATA: ProfileDataTemplate = {
    profileImg: profileDefault,
    navButtonSrc,
    profileName: TemplateRenderer.escapeHtml("Иван"),
    userLastName: TemplateRenderer.escapeHtml("Иванов"),
    displayName: TemplateRenderer.escapeHtml("Ivan1234"),
    email: TemplateRenderer.escapeHtml("pochta@yandex.ru"),
    login: TemplateRenderer.escapeHtml("ivanivanov"),
    phoneNumber: TemplateRenderer.escapeHtml("+7 (909) 967 30 30"),
}

export const NOT_FOUND_TEMPLATE_DATA: ErrorPageDataTemplate = {
    notFoundLogoSrc,
    preview: {
        href: "/",
        id: "preview",
        textContent: TemplateRenderer.escapeHtml("Вернуться к превью")
    }
}

export const BAD_SERVER_TEMPLATE_DATA: ErrorPageDataTemplate = {
    notFoundLogoSrc,
    preview: {
        href: "/",
        id: "preview",
        textContent: TemplateRenderer.escapeHtml("Вернуться к превью")
    }
}

