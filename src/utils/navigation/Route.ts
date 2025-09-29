import type Block from "../block/Block";
import type { IBlockProps } from "../types/utils/block/Block";
import type { TPageBlock } from "../types/utils/navigation/Route";

export default class Route {
  protected _pathname: string;

  protected _blockClass: TPageBlock;

  protected _block: null | Block;

  protected _props: IBlockProps;

  constructor(pathname: string, view: TPageBlock, props: IBlockProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);
    }
  }
}
