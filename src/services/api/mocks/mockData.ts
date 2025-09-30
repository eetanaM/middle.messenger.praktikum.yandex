import logo from '../../../../images/logo/logo.png';
import avatar from '../../../../images/profile/avatar.png';
import profileDefault from '../../../../images/profile/profileDefault.png';
import navButtonSrc from '../../../../images/nav-button.png';
import notFoundLogoSrc from '../../../../images/logo/logo404.png';
import menuButton from '../../../../images/chat/menu1.png';
import mockImg from '../../../../images/chat/mockimage.png';
import paperClip from '../../../../images/chat/paperclip.png';
import sendButton from '../../../../images/chat/send.png';

import { TemplateRenderer } from '../../block';

import type {
  // eslint-disable-next-line max-len
  AuthDataTemplate, ChangeCredentialsFormDataTemplate, ChatDetailsDataTemplate, ErrorPageDataTemplate, MainContentDataTemplate, ProfileDataTemplate,
} from '../../../types/services/api/mockData';

export const LOGIN_TEMPLATE_DATA: AuthDataTemplate = {
  logoUrl: logo,
  inputs: [
    {
      inputData: {
        type: 'text', name: 'login', placeholder: 'Email/Login',
      },
      invalidInputData: {
        name: 'login',
        // eslint-disable-next-line max-len
        textContent: 'Неверный формат ввода. Поле должно содержать 3 до 20 символов, без пробелов, без спецсимволов (кроме нижнего подчеркивания и дефиса), хотя бы с 1 латинской буквой',
      },
    },
    {
      inputData: {
        type: 'password', name: 'password', placeholder: 'Пароль',
      },
      invalidInputData: {
        name: 'password',
        // eslint-disable-next-line max-len
        textContent: 'Неверный формат ввода. Поле должно содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
      },
    },
  ],
  button: {
    id: 'login-button',
    textContent: TemplateRenderer.escapeHtml('Войти'),
    type: "submit",
  },
  link: {
    href: '#',
    id: 'no-acc',
    textContent: TemplateRenderer.escapeHtml('Нет аккаунта?'),
  },
  preview: {
    href: '#',
    id: 'preview',
    textContent: TemplateRenderer.escapeHtml('Вернуться к превью'),
  },
};

export const REGISTER_TEMPLATE_DATA: AuthDataTemplate = {
  logoUrl: logo,
  inputs: [
    {
      inputData: {
        type: 'email', name: 'email', placeholder: 'Email',
      },
      invalidInputData: {
        name: 'email',
        textContent: 'Неверный формат ввода. Допустимый формат ввода: example@mail.com',
      },
    },
    {
      inputData: {
        type: 'login', name: 'login', placeholder: 'Логин',
      },
      invalidInputData: {
        name: 'login',
        // eslint-disable-next-line max-len
        textContent: 'Неверный формат ввода. Поле должно содержать 3 до 20 символов, без пробелов, без спецсимволов (кроме нижнего подчеркивания и дефиса), хотя бы с 1 латинской буквой',
      },
    },
    {
      inputData: {
        type: 'text', name: 'first_name', placeholder: 'Имя',
      },
      invalidInputData: {
        name: 'first_name',
        // eslint-disable-next-line max-len
        textContent: 'Неверный формат ввода. Поле не должно содержать пробелов, цифр и спецсимволов (кроме дефиса), первая буква - заглавная',
      },
    },
    {
      inputData: {
        type: 'text', name: 'second_name', placeholder: 'Фамилия',
      },
      invalidInputData: {
        name: 'second_name',
        // eslint-disable-next-line max-len
        textContent: 'Неверный формат ввода. Поле не должно содержать пробелов, цифр и спецсимволов (кроме дефиса), первая буква - заглавная',
      },
    },
    {
      inputData: {
        type: 'tel', name: 'phone', placeholder: 'Телефон',
      },
      invalidInputData: {
        name: 'phone',
        // eslint-disable-next-line max-len
        textContent: 'Неверный формат ввода. Поле должно содержать от 10 до 15 цифр. Допустимый формат ввода: 123456789 / +123456789',
      },
    },
    {
      inputData: {
        type: 'password', name: 'password', placeholder: 'Пароль',
      },
      invalidInputData: {
        name: 'password',
        // eslint-disable-next-line max-len
        textContent: 'Неверный формат ввода. Поле должно содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
      },
    },
  ],
  button: {
    id: 'register-button',
    textContent: TemplateRenderer.escapeHtml('Зарегистрироваться'),
    type: "submit",
  },
  link: {
    href: '#',
    id: 'no-acc',
    textContent: TemplateRenderer.escapeHtml('Уже есть аккаунт?'),
  },
  preview: {
    href: '#',
    id: 'preview',
    textContent: TemplateRenderer.escapeHtml('Вернуться к превью'),
  },
};

export const MAIN_CONTENT_TEMPLATE_DATA: MainContentDataTemplate = {
  profileImgSrc: avatar,
  preview: {
    href: '#',
    id: 'preview',
    textContent: TemplateRenderer.escapeHtml('Вернуться к превью'),
  },
  searchInput: {
    inputData: {
      type: 'text', name: 'search', placeholder: 'Поиск',
    },
  },
  chatItems: [
    {
      avatarSrc: avatar,
      chatName: TemplateRenderer.escapeHtml('Chat Name'),
      lastMessage: TemplateRenderer.escapeHtml('Any text typed in last message column of the chat item'),
      timeStamp: TemplateRenderer.escapeHtml('15:35'),
      disabled: '',
      unreadMessagesCount: TemplateRenderer.escapeHtml(1),
      chatItemId: '1',
    },
    {
      avatarSrc: avatar,
      chatName: TemplateRenderer.escapeHtml('Chat Name'),
      lastMessage: TemplateRenderer.escapeHtml('Last message'),
      timeStamp: TemplateRenderer.escapeHtml('14:12'),
      disabled: 'disabled',
      unreadMessagesCount: TemplateRenderer.escapeHtml(0),
      chatItemId: '2',
    },
    {
      avatarSrc: avatar,
      chatName: TemplateRenderer.escapeHtml('Chat Name'),
      lastMessage: TemplateRenderer.escapeHtml('Last message'),
      timeStamp: TemplateRenderer.escapeHtml('Вчера'),
      disabled: 'disabled',
      unreadMessagesCount: TemplateRenderer.escapeHtml(0),
      chatItemId: '3',
    },
    {
      avatarSrc: avatar,
      chatName: TemplateRenderer.escapeHtml('Chat Name'),
      lastMessage: TemplateRenderer.escapeHtml('Last message'),
      timeStamp: TemplateRenderer.escapeHtml('Пн'),
      disabled: '',
      unreadMessagesCount: TemplateRenderer.escapeHtml(4),
      chatItemId: '4',
    },
    {
      avatarSrc: avatar,
      chatName: TemplateRenderer.escapeHtml('Chat Name'),
      lastMessage: TemplateRenderer.escapeHtml('Last message'),
      timeStamp: TemplateRenderer.escapeHtml('Вс'),
      disabled: 'disabled',
      unreadMessagesCount: TemplateRenderer.escapeHtml(0),
      chatItemId: '5',
    },
    {
      avatarSrc: avatar,
      chatName: TemplateRenderer.escapeHtml('Chat Name'),
      lastMessage: TemplateRenderer.escapeHtml('Last message'),
      timeStamp: TemplateRenderer.escapeHtml('01 авг.'),
      disabled: 'disabled',
      unreadMessagesCount: TemplateRenderer.escapeHtml(0),
      chatItemId: '6',
    },
  ],
};

export const CHAT_DETAILS_TEMPLATE_DATA: ChatDetailsDataTemplate = {
  form: {
    inputData: {
      type: 'text', name: 'message', placeholder: 'Введите сообщение...',
    },
  },
  icons: {
    menuButton,
    mockImg,
    sendButton,
    paperClip,
  },
};

export const PROFILE_TEMPLATE_DATA: ProfileDataTemplate = {
  profileImg: profileDefault,
  navButtonSrc,
  profileName: TemplateRenderer.escapeHtml('Иван'),
  userLastName: TemplateRenderer.escapeHtml('Иванов'),
  displayName: TemplateRenderer.escapeHtml('Ivan1234'),
  email: TemplateRenderer.escapeHtml('pochta@yandex.ru'),
  login: TemplateRenderer.escapeHtml('ivanivanov'),
  phoneNumber: TemplateRenderer.escapeHtml('+7 (909) 967 30 30'),
};

export const NOT_FOUND_TEMPLATE_DATA: ErrorPageDataTemplate = {
  notFoundLogoSrc,
  preview: {
    href: '/',
    id: 'preview',
    textContent: TemplateRenderer.escapeHtml('Вернуться к превью'),
  },
};

export const BAD_SERVER_TEMPLATE_DATA: ErrorPageDataTemplate = {
  notFoundLogoSrc,
  preview: {
    href: '/',
    id: 'preview',
    textContent: TemplateRenderer.escapeHtml('Вернуться к превью'),
  },
};

export const CHANGE_CREDENTIALS_FORM_TEMPLATE_DATA: ChangeCredentialsFormDataTemplate = {
  fileInputs: [
    { name: 'avatar', id: 'avatar', src: profileDefault },
  ],
  inputs: [
    {
      inputData: {
        type: 'email', name: 'email', placeholder: 'Email',
      },
      invalidInputData: {
        name: 'email',
        textContent: 'Неверный формат ввода. Допустимый формат ввода: example@mail.com',
      },
    },
    {
      inputData: {
        type: 'login', name: 'login', placeholder: 'Логин',
      },
      invalidInputData: {
        name: 'login',
        // eslint-disable-next-line max-len
        textContent: 'Неверный формат ввода. Поле должно содержать 3 до 20 символов, без пробелов, без спецсимволов (кроме нижнего подчеркивания и дефиса), хотя бы с 1 латинской буквой',
      },
    },
    {
      inputData: {
        type: 'text', name: 'first_name', placeholder: 'Имя',
      },
      invalidInputData: {
        name: 'first_name',
        // eslint-disable-next-line max-len
        textContent: 'Неверный формат ввода. Поле не должно содержать пробелов, цифр и спецсимволов (кроме дефиса), первая буква - заглавная',
      },
    },
    {
      inputData: {
        type: 'text', name: 'second_name', placeholder: 'Фамилия',
      },
      invalidInputData: {
        name: 'second_name',
        // eslint-disable-next-line max-len
        textContent: 'Неверный формат ввода. Поле не должно содержать пробелов, цифр и спецсимволов (кроме дефиса), первая буква - заглавная',
      },
    },
    {
      inputData: {
        type: 'text', name: 'display_name', placeholder: 'Имя в чате',
      },
      invalidInputData: {
        name: 'display_name',
        textContent: '',
      },
    },
    {
      inputData: {
        type: 'tel', name: 'phone', placeholder: 'Телефон',
      },
      invalidInputData: {
        name: 'phone',
        textContent: '',
      },
    },
  ],
  passwordInputs: [
    {
      inputData: {
        type: 'password', name: 'oldPassword', placeholder: 'Старый пароль',
      },
      invalidInputData: {
        name: 'oldPassword',
        // eslint-disable-next-line max-len
        textContent: 'Неверный формат ввода. Поле должно содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
      },
    },
    {
      inputData: {
        type: 'password', name: 'newPassword', placeholder: 'Новый пароль',
      },
      invalidInputData: {
        name: 'newPassword',
        // eslint-disable-next-line max-len
        textContent: 'Неверный формат ввода. Поле должно содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
      },
    },
  ],

};
