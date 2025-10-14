import { Block } from '../../services/block';
import type { IBlockProps } from '../../types/services/block/Block';

class Message extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
    });
  }

  override render() {
    return `<div class="messages-container__day-messages">
                <p class="day-messages__message {{ author }}">
                    {{ messageContent }}
                    <span class="app-timestamp">{{ timeStamp }}</span>
                </p>
            </div>`;
  }
}

export default Message;
