import { Block } from '../../services/block';

import { MainLink } from '../../components/partials';

import { BAD_SERVER_TEMPLATE_DATA as MOCK } from '../../services/api/mocks/mockData';

import type { IBlockProps } from '../../types/services/block/Block';

export default class BadServerPage extends Block {
  constructor(props?: IBlockProps) {
    super({
      ...props,
      notFoundLogoSrc: MOCK.notFoundLogoSrc,
      events: {},
      PreviewLink: new MainLink({
        ...MOCK.preview,
        events: {
          click: ((e: Event) => {
            e.preventDefault();
            // this._appElement.changePage(ENV.PAGES.PREVIEW_PAGE); пофиксить переход
          }),
        },
      }),
    });
  }

  override render() {
    return `<main class="bad-server">
                    <div class="bad-server__logo">
                        <img src={{ notFoundLogoSrc }} alt="logo">
                        <h1>Что-то с сервером. Чиним...</h1>
                    </div>
                    <div class="bad-server__500">
                        <h2>500</h2>
                        <p>Internal server error</p>
                    </div>
                    <nav>
                        {{{ PreviewLink }}}
                    </nav>
                </main>`;
  }
}

export type TBadServerPage = typeof BadServerPage;
