import Block from "../../utils/Block";
import type { IBlockProps, TAttributes } from "../../utils/types/Block";
import FormInput from "./FormInput";
import InvalidInput from "./InvalidInput";

export default class FormInputWithValidation extends Block {
    constructor(props: IBlockProps) {
        const inputData = props.input as TAttributes;
        const invalidData = props.invalid as TAttributes;

        super({
            FormInput: new FormInput({
                ...inputData
            }),
            InvalidInput: new InvalidInput({
                ...invalidData
            })
        })
    }

    override render() {
        return `<div class="app__main-input-with-validation">
                    {{{ FormInput }}}
                    {{{ InvalidInput }}}
                </div>`
    }
}



                    