import { Block } from '../../services/block';

import type { IBlockProps } from '../../types/services/block/Block';

class ProfileHeader extends Block {
  constructor(props?: IBlockProps) {
    super({
      ...props,
    });
  }

  override render() {
    return `<div class="profile__header">
                <img class="header__avatar" src={{ profileImg }} alt="Profile image">
                <h1 class="header__profile-name">{{ profileName }}</h1>
            </div>`;
  }
}

export default ProfileHeader;
