import { Block } from '../../services/block';

import ChatItem from './ChatItem';

import type { IBlockProps } from '../../types/services/block/Block';
import type { TChatDetails } from '../../types/services/store/Store';
import { isEqual } from '../../utils/helpers';

const createChatItem = (chatItem: TChatDetails) => new ChatItem({
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
});
const ChatItemsComponents = (chats: TChatDetails[]) => chats.map(createChatItem);

class MenuChats extends Block {
  constructor(props: IBlockProps) {
    const chats = props.chats as TChatDetails[];
    const isLoading = props.isLoading || true;
    const isEmpty = props.isEmpty;

    super({
      ...props,
      ChatItems: ChatItemsComponents(chats),
      isLoading,
      isEmpty,
    });
  }

  override componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    const shouldUpdate = !isEqual(oldProps, newProps);

    if (shouldUpdate) {
      const chats = newProps.chats as TChatDetails[];
      if (chats && Array.isArray(chats)) {
        this.setList("ChatItems", chats.map(createChatItem));
      }
      this.setProps({...newProps})
    }
    return shouldUpdate;
  }

  override render() {
    return `
      <div class="menu__menu-chats">
        {{#if isLoading}}
          <span>Загрузка...</span>
        {{else}}
          {{#if isEmpty}}
            <span>Нет чатов</span>
          {{else}}
            {{{ blockList "ChatItems" }}}
          {{/if}}
        {{/if}}
      </div>
    `;
  }
}

export default MenuChats;
