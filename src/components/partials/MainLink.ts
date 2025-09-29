import { Block } from '../../utils/block';
import type { IBlockProps } from '../../utils/types/utils/block/Block';

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
