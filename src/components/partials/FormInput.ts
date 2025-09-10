import Block from "../../utils/Block";
import type { IBlockProps } from "../../utils/types/Block";

export default `<input 
type="{{type}}" 
name="{{name}}" 
{{#if placeholder}} placeholder="{{placeholder}}" {{/if}}
class="app__main-input"/>
<p id="{{name}}" class="app__invalid-input hidden">
    Невалидный input
</p>`

export class FormInput extends Block {
    constructor(props: IBlockProps) {
        super({
            ...props,
            events: {
                blur: (e: Event) => {
                    console.log("ClICKED");
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        })
    }

    override render() {
        return `<input 
                type="{{ type }}" 
                name="{{ name }}" 
                placeholder="{{ placeholder }}"
                class="app__main-input"
            />
            <p id="{{ name }}" class="app__invalid-input hidden">
                Невалидный input
            </p>`
    }
}

