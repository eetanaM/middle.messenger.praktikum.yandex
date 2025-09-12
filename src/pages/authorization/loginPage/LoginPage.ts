import Block from "../../../utils/Block";

import { AuthForm } from "../../../components/blocks";
import { Button, FormInput, MainLink } from "../../../components/partials";

import { LOGIN_TEMPLATE_DATA as MOCK } from "../../../mocks/mockData";
import * as ENV from "../../../utils/constants/consts"

import type { IBlockProps } from "../../../utils/types/Block";

export default class LoginPage extends Block {
    constructor(props: IBlockProps) {
        const inputs = MOCK.inputs.map((input) => {
            return new FormInput({
                type: input.type,
                name: input.name,
                placeholder: input.placeholder
            })
        })
        
        super({
            ...props,
            events: {},
            AuthForm: new AuthForm({
                logoUrl: MOCK.logoUrl,
                inputs: inputs,
                SubmitButton: new Button(MOCK.button),
                NoAccLink: new MainLink({
                    ...MOCK.link,
                    appEl: props.appEl,
                    events: {
                        click: (e: Event) => {
                            e.preventDefault();
                            this._appElement.changePage(ENV.PAGES.REGISTER_PAGE)
                        },
                    }
                }),
                PreviewLink: new MainLink({
                    ...MOCK.preview,
                    appEl: props.appEl,
                    events: {
                        click: (e: Event) => {
                            e.preventDefault();
                           this._appElement.changePage(ENV.PAGES.PREVIEW_PAGE)
                        }
                    }
                }),
                events: {}
            })
        })
    }

    override render() {
        return `<main class="authorization">
                    {{{ AuthForm }}}
                </main>`
    }
}

