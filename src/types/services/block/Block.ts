import type { Block } from "../../../services/block";
import type { TChatDetails } from "../store/Store";

type TEventHandler = (event: Event) => void;
type TEventHandlersList = {
  [eventName: string]: TEventHandler | TEventHandler[]
};
type TAttributes = {
  [key: string]: string
};

type TBlockPropValue =
| Block
| Block[]
| TAttributes
| string
| number
| boolean
| TEventHandler
| TEventHandlersList
| Array<TChatDetails>;
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
  [key: string]: TBlockPropValue
}

export type {
  TAttributes,
  TBlockPropValue,
  TEventHandlersList,
  IBlock,
  IBlockProps,
  IBlockEvents,
};
