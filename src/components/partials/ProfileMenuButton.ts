import Block from '../../utils/Block';

import type { IBlockProps } from '../../utils/types/utils/Block';

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
