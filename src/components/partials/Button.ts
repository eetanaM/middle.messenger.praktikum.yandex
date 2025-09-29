import { Block } from '../../utils/block';

import type { IBlockProps } from '../../utils/types/utils/block/Block';

export default class Button extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
      events: {},
    });
  }

  override render() {
    return `<button 
                    id="{{ id }}" 
                    class="app__main-button"
                    type="{{ type }}"
                >
                    {{ textContent }}
                </button>`;
  }
}
