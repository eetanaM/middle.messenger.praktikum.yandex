import { Block, TemplateRenderer } from '../../../services/block';
import connect from '../../../services/store/connect';

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

    const SignUpButton = connect((state) => ({
      isLoading: state.auth.isLoading,
    }))(Button);

    super({
      ...props,
      events: {},
      AuthForm: new AuthForm({
        logoUrl: MOCK.logoUrl,
        inputs,
        SubmitButton: new SignUpButton({
          id: 'register-button',
          textContent: 'Зарегистрироваться',
          type: "submit",
          isLoading: AuthController.store.getState()?.auth?.isLoading,
        }),
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

            const formData: ISignUpReqData = {
              first_name: '',
              second_name: '',
              login: '',
              phone: '',
              email: '',
              password: '',
            };

            if (isValidationPassed) {
              formInputs.forEach((node) => {
                formData[node.name as keyof ISignUpReqData] = TemplateRenderer.escapeHtml(node.value).toString();
              });

              AuthController.registerUser(formData);
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
