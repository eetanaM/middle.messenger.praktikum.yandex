import { Block } from '../../../services/block';

import { AuthForm } from '../../../components/blocks';
import { Button, FormInputWithValidation, MainLink } from '../../../components/partials';

import { REGISTER_TEMPLATE_DATA as MOCK } from '../../../services/api/mocks/mockData';
import { ERoutes } from '../../../utils/constants/consts';

import type { IBlockProps } from '../../../types/services/block/Block';
import AuthController from '../../../controllers/AuthController';
import testValidation from '../../../utils/helpers/testValidation';
import type { ISignUpReqData } from '../../../types/services/api/AuthApi';

class RegisterPage extends Block {
  constructor(props?: IBlockProps) {
    const inputs = MOCK.inputs.map((input) => new FormInputWithValidation({
      input: {
        type: input.inputData.type,
        name: input.inputData.name,
        placeholder: input.inputData.placeholder,
      },
      invalid: {
        name: input.invalidInputData.name,
        textContent: input.invalidInputData.textContent,
      },
    }));

    super({
      ...props,
      events: {},
      AuthForm: new AuthForm({
        logoUrl: MOCK.logoUrl,
        inputs,
        SubmitButton: new Button(MOCK.button),
        AlreadyHasAccLink: new MainLink({
          ...MOCK.link,
          events: {
            click: (e: Event) => {
              e.preventDefault();
              AuthController.router.go(ERoutes.LOGIN);
            },
          },
        }),
        events: {
          submit: ((e: Event) => {
            e.preventDefault();
            e.stopPropagation();
  
            let isValidationPassed = true;
            const form = e.target as HTMLFormElement;
            const formInputs = form.querySelectorAll('input');
  
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
              const formData: FormData = new FormData();
              formInputs.forEach((node) => {
                formData.append(node.name, node.value);
              });
  
              AuthController.registerUser(formData as ISignUpReqData);
            }
          }),
        },
      }),
    });
  }

  override render() {
    return `<main class="authorization">
                    {{{ AuthForm }}}
                </main>`;
  }
}

export default RegisterPage;

export type TRegisterPage = typeof RegisterPage;
