import { Block } from '../../utils/block';
import type { IBlockProps } from '../../utils/types/utils/block/Block';

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
