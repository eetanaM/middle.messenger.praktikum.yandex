import { Block } from "../../services/block";
import type { IBlockProps } from '../../types/services/block/Block';
import parseDate from "../../utils/helpers/parseDate";

class ChatItem extends Block {
  constructor(props: IBlockProps) {
    const timeStamp = props.timeStamp as string;
    const unreadMessagesCount = props.unreadMessagesCount as number;
    const disabled = unreadMessagesCount < 1 ? "disabled" : "";

    super({
      ...props,
      time: parseDate(timeStamp, {
        day: '2-digit',
        month: 'short',
      }),
      disabled,
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
                  <span class="messages-count__time-stamp">{{ time }}</span>
                  <div class="messages-count__counter {{ disabled }}">
                      <p>{{ unreadMessagesCount }}</p>
                  </div>
              </div>
          </div>`;
  }
}

export default ChatItem;
