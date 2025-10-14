import { Block } from "../../services/block";

import defaultAvatar from "../../../images/profile/avatar.png";
import { BASE_URL } from "../../utils/constants/consts";

import type { IBlockProps } from '../../types/services/block/Block';
import DeleteButton from "./DeleteButton";

class ChatUserItem extends Block {
  constructor(props: IBlockProps) {
    const { avatar, displayName, firstName } = props;
    const name = displayName || firstName || "Без имени";
    const avatarSrc = avatar ? `${BASE_URL}/resources${avatar}` : defaultAvatar;
    super({
      ...props,
      name,
      avatar: avatarSrc,
      DeleteButton: new DeleteButton({
        id: props.chatUserId,
      }),
    });
  }

  override render() {
    return `<li id="user-{{ chatUserId }}" class="app__user-item">
                <img class="user-item__avatar" src="{{ avatar }}"/>
                <span class="user-item__name">{{ name }}</span>
                {{{ DeleteButton }}}
            </li>`;
  }
}

export default ChatUserItem;
