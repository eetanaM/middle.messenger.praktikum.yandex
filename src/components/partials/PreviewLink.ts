import Block from '../../utils/Block';
import type { IBlockProps } from '../../utils/types/Block';

export default class PreviewLink extends Block {
  constructor(props: IBlockProps) {
    super({
      ...props,
    });
  }

  override render() {
    return '<li><a data-pagesrc={{ pageSrc }} tabindex="1">{{ textContent }}</a></li>';
  }
}
