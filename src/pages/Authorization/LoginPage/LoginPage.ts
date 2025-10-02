import { Block, TemplateRenderer } from '../../../services/block';
import AuthController from '../../../controllers/AuthController';
import { connect } from '../../../services/store';

import { AuthForm } from '../../../components/blocks';
import { Button, FormInputWithValidation, MainLink } from '../../../components/partials';

import { LOGIN_TEMPLATE_DATA as MOCK } from '../../../services/api/mocks/mockData';
import { ERoutes } from '../../../utils/constants/consts';

import type { IBlockProps } from '../../../types/services/block/Block';

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

    const ConnectedButton = connect((state) => ({
      isLoading: state.isLoading,
    }))(Button);

    super({
      ...props,
      events: {},
      AuthForm: new AuthForm({
        logoUrl: MOCK.logoUrl,
        inputs,
        SubmitButton: new ConnectedButton({
          id: 'login-button',
          textContent: TemplateRenderer.escapeHtml('Войти'),
          type: "submit",
          isLoading: AuthController.store.getState()?.isLoading,
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
        events: {},
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
