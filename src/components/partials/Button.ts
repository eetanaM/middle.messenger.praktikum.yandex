import { Block } from "../../services/block";

import type { IBlockProps } from '../../types/services/block/Block';

export default class Button extends Block {
  constructor(props?: IBlockProps) {
    super({
      ...props,
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
