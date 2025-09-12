import Block from "../../utils/Block"

import { FormInput, MainLink } from "../../components/partials"
import { ChatDetails, ChatItem } from "../../components/blocks"

import { MAIN_CONTENT_TEMPLATE_DATA as MOCK, CHAT_DETAILS_TEMPLATE_DATA as CHAT_MOCK } from "../../mocks/mockData"
import * as ENV from "../../utils/constants/consts"
import type { IBlockProps } from "../../utils/types/Block"

export default class MainContentPage extends Block {
    
    constructor(props: IBlockProps) {
        const chatItemsComponents = MOCK.chatItems.map((chatItem) => {
            return new ChatItem({
                    chatItemId: chatItem.chatItemId,
                    avatarSrc: chatItem.avatarSrc,
                    chatName: chatItem.chatName,
                    lastMessage: chatItem.lastMessage,
                    timeStamp: chatItem.timeStamp,
                    disabled: chatItem.disabled,
                    unreadMessagesCount: chatItem.unreadMessagesCount
                })
        })
        super({
            ...props,
            events: {},
            profileImgSrc: MOCK.profileImgSrc,
            SearchInput: new FormInput({
                ...MOCK.preview
            }),
            ChatItems: chatItemsComponents,
            PreviewLink: new MainLink({
                href: MOCK.preview.href,
                id: MOCK.preview.id,
                textContent: MOCK.preview.textContent,
                appEl: props.appEl,
                events: {
                    click: ((e: Event) => {
                        e.preventDefault();
                        this._appElement.changePage(ENV.PAGES.PREVIEW_PAGE)
                    })
                }
            }),
            ChatDetails: new ChatDetails({
                icons: CHAT_MOCK.icons
            })
        })
    }

    override render() {
        return `<main class="main-content">
                    <nav class="menu">
                        <div class="menu__menu-header">
                            <div class="menu-header__avatar">
                                <img src={{ profileImgSrc }} alt="Profile photo">
                            </div>
                            <span class="menu-header__profile-name">Profile Name</span>
                        </div>
                        <form class="menu__menu-search">
                            {{{ SearchInput }}}
                        </form>
                        {{{ blockList "ChatItems" }}}
                        {{{ PreviewLink }}}
                    </nav>
                    <section class="chat">
                        {{{ ChatDetails }}}
                    </section>
                </main>`
    }
}

