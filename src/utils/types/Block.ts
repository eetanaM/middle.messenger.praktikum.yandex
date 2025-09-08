interface IBlock {
    init(): void,
    componentDidMount(oldProps: unknown): void,
    dispatchComponentDidMount(): void,
    componentDidUpdate(oldProps: unknown, newProps: unknown): void,
    setProps(newProps?: unknown): void,
    render(): string | void,
    getContent(): HTMLElement,
    show(): void,
    hide(): void
}

export type {
    IBlock
}