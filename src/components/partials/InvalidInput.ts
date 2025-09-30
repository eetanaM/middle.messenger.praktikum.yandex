import { Block } from "../../services/block";
import type { IBlockProps } from '../../types/services/block/Block';

export default class InvalidInput extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
    });
  }

  override render() {
    return `<p id="{{ name }}" class="app__invalid-input hidden">
                    {{ textContent }}
                </p>`;
  }
}
