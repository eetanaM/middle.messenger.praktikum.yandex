import Block from "../../../utils/Block";

import { AuthForm } from "../../../components/blocks";
import { Button, FormInput, MainLink } from "../../../components/partials";

import { REGISTER_TEMPLATE_DATA as MOCK } from "../../../mocks/mockData";

import logoUrl from "../../../../images/logo/logo.png";

export default class RegisterPage extends Block {
    constructor() {
        super({
            events: {},
            AuthForm: new AuthForm({
                logoUrl: logoUrl,
                inputs: [],
                SubmitButton: new Button(MOCK.button),
                AlreadyHasAccLink: new MainLink(MOCK.link),
                PreviewLink: new MainLink(MOCK.preview),
                events: {}
            })
        })
    }

    override render() {
        return `<div id="app">
                <main class="authorization">
                    {{{ AuthForm }}}
                </main>
                <div id="modal">
                    <div class="modal__overlay"></div>
                    <div class="modal__content"></div> 
                </div>
            </div>`
    }
}