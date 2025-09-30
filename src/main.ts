import './styles/main.less';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.initStore();
  app.initRouter();
});
