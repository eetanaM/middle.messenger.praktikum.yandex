import Block from "../../utils/Block";
import type { IBlockProps } from "../../utils/types/Block";

export default `<input 
type="file" 
name="{{name}}" 
id="{{id}}"
class="app__file-input"/>
<label for="{{id}}" class="app__file-input-button">
    <img class="app__file-input-image" src="{{src}}" alt="Profile image" />
</label>`

export class FileInput extends Block {
    constructor(props: IBlockProps) {
        super({
            ...props,
            events: {}
        })
    }

    override render() {
        return `<input 
                type="file" 
                name="{{ name }}" 
                id="{{ id }}"
                class="app__file-input"
            />
            <label for="{{ id }}" class="app__file-input-button">
                <img class="app__file-input-image" src="{{ src }}" alt="Profile image" />
            </label>`
    }
}

