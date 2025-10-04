import { Block } from '../../services/block';

import ChatItem from './ChatItem';

import type { IBlockProps } from '../../types/services/block/Block';
import type { TChatDetails } from '../../types/services/store/Store';

class MenuChats extends Block {
  constructor(props: IBlockProps) {
    const chats = props.chats as TChatDetails[] || [];
    const isLoading = props.isLoading as boolean || false;

    const chatItemsComponents = chats.map((chatItem) => new ChatItem({
      chatItemId: chatItem.id,
      avatarSrc: chatItem.avatar,
      chatName: chatItem.title,
      lastMessage: chatItem.last_message.content,
      timeStamp: chatItem.last_message.time,
      unreadMessagesCount: chatItem.unread_count,
      events: {
        click: ((e: Event) => {
          e.stopPropagation();
          e.stopImmediatePropagation();

          const chatItemEl = e.currentTarget as HTMLElement;
          // const currentChatItemId = Number(chatItemEl.id);
          const baseClass = 'chat-item';
          const allChatItems = document.querySelectorAll('.chat-item');

          allChatItems.forEach((el) => {
            el.setAttribute('class', baseClass);
          });
          chatItemEl.setAttribute('class', `${baseClass} active`);

          /* ChatDetailsComponent.setProps({
            currentChatItemId,
          }); */
        }),
      },
    }));
    super({
      ...props,
      ChatItems: chatItemsComponents,
      isLoading,
    });
  }

  override render() {
    return `<div class="menu__menu-chats">
              {{#if isLoading}}
              <span>Загрузка...</span>
              {{else}}
              {{{ blockList "ChatItems" }}}
              {{/if}}
            </div>`;
  }
}

export default MenuChats;
