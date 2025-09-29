import { Block } from '../../utils/block';
import type { IBlockProps } from '../../utils/types/utils/block/Block';

export default class InvalidInput extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
      events: {},
    });
  }

  override render() {
    return `<p id="{{ name }}" class="app__invalid-input hidden">
                    {{ textContent }}
                </p>`;
  }
}
