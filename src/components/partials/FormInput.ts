import Block from '../../utils/Block';
import type { IBlockProps } from '../../utils/types/Block';
import testValidation from '../../utils/api/testValidation';

export default class FormInput extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
      events: {
        blur: ((e: Event) => {
          e.preventDefault();
          if (e.target instanceof HTMLInputElement) {
            const inputName = e.target.name;
            const inputValue = e.target.value;
            const invalidInputLabel = document.getElementById(inputName);

            if (inputValue === '' || testValidation(inputName, inputValue)) {
              console.log('Validation passed on input: ', inputName);
              invalidInputLabel?.setAttribute('class', 'app__invalid-input hidden');
            } else {
              console.log('Validation failed on input: ', inputName);
              invalidInputLabel?.setAttribute('class', 'app__invalid-input');
            }
          }
        }),
      },
    });
  }

  override render() {
    return `<input 
              type="{{ type }}" 
              name="{{ name }}" 
              placeholder="{{ placeholder }}"
              class="app__main-input"
          />`;
  }
}
