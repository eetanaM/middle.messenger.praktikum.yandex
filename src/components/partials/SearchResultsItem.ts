import { Block } from "../../services/block";

import defaultAvatar from "../../../images/profile/avatar.png";

import type { IBlockProps } from "../../types/services/block/Block";
import { BASE_URL } from "../../utils/constants/consts";

class SearchResultItem extends Block {
  constructor(props: IBlockProps) {
    const {
      avatar,
      displayName,
      firstName,
      id,
    } = props;
    const name = displayName || firstName || "Без имени";
    const avatarSrc = avatar ? `${BASE_URL}/resources${avatar}` : defaultAvatar;

    super({
      ...props,
      name,
      avatar: avatarSrc,
      id,
    });
  }

  override render() {
    return `
      <li class="search-result-item">
        <img class="search-result-item__avatar" src="{{ avatar }}" alt="User avatar" />
        <span class="search-result-item__name">{{ name }}</span>
        <span class="search-result-item__id">id: {{ id }}</span>
      </li>
    `;
  }
}

export default SearchResultItem;
