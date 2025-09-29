import { Block } from '../../utils/block';
import type { IBlockProps } from '../../utils/types/utils/block/Block';

export default class ChatItem extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
    });
  }

  override render() {
    return `<div id={{ chatItemId }} class="chat-item" tabindex="1">
                    <div class="chat-item__avatar">
                        <img src={{ avatarSrc }} alt="Profile photo">
                    </div>
                    <div class="chat-item__chat-info">
                        <h3 class="chat-info__chat-name">{{ chatName }}</h3>
                        <p class="chat-info__last-message">
                            {{ lastMessage }}
                        </p>
                    </div>
                    <div class="chat-item__messages-count">
                        <span class="messages-count__time-stamp">{{ timeStamp }}</span>
                        <div class="messages-count__counter {{ disabled }}">
                            <p>{{ unreadMessagesCount }}</p>
                        </div>
                    </div>
                </div>`;
  }
}
