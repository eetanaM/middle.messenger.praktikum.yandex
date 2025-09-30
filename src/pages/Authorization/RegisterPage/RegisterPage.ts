import { Block } from '../../../services/block';

import { AuthForm } from '../../../components/blocks';
import { Button, FormInputWithValidation, MainLink } from '../../../components/partials';

import { REGISTER_TEMPLATE_DATA as MOCK } from '../../../services/api/mocks/mockData';

import type { IBlockProps } from '../../../types/services/block/Block';

export default class RegisterPage extends Block {
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
              // this._appElement.changePage(ENV.PAGES.LOGIN_PAGE); пофиксить переход
            },
          },
        }),
        PreviewLink: new MainLink({
          ...MOCK.preview,
          events: {
            click: (e: Event) => {
              e.preventDefault();
              // this._appElement.changePage(ENV.PAGES.PREVIEW_PAGE); пофиксить переход
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

export type TRegisterPage = typeof RegisterPage;
