import { Block } from "../../services/block";
import ChatsController from "../../controllers/ChatsController";

import Button from "./Button";
import ListOf from "../blocks/ListOf";

import toggleModal from "../../utils/toggleModal";

import menuButtonImg from '../../../images/chat/menu1.png';

import type { IBlockProps } from '../../types/services/block/Block';

class ChatMenuButton extends Block {
  constructor(props?: IBlockProps) {
    const MenuButtons = new ListOf({
      items: [
        new Button({ textContent: "Пользователи чата" }),
        new Button({ textContent: "Добавить пользователя" }),
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
