import { BaseController } from "../../controllers/Controller";
import { Block } from "../../services/block";

import type { IBlockProps } from '../../types/services/block/Block';
import { ERoutes } from "../../utils/constants/consts";

class MenuHeaderAvatar extends Block {
  constructor(props?: IBlockProps) {
    super({
      ...props,
      events: {
        click: () => {
          BaseController.router.go(ERoutes.PROFILE);
        },
      },
    });
  }

  override render() {
    return `<div class="menu-header__avatar">
                <img src={{ profileImgSrc }} alt="Profile photo">
            </div>`;
  }
}

export default MenuHeaderAvatar;
