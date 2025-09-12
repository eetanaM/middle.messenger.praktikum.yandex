import Block from "../../utils/Block"
import type { IBlockProps } from "../../utils/types/Block"

export default `<form class="credentials__form">
        {{#each fileInputs}}
        {{> FileInput type=type name=name id=id src=src }}
        {{/each}}
        {{#each inputs}}
            {{> FormInput type=type name=name placeholder=placeholder }}
        {{/each}}
        {{#each button}}
            {{> Button id=id text=textContent }}
        {{/each}}
    </form>`

export class CredentialsForm extends Block {
    constructor(props: IBlockProps) {
        super({
            ...props,
            events: {}
        })
    }

    override render() {
        return `<form class="credentials__form">
                    {{ #each fileInputs }}
                        {{{ FileInput }}}
                    {{ /each }}
                    {{ #each inputs }}
                        {{{ FormInput }}}
                    {{ /each }}
                    {{ #each button }}
                        {{{ Button }}}
                    {{ /each }}
                </form>`
    }
}