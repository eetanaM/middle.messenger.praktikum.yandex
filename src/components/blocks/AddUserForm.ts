import { Block, TemplateRenderer } from '../../services/block';
import ChatsController from '../../controllers/ChatsController';

import { Button, FormInputWithValidation } from '../partials';

import toggleModal from '../../utils/toggleModal';

import type { IBlockProps } from '../../types/services/block/Block';
import type { IChatUsersReqData } from '../../types/services/api/ChatsApi';
import testValidation from '../../utils/helpers/testValidation';

class AddUserForm extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
      /*
        Добавление пользователя через ID, т.к. вариант через поиск работает плохо
        из-за ограничения возвращаемых результатов поиска с endpoint'a из-за чего
        поиск не выдает всех результатов
      */
      Input: new FormInputWithValidation({
        input: {
          type: "text",
          name: "add-user",
          placeholder: "Введите ID пользователя",
        },
        invalid: {
          name: "add-user",
          textContent: "Неверный формат. Поле должно содержать id пользователя (от 1 до 4 цифр)",
        },
      }),
      SubmitButton: new Button({
        id: 'add-user-button',
        textContent: 'Подтвердить',
        type: "submit",
      }),
      events: {
        submit: ((e: Event) => {
          e.preventDefault();

          let isValidationPassed = true;
          const form = e.target as HTMLFormElement;
          const formInput = form.querySelector('input') as HTMLInputElement;
          const currentChatId = ChatsController.store.getState().currentChat.id;
          const invalidInputLabel = document.getElementById(formInput.name);
          const formData: IChatUsersReqData = {
            users: [],
            chatId: currentChatId,
          };

          console.log(Number(TemplateRenderer.escapeHtml(formInput?.value)));

          if (testValidation(formInput.name, formInput.value)) {
            invalidInputLabel?.setAttribute('class', 'app__invalid-input hidden');
          } else {
            invalidInputLabel?.setAttribute('class', 'app__invalid-input');
            isValidationPassed = false;
          }

          if (isValidationPassed) {
            formData.users.push(Number(TemplateRenderer.escapeHtml(formInput?.value)));

            formInput.value = '';
            try {
              ChatsController.addChatUsers(formData);
            } catch (error) {
              console.log(error);
            } finally {
              toggleModal(this);
            }
          }
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
