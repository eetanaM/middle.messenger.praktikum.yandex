import { Block } from '../../services/block';
import { BaseController } from '../../controllers/Controller';

import { MainLink } from '../../components/partials';

import { NOT_FOUND_TEMPLATE_DATA as MOCK } from '../../services/api/mocks/mockData';

import type { IBlockProps } from '../../types/services/block/Block';

class NotFoundPage extends Block {
  constructor(props?: IBlockProps) {
    super({
      ...props,
      notFoundLogoSrc: MOCK.notFoundLogoSrc,
      events: {},
      BackLink: new MainLink({
        ...MOCK.back,
        events: {
          click: ((e: Event) => {
            e.preventDefault();
            BaseController.router.back();
          }),
        },
      }),
    });
  }

  override render() {
    return `<main class="not-found">
                    <div class="not-found__logo">
                        <img src={{ notFoundLogoSrc }} alt="logo">
                        <h1>Упс, кажется Вы сбились с курса...</h1>
                    </div>
                    <div class="not-found__404">
                        <h2>404</h2>
                        <p>Page not found</p>
                    </div>
                    <nav>
                        {{{ BackLink }}}
                    </nav>
                </main>`;
  }
}

export default NotFoundPage;

export type TNotFoundPage = typeof NotFoundPage;
