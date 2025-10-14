import { Block } from '../../services/block';
import { BaseController } from '../../controllers/Controller';

import { MainLink } from '../../components/partials';

import { BAD_SERVER_TEMPLATE_DATA as MOCK } from '../../services/api/mocks/mockData';

import type { IBlockProps } from '../../types/services/block/Block';

class BadServerPage extends Block {
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
                        {{{ BackLink }}}
                    </nav>
                </main>`;
  }
}

export default BadServerPage;

export type TBadServerPage = typeof BadServerPage;
