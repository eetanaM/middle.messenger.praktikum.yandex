import type Block from "../block/Block";
import type { IRouteQuery, TPageBlock } from "../../types/services/navigation/Route";

export default class Route {
  protected _pathname: string;

  protected _blockClass: TPageBlock;

  protected _block: null | Block;

  protected _props: IRouteQuery;

  constructor(pathname: string, view: TPageBlock, props: IRouteQuery) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  private _appendToRoot(rootQuery: string, block: Block) {
    const rootEl = document.querySelector(rootQuery);

    if (rootEl) {
      rootEl.innerHTML = '';
      rootEl.appendChild(block.getContent());
    }
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
      this._block = new this._blockClass();
    }

    this._appendToRoot(this._props.rootQuery, this._block);
  }
}
