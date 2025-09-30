import { Block } from '../../services/block';

import navBtnSrc from '../../../images/nav-button.png';

import type { IBlockProps } from '../../types/services/block/Block';

export default class RoundButton extends Block {
  constructor(props?: IBlockProps) {
    super({
      ...props,
      navButtonSrc: navBtnSrc,
    });
  }

  override render() {
    return `<button class="app__nav-button">
                    <img src={{ navButtonSrc }} alt="Back arrow">
                </button>`;
  }
}
