import Block from '../../utils/Block';

import type { IBlockProps } from '../../utils/types/Block';

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
