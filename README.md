[![Netlify Status](https://api.netlify.com/api/v1/badges/72d4f21e-c49c-43d9-bec1-28e12c6fbf55/deploy-status)](https://app.netlify.com/projects/course-messenger/deploys)
<div align="center">
  <h1>Веб-мессенджер "Курс"</h1>
</div>

### Описание:

Веб-мессенджер "Курс" - результат проектной работы курса "Мидл фронтенд-разработчик" от Yandex Practicum. Проект представляет собой SPA веб-чат, в котором реализуются следующие функции:
- авторизация (регистрация/вход в личный кабинет);
- просмотр ленты чатов и ленты сообщений в каждом отдельном чате;
- отправка сообщений;
- создание/удаление чатов;
- добавление/удаление пользователей в/из чата;
- поиск по всем чатам;
- редактирование профиля (изменение аватара и текстовых данных профиля)
<hr>

### Текущая версия:
<b>Проект в стадии разработки</b>
<br>
<br>
Текущая версия: <b>0.2.0</b>
<br>
<br>
Список изменений, добавленных в последнем патче:
- небольшие изменения дизайна;
- подключен backend для регистрации/авторизации учетной записи и управления чатами;
- подключен сервис отправки сообщений;
- подключен роутинг;
- подключено централизованное хранилище;
- подключен поиск (требует доработки, работает только для поиска 20 первых пользователей соответствующих логину, отображает имя и id для добавления пользователя в чат);
<hr>

### Демо проекта:
С макетом экранов приложения можно ознакомиться по ссылке: https://www.figma.com/proto/t5fcrqjEy9YinVNbGmYc5g/praktikum-webchat?node-id=1-2&p=f&m=draw&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1
<br>
Ознакомиться с демо проекта можно по ссылке: https://course-messenger.netlify.app/
<br>

### Инициализация проекта:

Скопируйте репозиторий:
<br>
`git clone https://github.com/eetanaM/middle.messenger.praktikum.yandex.git`
<br>
<br>
Установите зависимости:
<br>
`npm install`
<br>
<br>
Для запуска проекта в dev режиме:
<br>
`npm run dev`
<br>
<br>
Для сборки проекта и запуска express сервера:
<br>
`npm run start`
<br>
<br>
Для сборки готового для деплоя проекта:
<br>
`npm run build`
<br>

<hr>

### Технологический стек:

<div align="left">
  <br/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" title="CSS3" alt="CSS3" width="40" height="40"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-plain.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/less/less-plain-wordmark.svg" title="Less" alt="Less" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/handlebars/handlebars-original-wordmark.svg" title="Handlebars" alt="Handlebars" width="40" height="40"/>
  <img src="https://github.com/devicons/devicon/blob/master/icons/figma/figma-original.svg" title="Figma" alt="Figma" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/eslint/eslint-original.svg" title="Eslint" alt="Eslint" width="40" height="40"/>&nbsp;
</div>
