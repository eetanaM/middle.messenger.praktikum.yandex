import testValidation from '../../utils/helpers/testValidation';
import { Block } from '../../services/block';
import type { IBlockProps } from '../../types/services/block/Block';
import toggleModal from '../../utils/toggleModal';

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

          if (isValidationPassed) {
            const formData: { [key: string]: string } = {};
            formInputs.forEach((node) => {
              formData[node.name] = node.value;
            });

            console.log(formData);
            toggleModal(this);
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
