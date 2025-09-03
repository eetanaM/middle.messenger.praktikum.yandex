type LinkData = {
    href: string,
    id: string,
    textContent: string,
}

type PreviewDataTemplate = {
    links: Array<{
        pageSrc: string,
        textContent: string
    }>
}

type AuthDataTemplate = {
    logoUrl: string,
    inputs: Array<{
        type: string,
        name: string,
        placeholder?: string,
    }>,
    button: {
        ID: string,
        textContent: string
    },
    link: LinkData,
    preview: LinkData,
}

type MainContentDataTemplate = {
    profileImgSrc: string,
    preview: LinkData,
    chatItems: Array<{
        avatarSrc: string,
        chatName: string,
        lastMessage: string,
        timeStamp: string,
        disabled: string | null,
        unreadMessagesCount: number,
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
    profileName: string,
    navButtonSrc: string,
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

