import EventBus from "./EventBus";
import Handlebars from "handlebars";
import { TemplateRenderer } from "./TemplateRenderer";
import { v4 as uuidv4 } from "uuid";

import { type IBlock, type IBlockEvents, type IBlockProps, type TEventHandlersList} from "./types/Block";
import type { Callback } from "./types/EventBus";

class Block implements IBlock {
    private static EVENTS: IBlockEvents = {
        FLOW_INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    }

    protected _element: HTMLElement
    protected props: IBlockProps
    protected children: Record<string, Block>
    protected lists: Record<string, any[]> // разобраться с any[]
    protected eventBus: () => EventBus
    protected _id: string

    constructor(propsWithChildren: IBlockProps = {}) {
        const uid = uuidv4();
        const eventBus = new EventBus();
        const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
        

        this.props = this._makePropsProxy({...props}) as IBlockProps;
        this.children = children;
        this.lists = this._makePropsProxy({...lists}) as Record<string, any[]>; // разобраться с any[]
        
        this._id = uid;

        this.eventBus = () => eventBus;

        this._registerEvents();
        eventBus.emit(Block.EVENTS.FLOW_INIT);
    }

    protected get element(): HTMLElement{
        return this._element;
    }

    private _registerEvents(): void {
        this.eventBus().on(Block.EVENTS.FLOW_INIT, this.init.bind(this) as Callback);
        this.eventBus().on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this) as Callback);
        this.eventBus().on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as Callback);
        this.eventBus().on(Block.EVENTS.FLOW_RENDER, this._render.bind(this) as Callback);
    }

    private _getChildrenPropsAndProps(propsWithChildren: IBlockProps): 
        { 
            props: IBlockProps, 
            children: Record<string, Block>, 
            lists: Record<string, Block[]>
        } {
            const props: IBlockProps = {};
            const children: Record<string, Block> = {};
            const lists: Record<string, Block[]> = {};

            Object.entries(propsWithChildren).forEach(([key, value]) => {
                if (value instanceof Block) {
                    children[key] = value;
                } else if (Array.isArray(value) && value.every(item => item instanceof Block)) {
                    lists[key] = value as Block[];
                } else {
                    props[key] = value;
                }
            });

        return { props, children, lists };
    }

    private _addEvents(): void {
        const events = this.props.events as TEventHandlersList;

        Object.keys(events).forEach((eventName) => {
            const handler = events[eventName];
            if (this._element && (typeof handler === 'function' || Array.isArray(handler))) {
                if (Array.isArray(handler)) {
                handler.forEach(h => this._element!.addEventListener(eventName, h));
            } else {
                this._element.addEventListener(eventName, handler);
            }
            }
        })
    }

    protected addAttributes(): void {
        const { attr= {} } = this.props;

        Object.entries(attr).forEach(([key, value]) => {
            if (this._element) {
                this._element.setAttribute(key, value as string)
            }
        })
    }

    protected init(): void {
        // this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
    }

    protected componentDidMount(): void {
        console.log();
    }

    public dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): void {
        const response = this.componentDidUpdate(oldProps, newProps);

        if (!response) {
            return
        }

        this._render()
    }

    protected componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
        console.log(oldProps, newProps);
        return true;
    }

    private _createDocumentElement(type: string): HTMLTemplateElement {
        return document.createElement(type) as HTMLTemplateElement
    }

    private _makePropsProxy(props: IBlockProps): IBlockProps | Record<string, Block[] | any []> {
    const self = this;

    return new Proxy(props, {
      get(target: any, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: any, prop: string, value: any) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });
  }

    public setProps = (nextProps?: IBlockProps): void => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    }

    private _render() {
        const propsAndStubs = { ...this.props };
        
        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        Object.entries(this.lists).forEach(([listName, listItems]) => {
            propsAndStubs[listName] = listItems
        });

        const fragment = this._createDocumentElement("template");
        const template = Handlebars.compile(this.render())
        fragment.content.appendChild(TemplateRenderer.renderTemplate(template, undefined, propsAndStubs))

        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        Object.entries(this.lists).forEach(([listName, listItems]) => {
            listItems.forEach((item) => {
                const stub = fragment.content.querySelector(`[data-id="list-${listName}-${item._id}"]`);
                if (stub && item instanceof Block) {
                    stub.replaceWith(item.getContent());
                }
            });
        });

        const newElement = fragment.content.firstElementChild as HTMLElement;
        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
        this.addAttributes();
    }

    protected render(): string | void {
        
    }

    public getContent(): HTMLElement {
        return this.element;
    }

    public show(): void {
        this.getContent().style.display = "block";
    }

    public hide(): void {
        this.getContent().style.display = "none";
    }
}

export default Block