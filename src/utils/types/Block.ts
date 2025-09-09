interface IBlock {
    dispatchComponentDidMount(): void,
    setProps(newProps?: unknown): void,
    getContent(): HTMLElement,
    show(): void,
    hide(): void
}

export type {
    IBlock
}