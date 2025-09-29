import { Block } from '../../utils/block';

import type { IBlockProps } from '../../utils/types/utils/block/Block';

export default class ProfileMenuButton extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
    });
  }

  override render() {
    return `<button 
                    id="{{ id }}" 
                    class="{{ class }}"
                >
                    {{ textContent }}
                </button>`;
  }
}
