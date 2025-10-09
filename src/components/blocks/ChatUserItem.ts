import { Block } from "../../services/block";

import defaultAvatar from "../../../images/profile/avatar.png";
import { BASE_URL } from "../../utils/constants/consts";

import type { IBlockProps } from '../../types/services/block/Block';

class ChatUserItem extends Block {
  constructor(props: IBlockProps) {
    const { avatar, displayName, firstName } = props;
    const name = displayName || firstName || "Без имени";
    const avatarSrc = avatar ? `${BASE_URL}/resources${avatar}` : defaultAvatar;
    super({
      ...props,
      name,
      avatar: avatarSrc,
    });
  }

  override render() {
    return `<li id={{ chatUserId }} class="app__user-item">
                <img class="user-item__avatar" src="{{ avatar }}"/>
                <span class="user-item__name">{{ name }}</span>
                <button class="user-item__delete-button">X</button>
            </li>`;
  }
}

export default ChatUserItem;
