import type Block from "../Block"

type TEventHandler = (event: Event) => void
type TEventHandlersList = {
    [eventName: string]: TEventHandler | TEventHandler[]
}
type TAttributes = {
    [key: string]: string
}
interface IBlock {
    dispatchComponentDidMount(): void,
    setProps(newProps?: unknown): void,
    getContent(): HTMLElement,
    show(): void,
    hide(): void,
}
interface IBlockEvents {
    [key: string]: string
}

interface IBlockProps {
    [key: string]: 
    | Block
    | Block[] 
    | TAttributes
    | string
    | number
    | boolean
    | TEventHandlersList
    | { _stub: string }[]
}

export type {
    TAttributes,
    TEventHandlersList,
    IBlock,
    IBlockProps,
    IBlockEvents,
}
