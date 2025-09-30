import Handlebars from 'handlebars';

import { Router } from './services/navigation';
import * as Pages from './pages';

import { ERoutes } from './utils/constants/consts';
import type { IApp } from './types/App';
import { Store } from './services/store';

// Хелпер для создания заглушек для элементов массива
// В шаблоне вызывается как {{{ blockList "Имя массива"}}}
Handlebars.registerHelper('blockList', (listName, context) => {
  const items = context.data.root[listName];
  if (!Array.isArray(items)) return '';

  return items.map((item) => `<div data-id="list-${listName}-${item._id}"></div>`).join('');
});
export default class App implements IApp {
  modalRoot: HTMLElement;

  initRouter() {
    window.router = Router;

    window.router
      .use(ERoutes.LOGIN, Pages.ProfilePage)
      .use(ERoutes.REGISTER, Pages.RegisterPage)
      .use(ERoutes.MESSENGER, Pages.MainContentPage)
      .use(ERoutes.PROFILE, Pages.ProfilePage)
      .use(ERoutes.BAD_SERVER, Pages.BadServerPage)
      .use(ERoutes.NOT_FOUND, Pages.NotFoundPage)
      .start();
  }

  initStore() {
    window.store = Store;
  }
}
