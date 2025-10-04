import { Block } from '../../services/block';
import connect from '../../services/store/connect';

import { MenuHeaderAvatar } from '../partials';

import defaultAvatarImg from '../../../images/profile/avatar.png';

import type { IBlockProps } from '../../types/services/block/Block';

class MenuHeader extends Block {
  constructor(props: IBlockProps) {
    const AvatarComponent = connect((state) => ({
      profileImgSrc: state.auth?.user?.avatar || defaultAvatarImg,
    }))(MenuHeaderAvatar);

    super({
      ...props,
      Avatar: new AvatarComponent({}),
    });
  }

  override render() {
    return `<div class="menu__menu-header">
                {{{ Avatar }}}
                <span class="menu-header__profile-name">{{ profileName }}</span>
            </div>`;
  }
}

export default MenuHeader;
