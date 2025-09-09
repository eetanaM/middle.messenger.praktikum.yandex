import Block from "../../utils/Block";
import type { IBlockProps } from "../../utils/types/Block";

export default `<a href="{{href}}" id="{{id}}" class="app__main-link">{{text}}</a>`

export class MainLink extends Block {
    constructor(props: IBlockProps) {
        super({
            ...props,
            events: {
                click: (e: Event) => {
                    console.log("ClICKED");
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        })
    }

    override render() {
        return `<a href="{{href}}" id="{{id}}" class="app__main-link">{{text}}</a>`
    }
}