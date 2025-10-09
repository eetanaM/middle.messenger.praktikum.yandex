import { Block, TemplateRenderer } from '../../services/block';

import { Button, FormInput } from '../partials';

import type { IBlockProps } from '../../types/services/block/Block';
import type { IChatUsersReqData } from '../../types/services/api/ChatsApi';
import ChatsController from '../../controllers/ChatsController';

class AddUserForm extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
      /*
        Добавление пользователя через ID, т.к. вариант через поиск работает плохо
        из-за ограничения возвращаемых результатов поиска с endpoint'a из-за чего
        поиск не выдает всех результатов
      */
      Input: new FormInput({
        type: "text",
        name: "add-user",
        placeholder: "Введите ID пользователя",
      }),
      SubmitButton: new Button({
        id: 'add-user-button',
        textContent: 'Подтвердить',
        type: "submit",
      }),
      events: {
        submit: ((e: Event) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;
          const formInput = form.querySelector('input') as HTMLInputElement;
          const currentChatId = ChatsController.store.getState().currentChat.id;

          const formData: IChatUsersReqData = {
            users: [],
            chatId: currentChatId,
          };

          formData.users.push(Number(TemplateRenderer.escapeHtml(formInput?.value)));

          if (formData.users.length === 0) {
            return;
          }

          formInput.value = '';
          ChatsController.addChatUsers(formData);
        }),
      },
    });
  }

  override render() {
    return `<form class="authorization__auth-form">
                {{{ Input }}}
                {{{ SubmitButton }}}
            </form>`;
  }
}

export default AddUserForm;
