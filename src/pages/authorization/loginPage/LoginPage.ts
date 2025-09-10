import Block from "../../../utils/Block"

import { AuthForm } from "../../../components/blocks/AuthForm"
import { FormInput } from "../../../components/partials/FormInput"
import { Button } from "../../../components/partials/Button"
import { MainLink } from "../../../components/partials/MainLink"

import { LOGIN_TEMPLATE_DATA as MOCK } from "../../../mocks/mockData"
import logoUrl from "../../../../images/logo/logo.png"

export default class LoginPage extends Block {
    constructor() {
        console.log("Rendering Login page")
        super({
            events: {},
            AuthForm: new AuthForm({
                logoUrl: logoUrl,
                inputs: MOCK.inputs.map((data) => {
                    return new FormInput({
                        type: data.type,
                        name: data.name,
                        placeholder: data.placeholder
                    })
                }),
                SubmitButton: new Button(MOCK.button),
                NoAccLink: new MainLink(MOCK.link),
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