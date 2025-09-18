import Block from '../../utils/Block';

import * as ENV from '../../utils/constants/consts';

import navBtnSrc from '../../../images/nav-button.png';

import type { IBlockProps } from '../../utils/types/Block';

export default class RoundButton extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
      navButtonSrc: navBtnSrc,
      events: {
        click: ((e: Event) => {
          e.preventDefault();
          this._appElement.changePage(ENV.PAGES.PREVIEW_PAGE);
        }),
      },
    });
  }

  override render() {
    return `<button class="app__nav-button">
                    <img src={{ navButtonSrc }} alt="Back arrow">
                </button>`;
  }
}
