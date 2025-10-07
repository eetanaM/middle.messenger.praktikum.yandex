import { Block } from '../../services/block';

import type { IBlockProps } from '../../types/services/block/Block';

class CredentialsForm extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
    });
  }

  override render() {
    return `<form class="credentials__form">
                    {{{ ProfileAvatarInput }}}
                    {{{ blockList "inputs" }}}
                    {{{ SubmitButton }}}
                    {{{ ResetButton }}}
                </form>`;
  }
}

export default CredentialsForm;
