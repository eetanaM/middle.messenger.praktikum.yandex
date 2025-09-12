import Block from "../../utils/Block"

import { FormInput, MainLink } from "../../components/partials"
import { ChatDetails, ChatItem } from "../../components/blocks"

import { MAIN_CONTENT_TEMPLATE_DATA as MOCK, CHAT_DETAILS_TEMPLATE_DATA as CHAT_MOCK } from "../../mocks/mockData"

export default class MainContentPage extends Block {
    
    constructor() {
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
            events: {},
            profileImgSrc: MOCK.profileImgSrc,
            FormInput: new FormInput({
                type: "text",
                name: "search",
                placeholder: "Поиск"
            }),
            ChatItems: chatItemsComponents,
            MainLink: new MainLink({
                href: MOCK.preview.href,
                id: MOCK.preview.id,
                textContent: MOCK.preview.textContent,
            }),
            ChatDetails: new ChatDetails({
                icons: CHAT_MOCK.icons
            })
        })
    }

    override render() {
        return `<div id="app">
                    <main class="main-content">
                        <nav class="menu">
                            <div class="menu__menu-header">
                                <div class="menu-header__avatar">
                                    <img src={{ profileImgSrc }} alt="Profile photo">
                                </div>
                                <span class="menu-header__profile-name">Profile Name</span>
                            </div>
                            <form class="menu__menu-search">
                                {{{ FormInput }}}
                            </form>
                            {{{ blockList "ChatItems" }}}
                            {{{ MainLink }}}
                        </nav>
                        <section class="chat">
                            {{{ ChatDetails }}}
                        </section>
                    </main>
                    <div id="modal">
                        <div class="modal__overlay">
                        </div>
                        <div class="modal__content">
                            
                        </div> 
                    </div>
                </div>`
    }
}

