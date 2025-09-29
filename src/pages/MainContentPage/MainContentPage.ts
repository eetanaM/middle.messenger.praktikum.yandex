import { Block } from '../../utils/block';

import { FormInput, MainLink } from '../../components/partials';
import { ChatDetails, ChatItem, SendMessageForm } from '../../components/blocks';

import { MAIN_CONTENT_TEMPLATE_DATA as MOCK, CHAT_DETAILS_TEMPLATE_DATA as CHAT_MOCK } from '../../utils/api/mocks/mockData';
import * as ENV from '../../utils/constants/consts';
import type { IBlockProps } from '../../utils/types/utils/block/Block';

export default class MainContentPage extends Block {
  constructor(props: IBlockProps) {
    let currentChatItemId: number | null = null;
    const SendMessageFormComponent = new SendMessageForm({
      icons: CHAT_MOCK.icons,
      FormInput: new FormInput({
        type: 'text',
        name: 'message',
        placeholder: 'Введите сообщение',
      }),
    });

    const ChatDetailsComponent = new ChatDetails({
      icons: CHAT_MOCK.icons,
      SendMessageForm: SendMessageFormComponent,
    });

    const chatItemsComponents = MOCK.chatItems.map((chatItem) => new ChatItem({
      chatItemId: chatItem.chatItemId,
      avatarSrc: chatItem.avatarSrc,
      chatName: chatItem.chatName,
      lastMessage: chatItem.lastMessage,
      timeStamp: chatItem.timeStamp,
      disabled: chatItem.disabled,
      unreadMessagesCount: chatItem.unreadMessagesCount,
      events: {
        click: ((e: Event) => {
          e.stopPropagation();
          e.stopImmediatePropagation();

          const chatItemEl = e.currentTarget as HTMLElement;
          currentChatItemId = Number(chatItemEl.id);
          const baseClass = 'chat-item';
          const allChatItems = document.querySelectorAll('.chat-item');

          allChatItems.forEach((el) => {
            el.setAttribute('class', baseClass);
          });
          chatItemEl.setAttribute('class', `${baseClass} active`);

          ChatDetailsComponent.setProps({
            currentChatItemId,
          });
        }),
      },
    }));

    super({
      ...props,
      events: {},
      profileImgSrc: MOCK.profileImgSrc,
      SearchInput: new FormInput({
        ...MOCK.searchInput.inputData,
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
            this._appElement.changePage(ENV.PAGES.PREVIEW_PAGE);
          }),
        },
      }),
      ChatDetails: ChatDetailsComponent,
    });
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
                    {{{ ChatDetails }}}
                </main>`;
  }
}

export type TMainContentPage = typeof MainContentPage;
