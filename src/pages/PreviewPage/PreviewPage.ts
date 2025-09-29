import { PreviewLink } from '../../components/partials';
import { PREVIEW_TEMPLATE_DATA as MOCK } from '../../utils/api/mocks/mockData';
import { Block } from '../../utils/block';

import type { IBlockProps } from '../../utils/types/utils/block/Block';

export default class PreviewPage extends Block {
  constructor(props: IBlockProps) {
    const links = MOCK.links.map((link) => new PreviewLink({
      pageSrc: link.pageSrc,
      textContent: link.textContent,
      events: {
        click: ((e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          const liEl = e.currentTarget as HTMLElement;
          const anchorEl = liEl.querySelector('a');
          if (anchorEl) {
            const { pagesrc } = anchorEl.dataset;
            if (pagesrc) {
              this._appElement.changePage(pagesrc);
            } else {
              throw new Error('No pagesrc data attribute found');
            }
          } else {
            throw new Error('No anchor element in the list element');
          }
        }),
      },
    }));

    super({
      ...props,
      links,
    });
  }

  override render() {
    return `<main>
                    <nav>
                        <ul class="preview-page__links">
                            {{{ blockList "links"}}}
                        </ul>
                    </nav>
                    <div id="modal">
                        <div class="modal__overlay"></div>
                        <div class="modal__content"></div> 
                    </div>
                </main>`;
  }
}

export type TPreviewPage = typeof PreviewPage;
