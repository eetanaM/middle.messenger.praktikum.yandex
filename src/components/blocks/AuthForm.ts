import Block from "../../utils/Block"
import type { IBlockProps } from "../../utils/types/Block"

export default `<form class="authorization__auth-form">
        <img src={{ logoUrl }} class="app__main-logo" alt="Логотип">
        {{#each inputs}}
            {{> FormInput type=type name=name placeholder=placeholder }}
        {{/each}}
        {{> Button id=button.ID text=button.textContent }}
        {{> MainLink href=link.href id=link.id text=link.textContent }}
        {{> MainLink href=preview.href id=preview.id text=preview.textContent }}
    </form>`

export class AuthForm extends Block {
    constructor(props: IBlockProps) {
        super({
            ...props,
            events: {}
        })
    }

    override render() { // вернуть {{{ inputs }}}
        return `<form class="authorization__auth-form">
                    <img src={{ logoUrl }} class="app__main-logo" alt="Логотип">
                    {{{ inputs }}}
                    {{{ SubmitButton }}}
                    {{{ NoAccLink }}}
                    {{{ AlreadyHasAccLink }}}
                    {{{ PreviewLink }}}
                </form>`
    }
}