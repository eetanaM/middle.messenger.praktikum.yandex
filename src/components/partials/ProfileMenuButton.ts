import { Block } from "../../services/block";

import type { IBlockProps } from '../../types/services/block/Block';

class ProfileMenuButton extends Block {
  constructor(props?: IBlockProps) {
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

export default ProfileMenuButton;
