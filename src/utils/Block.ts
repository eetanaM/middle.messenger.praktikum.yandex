import { type IBlock } from "./types/Block";


class Block implements IBlock {
    private static EVENTS: {[key: string]: string} = {
        FLOW_INIT: "flow:init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
    }

    _meta: object | null  = null
    _element: HTMLElement | null = null
    props: object | null = null

    constructor(type: string = "div", props: object = {}) {
        this._meta = { type, props }
    }
}

export default Block