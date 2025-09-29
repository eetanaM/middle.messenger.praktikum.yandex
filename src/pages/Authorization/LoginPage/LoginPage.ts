import Block from '../../../utils/block/Block';

import { AuthForm } from '../../../components/blocks';
import { Button, FormInputWithValidation, MainLink } from '../../../components/partials';

import { LOGIN_TEMPLATE_DATA as MOCK } from '../../../utils/api/mocks/mockData';
import * as ENV from '../../../utils/constants/consts';

import type { IBlockProps } from '../../../utils/types/utils/block/Block';

export default class LoginPage extends Block {
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
        NoAccLink: new MainLink({
          ...MOCK.link,
          appEl: props.appEl,
          events: {
            click: (e: Event) => {
              e.preventDefault();
              this._appElement.changePage(ENV.PAGES.REGISTER_PAGE);
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
