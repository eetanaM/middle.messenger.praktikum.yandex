import { Block } from '../../services/block';
import ChatsController from '../../controllers/ChatsController';

import ChatItem from './ChatItem';
import CredentialsForm from './CredentialsForm';
import { Button, FormInput } from '../partials';

import { isEqual } from '../../utils/helpers';
import toggleModal from '../../utils/toggleModal';

import defaultChatImg from '../../../images/profile/avatar.png';

import type { IBlockProps } from '../../types/services/block/Block';
import type { TChatDetails } from '../../types/services/store/Store';

const createChatItem = (chatItem: TChatDetails) => new ChatItem({
  chatItemId: chatItem.id,
  avatarSrc: chatItem.avatar || defaultChatImg,
  chatName: chatItem.title,
  lastMessage: chatItem.last_message?.content || "",
  timeStamp: chatItem.last_message?.time || "",
  unreadMessagesCount: chatItem.unread_count || 0,
  events: {
    click: ((e: Event) => {
      e.stopPropagation();
      e.stopImmediatePropagation();

      const chatItemEl = e.currentTarget as HTMLElement;
      const currentChatItemId = Number(chatItemEl.id);
      const baseClass = 'chat-item';
      const allChatItems = document.querySelectorAll('.chat-item');
      const chats = ChatsController.store.getState().chats.allChats as TChatDetails[];
      const chatInfo = chats.find((val) => val.id === currentChatItemId);

      allChatItems.forEach((el) => {
        el.setAttribute('class', baseClass);
      });
      chatItemEl.setAttribute('class', `${baseClass} active`);

      ChatsController.store.set('currentChat.id', currentChatItemId);
      ChatsController.store.set('currentChat.chatDetails', { ...chatInfo });
    }),
  },
});

const ChatItemsComponents = (chats: TChatDetails[]) => chats.map(createChatItem);

class MenuChats extends Block {
  constructor(props: IBlockProps) {
    const chats = props.chats as TChatDetails[];
    const isLoading = props.isLoading || true;
    const { isEmpty } = props;
    const ChatTitleForm = new CredentialsForm({
      inputs: [new FormInput({
        type: "text",
        name: "title",
        placeholder: "Название чата",
      })],
      SubmitButton: new Button({
        id: "confirm",
        type: "submit",
        textContent: "Подтвердить",
      }),
      ResetButton: new Button({
        id: "reset",
        type: "reset",
        textContent: "Отменить",
      }),
      events: {
        submit: ((e: Event) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formInputs = form.querySelectorAll('input');

          const formData: { title: string } = {
            title: '',
          };

          formInputs.forEach((node) => {
            // @ts-ignore гарантированно есть инпуты с нужными именами
            formData[node.name] = node.value;
          });

          ChatsController.createChat(formData);
          toggleModal(this);
        }),
        reset: ((e: Event) => {
          e.preventDefault();
          toggleModal(this);
        }),
      },
    });

    super({
      ...props,
      ChatItems: ChatItemsComponents(chats),
      isLoading,
      isEmpty,
      CreateChatButton: new Button({
        id: 'create-chat',
        textContent: 'Создать новый чат',
        type: "button",
        events: {
          click: ((e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            toggleModal(ChatTitleForm);
          }),
        },
      }),
    });
  }

  override componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    const shouldUpdate = !isEqual(oldProps, newProps);

    if (shouldUpdate) {
      const chats = newProps.chats as TChatDetails[];
      if (chats && Array.isArray(chats)) {
        this.setList("ChatItems", chats.map(createChatItem));
      }
      this.setProps({ ...newProps });
    }
    return shouldUpdate;
  }

  override render() {
    return `<div class="menu__menu-chats">
              {{#if isLoading}}
                <span>Загрузка...</span>
              {{else}}
                {{{ CreateChatButton }}}
                {{{ blockList "ChatItems" }}}
              {{/if}}
            </div>`;
  }
}

export default MenuChats;
