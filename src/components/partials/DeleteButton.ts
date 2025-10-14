import ChatsController from "../../controllers/ChatsController";
import { Block } from "../../services/block";
import type { IChatUsersReqData } from "../../types/services/api/ChatsApi";

import type { IBlockProps } from '../../types/services/block/Block';
import toggleModal from "../../utils/toggleModal";

class DeleteButton extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
      events: {
        click: ((e: Event) => {
          e.preventDefault();
          const userId = props.id;
          const currentChatId = ChatsController.store.getState().currentChat.id;

          const formData: IChatUsersReqData = {
            users: [],
            chatId: currentChatId,
          };

          formData.users.push(Number(userId));

          if (formData.users.length === 0) {
            return;
          }

          try {
            ChatsController.deleteChatUsers(formData);
          } catch (error) {
            console.log(error);
          } finally {
            toggleModal(this);
          }
        }),
      },
    });
  }

  override render() {
    return `<button class="user-item__delete-button" data-userId="{{ id }}">X</button>`;
  }
}

export default DeleteButton;
