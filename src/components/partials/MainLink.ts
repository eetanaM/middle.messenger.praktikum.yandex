import { Block } from "../../services/block";
import type { IBlockProps } from '../../types/services/block/Block';

class MainLink extends Block {
  constructor(props?: IBlockProps) {
    super({
      ...props,
    });
  }

  override render() {
    return '<a href="{{ href }}" id="{{ id }}" class="app__main-link">{{ textContent }}</a>';
  }
}

export default MainLink;
