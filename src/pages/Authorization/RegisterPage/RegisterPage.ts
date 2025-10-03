import { Block } from '../../../services/block';

import { AuthForm } from '../../../components/blocks';
import { Button, FormInputWithValidation, MainLink } from '../../../components/partials';

import { REGISTER_TEMPLATE_DATA as MOCK } from '../../../services/api/mocks/mockData';
import { ERoutes } from '../../../utils/constants/consts';

import type { IBlockProps } from '../../../types/services/block/Block';
import AuthController from '../../../controllers/AuthController';
import testValidation from '../../../utils/helpers/testValidation';

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
            const signInData: Record<string, string | false> = {};

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
              formInputs.forEach((node) => {
                signInData[node.name] = node.value;
              });

              AuthController.registerUser({
                first_name: signInData.first_name as string,
                second_name: signInData.second_name as string,
                login: signInData.login as string,
                phone: signInData.phone as string,
                email: signInData.email as string,
                password: signInData.password as string,
              });
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
