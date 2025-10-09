import { Block } from "../../services/block";
import ChatsController from "../../controllers/ChatsController";

import Button from "./Button";
import ListOf from "../blocks/ListOf";
import AddUserForm from "../blocks/AddUserForm";
import ChatUserItem from "./ChatUserItem";

import toggleModal from "../../utils/toggleModal";

import menuButtonImg from '../../../images/chat/menu1.png';

import type { IBlockProps } from '../../types/services/block/Block';
import type { TUserDetails } from "../../types/services/store/Store";

class ChatMenuButton extends Block {
  constructor(props?: IBlockProps) {
    const MenuButtons = new ListOf({
      items: [
        new Button({
          textContent: "Пользователи чата",
          events: {
            click: ((e: Event) => {
              e.preventDefault();
              const users = ChatsController.store.getState().currentChat.chatUsers;
              console.log(users);
              const UsersComponents = users.map((user: TUserDetails) => new ChatUserItem({
                chatUserId: user.id,
                avatar: user.avatar,
                displayName: user.display_name,
                firstName: user.first_name,
              }));

              toggleModal(this);
              toggleModal(new ListOf({
                items: UsersComponents,
              }));
            }),
          },
        }),
        new Button({
          textContent: "Добавить пользователя",
          events: {
            click: ((e: Event) => {
              e.preventDefault();
              const FormComponent = new AddUserForm({});

              toggleModal(this);
              toggleModal(FormComponent);
            }),
          },
        }),
        new Button({
          textContent: "Удалить чат",
          attr: { style: "background-color: red" },
          events: {
            click: ((e: Event) => {
              e.preventDefault();
              e.stopPropagation();

              const state = ChatsController.store.getState();
              const currentChatId = state.currentChat.id;

              try {
                ChatsController.deleteChat({ chatId: currentChatId });
              } catch (error) {
                console.log(error);
              } finally {
                toggleModal(this);
              }
            }),
          },
        }),
      ],
    });

    super({
      ...props,
      menuButton: menuButtonImg,
      events: {
        click: ((e: Event) => {
          e.preventDefault();
          toggleModal(MenuButtons);
        }),
      },
    });
  }

  override render() {
    return `<button class="header__menu-button">
                <img src={{ menuButton }} alt="Menu button">
            </button>`;
  }
}

export default ChatMenuButton;
