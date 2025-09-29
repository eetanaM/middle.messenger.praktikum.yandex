import Block from '../../../utils/Block';

import { AuthForm } from '../../../components/blocks';
import { Button, FormInputWithValidation, MainLink } from '../../../components/partials';

import { REGISTER_TEMPLATE_DATA as MOCK } from '../../../utils/api/mocks/mockData';
import * as ENV from '../../../utils/constants/consts';

import type { IBlockProps } from '../../../utils/types/utils/Block';

export default class RegisterPage extends Block {
  constructor(props: IBlockProps) {
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
          appEl: props.appEl,
          events: {
            click: (e: Event) => {
              e.preventDefault();
              this._appElement.changePage(ENV.PAGES.LOGIN_PAGE);
            },
          },
        }),
        PreviewLink: new MainLink({
          ...MOCK.preview,
          appEl: props.appEl,
          events: {
            click: (e: Event) => {
              e.preventDefault();
              this._appElement.changePage(ENV.PAGES.PREVIEW_PAGE);
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
