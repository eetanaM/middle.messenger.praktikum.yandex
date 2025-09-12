type LinkData = {
    href: string,
    id: string,
    textContent: string | number,
}

type PreviewDataTemplate = {
    links: Array<{
        pageSrc: string,
        textContent: string | number
    }>
}

type AuthDataTemplate = {
    logoUrl: string,
    inputs: Array<{
        type: string,
        name: string,
        placeholder: string,
    }>,
    button: {
        id: string,
        textContent: string | number
    },
    link: LinkData,
    preview: LinkData,
}

type MainContentDataTemplate = {
    profileImgSrc: string,
    preview: LinkData,
    chatItems: Array<{
        avatarSrc: string,
        chatName: string | number,
        lastMessage: string | number,
        timeStamp: string | number,
        disabled: boolean,
        unreadMessagesCount: string | number,
        chatItemId: string
    }>
}

type ChatDetailsDataTemplate = {
    form: {
        type: string, 
        name: string, 
        placeholder: string,
    },
    icons: {
        [key: string]: string,
    }
}

type ProfileDataTemplate = {
    profileImg: string,
    navButtonSrc: string,
    profileName: string | number,
    userLastName: string | number,
    displayName: string | number,
    email: string | number,
    login: string | number,
    phoneNumber: string | number,
}

type ErrorPageDataTemplate = {
    notFoundLogoSrc: string,
    preview: LinkData
}

export type {
    PreviewDataTemplate,
    AuthDataTemplate,
    MainContentDataTemplate,
    ChatDetailsDataTemplate,
    ProfileDataTemplate,
    ErrorPageDataTemplate,
}

