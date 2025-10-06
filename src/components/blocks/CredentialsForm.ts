import { Block } from '../../services/block';
import UsersController from '../../controllers/UsersController';

import testValidation from '../../utils/helpers/testValidation';
import toggleModal from '../../utils/toggleModal';

import type { IBlockProps } from '../../types/services/block/Block';
import type { IChangeAvatarReqData, IChangeCredentialsReqData } from '../../types/services/api/UsersApi';

class CredentialsForm extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
      events: {
        submit: ((e: Event) => {
          e.preventDefault();
          e.stopPropagation();

          let isValidationPassed = true;
          const form = e.target as HTMLFormElement;
          const formInputs = form.querySelectorAll('.app__main-input') as NodeListOf<HTMLInputElement>;
          const fileInput = form.querySelector('.app__file-input') as HTMLInputElement;

          formInputs.forEach((node) => {
            const inputName = node.name;
            const inputValue = node.value;
            const invalidInputLabel = document.getElementById(inputName);

            if (testValidation(inputName, inputValue)) {
              invalidInputLabel?.setAttribute('class', 'app__invalid-input hidden');
            } else {
              invalidInputLabel?.setAttribute('class', 'app__invalid-input');
              isValidationPassed = false;
            }
          });

          if (!isValidationPassed) {
            return;
          }

          const formData: IChangeCredentialsReqData = {
            first_name: '',
            second_name: '',
            display_name: '',
            login: '',
            email: '',
            phone: '',
          };

          formInputs.forEach((node) => {
            const { name } = node;
            const { value } = node;
            if (name in formData) {
              // @ts-ignore гарантированно есть соответствующее поле в formData
              formData[name] = value;
            }
          });

          try {
            UsersController.changeCredentials(formData);
            if (fileInput && fileInput.files && fileInput.files.length > 0) {
              const file = fileInput.files[0];

              const avatarData = new FormData() as IChangeAvatarReqData;
              avatarData.append('avatar', file);

              UsersController.changeAvatar(avatarData);
            }
            toggleModal(this);
          } catch (err) {
            console.error('Ошибка при изменении данных профиля:', err);
          }
        }),
        reset: ((e: Event) => {
          e.preventDefault();
          toggleModal(this);
        }),
      },
    });
  }

  override render() {
    return `<form class="credentials__form">
                    {{{ ProfileAvatarInput }}}
                    {{{ blockList "inputs" }}}
                    {{{ SubmitButton }}}
                    {{{ ResetButton }}}
                </form>`;
  }
}

export default CredentialsForm;
