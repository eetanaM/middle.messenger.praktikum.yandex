import Block from '../../utils/Block';
import type { IBlockProps } from '../../utils/types/Block';

export default class MainLink extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
    });
  }

  override render() {
    return '<a href="{{ href }}" id="{{ id }}" class="app__main-link">{{ textContent }}</a>';
  }
}
