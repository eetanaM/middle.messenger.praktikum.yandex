import { Block } from '../../services/block';

import FormInput from './FormInput';
import InvalidInput from './InvalidInput';

import type { IBlockProps, TAttributes } from '../../types/services/block/Block';

class FormInputWithValidation extends Block {
  constructor(props: IBlockProps) {
    const inputData = props.input as TAttributes;
    const invalidData = props.invalid as TAttributes;

    super({
      FormInput: new FormInput({
        ...inputData,
        value: props.value,
      }),
      InvalidInput: new InvalidInput({
        ...invalidData,
      }),
    });
  }

  override componentDidUpdate(_oldProps: IBlockProps, newProps: IBlockProps): boolean {
    this.children.FormInput.setProps({ value: newProps.value });
    return true;
  }

  override render() {
    return `<div class="app__main-input-with-validation">
                {{{ FormInput }}}
                {{{ InvalidInput }}}
            </div>`;
  }
}

export default FormInputWithValidation;
