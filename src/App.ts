import Handlebars from 'handlebars';

import { Router } from './services/navigation';
import * as Pages from './pages';

import { ERoutes } from './utils/constants/consts';
import type { IApp } from './types/App';
import type { IBlock } from './types/services/block/Block';

// Хелпер для создания заглушек для элементов массива
// В шаблоне вызывается как {{{ blockList "Имя массива"}}}
Handlebars.registerHelper('blockList', (listName, context) => {
  const items = context.data.root[listName];
  if (!Array.isArray(items)) return '';

  return items.map((item) => `<div data-id="list-${listName}-${item._id}"></div>`).join('');
});
export default class App implements IApp {
  modalRoot: HTMLElement;

  initRouter = () => {
    window.router = Router;

    window.router
      .use(ERoutes.LOGIN, Pages.LoginPage)
      .use(ERoutes.REGISTER, Pages.RegisterPage)
      .use(ERoutes.MESSENGER, Pages.MainContentPage)
      .use(ERoutes.PROFILE, Pages.ProfilePage)
      .use(ERoutes.BAD_SERVER, Pages.BadServerPage)
      .use(ERoutes.NOT_FOUND, Pages.NotFoundPage)
      .start();
  };

  toggleModal(block: IBlock) {
    const modalContentEl = this.modalRoot.querySelector('.modal__content');
    const modalOverlay = this.modalRoot.querySelector('.modal__overlay');
    const overlayClickHandler = () => this.toggleModal(block);

    if (modalContentEl && modalOverlay) {
      if (modalContentEl.childElementCount !== 0) {
        modalContentEl.innerHTML = '';
        this.modalRoot.removeAttribute('class');
        modalOverlay.replaceWith(modalOverlay.cloneNode(true));
      } else {
        modalContentEl.appendChild(block.getContent());
        this.modalRoot.setAttribute('class', 'opened');
        modalOverlay.addEventListener('click', overlayClickHandler);
      }
    }
  }
}
