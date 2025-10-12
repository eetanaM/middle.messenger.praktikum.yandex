import { Block } from '../../services/block';
import type { IBlockProps } from '../../types/services/block/Block';

class SendMessageForm extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
    });
  }

  override render() {
    return `<form action="" class="footer__send-message-form">
                {{{ FormInput }}}
                <button type="submit" class="send-message-form__send-button">
                    <img src={{ sendButton }}  alt="Arrow">
                </button>
            </form>`;
  }
}

export default SendMessageForm;
