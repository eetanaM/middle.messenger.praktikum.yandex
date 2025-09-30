import Handlebars from 'handlebars';

import * as Pages from './pages';

import * as ENV from './utils/constants/consts';

import type { IApp, IAppState } from './types/App';
import type { IBlock } from './types/services/block/Block';

// Хелпер для создания заглушек для элементов массива
// В шаблоне вызывается как {{{ blockList "Имя массива"}}}
Handlebars.registerHelper('blockList', (listName, context) => {
  const items = context.data.root[listName];
  if (!Array.isArray(items)) return '';

  return items.map((item) => `<div data-id="list-${listName}-${item._id}"></div>`).join('');
});
export default class App implements IApp {
  state: IAppState;

  appElement: HTMLElement;

  modalRoot: HTMLElement;

  constructor() {
    this.state = {
      currentPage: ENV.PAGES.PREVIEW_PAGE,
      // currentChatItemId - временно для псевдонавигации по чатам
      accessToken: null,
      refreshToken: null,
    };
    const appEl = document.getElementById('app');
    const modalRoot = document.getElementById('modal');

    if (!appEl) {
      throw new Error('There is no app element in DOM');
    }

    if (!modalRoot) {
      throw new Error('There is no modal-root element in DOM');
    }

    this.appElement = appEl;
    this.modalRoot = modalRoot;
  }

  protected _replaceContent(page: IBlock) {
    if (this.appElement.firstElementChild) {
      this.appElement.firstElementChild.replaceWith(page.getContent());
    } else {
      this.appElement.appendChild(page.getContent());
    }
  }

  render() {
    let page;

    if (this.state.currentPage === ENV.PAGES.PREVIEW_PAGE) {
      page = new Pages.PreviewPage({
        appEl: this.app,
      });
    } else if (this.state.currentPage === ENV.PAGES.LOGIN_PAGE) {
      page = new Pages.LoginPage({
        appEl: this.app,
      });
    } else if (this.state.currentPage === ENV.PAGES.REGISTER_PAGE) {
      page = new Pages.RegisterPage({
        appEl: this.app,
      });
    } else if (this.state.currentPage === ENV.PAGES.MAIN_CONTENT_PAGE) {
      page = new Pages.MainContentPage({
        appEl: this.app,
      });
    } else if (this.state.currentPage === ENV.PAGES.PROFILE_PAGE) {
      page = new Pages.ProfilePage({
        appEl: this.app,
      });
    } else if (this.state.currentPage === ENV.PAGES.BAD_SERVER_PAGE) {
      page = new Pages.BadServerPage({
        appEl: this.app,
      });
    } else {
      page = new Pages.NotFoundPage({
        appEl: this.app,
      });
    }

    this._replaceContent(page);
  }

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

  get app() {
    return this;
  }

  changePage(page: string) {
    this.state.currentPage = page;
    this.render();
  }
}
