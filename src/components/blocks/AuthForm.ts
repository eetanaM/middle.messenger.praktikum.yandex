import Block from "../../utils/Block"
import type { IBlockProps } from "../../utils/types/Block"
export default class AuthForm extends Block {
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