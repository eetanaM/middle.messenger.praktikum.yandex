import Handlebars from 'handlebars';

import AuthController from './controllers/AuthController';

import * as Pages from './pages';
import { ERoutes } from './utils/constants/consts';

// Хелпер для создания заглушек для элементов массива
// В шаблоне вызывается как {{{ blockList "Имя массива"}}}
Handlebars.registerHelper('blockList', (listName, context) => {
  const items = context.data.root[listName];
  if (!Array.isArray(items)) return '';

  return items.map((item) => `<div data-id="list-${listName}-${item._id}"></div>`).join('');
});
export default class App {
  async initApp() {
    await AuthController.getUser();
    AuthController.router
      .use(ERoutes.LOGIN, Pages.LoginPage)
      .use(ERoutes.REGISTER, Pages.RegisterPage)
      .use(ERoutes.MESSENGER, Pages.MainContentPage)
      .use(ERoutes.PROFILE, Pages.ProfilePage)
      .use(ERoutes.BAD_SERVER, Pages.BadServerPage)
      .use(ERoutes.NOT_FOUND, Pages.NotFoundPage)
      .start();
  }
}
