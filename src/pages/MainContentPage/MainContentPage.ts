import { Block } from '../../services/block';

import { FormInput } from '../../components/partials';
import {
  ChatDetails,
  ChatItem,
  MenuHeader,
  SendMessageForm,
} from '../../components/blocks';

import { MAIN_CONTENT_TEMPLATE_DATA as MOCK, CHAT_DETAILS_TEMPLATE_DATA as CHAT_MOCK } from '../../services/api/mocks/mockData';
import type { IBlockProps } from '../../types/services/block/Block';
import connect from '../../services/store/connect';

class MainContentPage extends Block {
  constructor(props?: IBlockProps) {
    let currentChatItemId: number | null = null;

    const MenuHeaderComponent = connect((state) => ({
      profileName: state.auth?.user?.display_name || state.auth?.user?.first_name,
    }))(MenuHeader);

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
      Header: new MenuHeaderComponent({}),
      SearchInput: new FormInput({
        ...MOCK.searchInput.inputData,
      }),
      ChatItems: chatItemsComponents,
      ChatDetails: ChatDetailsComponent,
    });
  }

  override render() {
    return `<main class="main-content">
                    <nav class="menu">
                        {{{ Header }}}
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

export default MainContentPage;

export type TMainContentPage = typeof MainContentPage;
