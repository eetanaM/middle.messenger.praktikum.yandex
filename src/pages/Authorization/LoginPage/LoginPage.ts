import { Block, TemplateRenderer } from '../../../services/block';
import AuthController from '../../../controllers/AuthController';
import connect from '../../../services/store/connect';

import { AuthForm } from '../../../components/blocks';
import { Button, FormInputWithValidation, MainLink } from '../../../components/partials';

import testValidation from '../../../utils/helpers/testValidation';
import { LOGIN_TEMPLATE_DATA as MOCK } from '../../../services/api/mocks/mockData';
import { ERoutes } from '../../../utils/constants/consts';

import type { IBlockProps } from '../../../types/services/block/Block';
import type { ISignInReqData } from '../../../types/services/api/AuthApi';

class LoginPage extends Block {
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

    const SignInButton = connect((state) => ({
      isLoading: state.auth.isLoading,
    }))(Button);

    super({
      ...props,
      events: {},
      AuthForm: new AuthForm({
        logoUrl: MOCK.logoUrl,
        inputs,
        SubmitButton: new SignInButton({
          id: 'login-button',
          textContent: 'Войти',
          type: "submit",
          isLoading: AuthController.store.getState()?.auth?.isLoading,
        }),
        NoAccLink: new MainLink({
          ...MOCK.link,
          events: {
            click: (e: Event) => {
              e.preventDefault();
              AuthController.router.go(ERoutes.REGISTER);
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

            const formData: ISignInReqData = {
              login: '',
              password: '',
            };

            if (isValidationPassed) {
              formInputs.forEach((node) => {
                // @ts-ignore гарантированно есть инпуты с нужными именами
                formData[node.name] = TemplateRenderer.escapeHtml(node.value).toString();
              });

              AuthController.loginUser(formData);
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

export default LoginPage;

export type TLoginPage = typeof LoginPage;
