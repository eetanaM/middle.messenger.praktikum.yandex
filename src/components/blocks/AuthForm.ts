import { Block } from '../../services/block';
import type { IBlockProps } from '../../types/services/block/Block';

class AuthForm extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
    });
  }

  override render() {
    return `<form class="authorization__auth-form">
                <img src={{ logoUrl }} class="app__main-logo" alt="Логотип">
                {{{ blockList "inputs" }}}
                {{{ SubmitButton }}}
                {{{ NoAccLink }}}
                {{{ AlreadyHasAccLink }}}
            </form>`;
  }
}

export default AuthForm;
