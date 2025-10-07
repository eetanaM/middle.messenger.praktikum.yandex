import { Block } from "../../services/block";
import type { IBlockProps } from '../../types/services/block/Block';

class ListOf extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
      List: props.items,
    });
  }

  override render() {
    return `<div class="wrapper" style="display:flex; flex-direction:column">
                {{{ blockList "List" }}}
            </div>`;
  }
}

export default ListOf;
