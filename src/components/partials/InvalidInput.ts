import Block from '../../utils/Block';
import type { IBlockProps } from '../../utils/types/utils/Block';

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
