import { type IBlock } from "./types/Block";
import { v4 as uuidv4 } from "uuid";
import EventBus from "./EventBus";

interface BlockProps {
    [key: string]: Record<string, Block>[] | unknown[]
}
class Block implements IBlock {
    private static EVENTS: {[key: string]: string} = {
        FLOW_INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    }

    protected _element: HTMLElement
    protected props: BlockProps
    protected children: Record<string, Block>
    protected lists: Record<string, unknown[]>
    protected eventBus: () => EventBus
    protected _id: string

    constructor(propsWithChildren: BlockProps = {}) {
        const uid = uuidv4();
        const eventBus = new EventBus();
        const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren)

        this.props = props;
        this.children = children;
        this.lists = lists;

        this._id = uid
        this.eventBus = () => eventBus
    }

    protected get element(): HTMLElement{
        return this._element
    }

    protected _getChildrenPropsAndProps(propsWithChildren: BlockProps): 
        { 
            props: BlockProps, 
            children: Record<string, Block>, 
            lists: Record<string, unknown[]>
        } {
            const props: BlockProps = {}
            const children: Record<string, Block> = {}
            const lists: Record<string, unknown[]> = {}

            Object.entries(propsWithChildren).forEach(([key, value]) => {
                if (value instanceof Block) {
                    children[key] = value;
                } else if (Array.isArray(value)) {
                    lists[key] = value;
                } else {
                    props[key] = value;
                }
            });

        return { props, children, lists }
    }

    public init() {
        // this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
    }

    public componentDidMount(oldProps: BlockProps) {
        console.log(oldProps)
    }

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM)
    }

    public componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
        console.log(oldProps, newProps)
        return true
    }

    public setProps = (nextProps?: BlockProps) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    public render(): string | void {
        
    }

    public getContent(): HTMLElement {
        return this.element
    }

    public show() {
        this.getContent().style.display = "block";
    }

    public hide() {
        this.getContent().style.display = "none";
    }
}

export default Block