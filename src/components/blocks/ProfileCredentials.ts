import { Block } from "../../services/block";
import type { IBlockProps } from '../../types/services/block/Block';

class ProfileCredentials extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
    });
  }

  override render() {
    return `<div class="profile__credentials">
                <ul>
                    <li class="credentials__credentials-item">
                        <span class="credentials-item__label">Почта</span>
                        <span class="credentials-item__value">{{ email }}</span>
                    </li>
                    <li class="credentials__credentials-item">
                        <span class="credentials-item__label">Логин</span>
                        <span class="credentials-item__value">{{ login }}</span>
                    </li>
                    <li class="credentials__credentials-item">
                        <span class="credentials-item__label">Имя</span>
                        <span class="credentials-item__value">{{ userFirstName }}</span>
                    </li>
                    <li class="credentials__credentials-item">
                        <span class="credentials-item__label">Фамилия</span>
                        <span class="credentials-item__value">{{ userLastName }}</span>
                    </li>
                    <li class="credentials__credentials-item">
                        <span class="credentials-item__label">Имя в чате</span>
                        <span class="credentials-item__value">{{ displayName }}</span>
                    </li>
                    <li class="credentials__credentials-item">
                        <span class="credentials-item__label">Телефон</span>
                        <span class="credentials-item__value">{{ phoneNumber }}</span>
                    </li>
                </ul>
            </div>`;
  }
}

export default ProfileCredentials;
