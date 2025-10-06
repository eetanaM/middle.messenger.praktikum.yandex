// eslint-disable-file max-len
import { Block } from '../../services/block';
import UsersController from '../../controllers/UsersController';
import AuthController from '../../controllers/AuthController';
import connect from '../../services/store/connect';
import toggleModal from '../../utils/toggleModal';

import { CredentialsForm, ProfileCredentials, ProfileHeader } from '../../components/blocks';
import {
  Button,
  FileInput,
  FormInputWithValidation,
  ProfileMenuButton, RoundButton,
} from '../../components/partials';

import defaultProfileImg from '../../../images/profile/profileDefault.png';

import type { IBlockProps } from '../../types/services/block/Block';
import type { FormDataWithInvalidInputLabel } from '../../types/services/api/mockData';

const createConnectedInput = (config: FormDataWithInvalidInputLabel) =>
  connect((state) => ({
    input: config.inputData,
    invalid: config.invalidInputData,
    value: state.auth?.user?.[config.inputData.name] || '',
  }))(FormInputWithValidation);

const CRED_INPUTS_STATIC_DATA = [
  {
    inputData: { type: 'email', name: 'email', placeholder: 'Email' },
    invalidInputData: {
      name: 'email',
      textContent: 'Неверный формат ввода. Допустимый формат ввода: example@mail.com',
    },
  },
  {
    inputData: { type: 'login', name: 'login', placeholder: 'Логин' },
    invalidInputData: {
      name: 'login',
      textContent:
        'Неверный формат ввода. Поле должно содержать 3 до 20 символов, без пробелов, без спецсимволов (кроме нижнего подчеркивания и дефиса), хотя бы с 1 латинской буквой',
    },
  },
  {
    inputData: { type: 'text', name: 'first_name', placeholder: 'Имя' },
    invalidInputData: {
      name: 'first_name',
      textContent:
        'Неверный формат ввода. Поле не должно содержать пробелов, цифр и спецсимволов (кроме дефиса), первая буква — заглавная',
    },
  },
  {
    inputData: { type: 'text', name: 'second_name', placeholder: 'Фамилия' },
    invalidInputData: {
      name: 'second_name',
      textContent:
        'Неверный формат ввода. Поле не должно содержать пробелов, цифр и спецсимволов (кроме дефиса), первая буква — заглавная',
    },
  },
  {
    inputData: { type: 'text', name: 'display_name', placeholder: 'Имя в чате' },
    invalidInputData: { name: 'display_name', textContent: '' },
  },
  {
    inputData: { type: 'tel', name: 'phone', placeholder: 'Телефон' },
    invalidInputData: { name: 'phone', textContent: '' },
  },
];

const PASSWORD_INPUTS_STATIC_DATA = [
  {
    inputData: {
      type: 'password', name: 'oldPassword', placeholder: 'Старый пароль',
    },
    invalidInputData: {
      name: 'oldPassword',
      textContent: 'Неверный формат ввода. Поле должно содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
    },
  },
  {
    inputData: {
      type: 'password', name: 'newPassword', placeholder: 'Новый пароль',
    },
    invalidInputData: {
      name: 'newPassword',
      textContent: 'Неверный формат ввода. Поле должно содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
    },
  },
];

const ConnectedEmailInput = createConnectedInput(CRED_INPUTS_STATIC_DATA[0]);
const ConnectedLoginInput = createConnectedInput(CRED_INPUTS_STATIC_DATA[1]);
const ConnectedFirstNameInput = createConnectedInput(CRED_INPUTS_STATIC_DATA[2]);
const ConnectedSecondNameInput = createConnectedInput(CRED_INPUTS_STATIC_DATA[3]);
const ConnectedDisplayNameInput = createConnectedInput(CRED_INPUTS_STATIC_DATA[4]);
const ConnectedPhoneInput = createConnectedInput(CRED_INPUTS_STATIC_DATA[5]);

const ChangePasswordTextInputs = PASSWORD_INPUTS_STATIC_DATA.map((input) => new FormInputWithValidation({
  input: {
    type: input.inputData.type,
    name: input.inputData.name,
    placeholder: input.inputData.placeholder,
  },
  invalid: {
    name: input.invalidInputData.name,
    textContent: input.invalidInputData.textContent,
  },
}));

const ConnectedProfileCredentials = connect((state) => ({
  email: state.auth?.user?.email,
  login: state.auth?.user?.login,
  userFirstName: state.auth?.user?.first_name,
  userLastName: state.auth?.user?.second_name,
  displayName: state.auth?.user?.display_name,
  phoneNumber: state.auth?.user?.phone,
}))(ProfileCredentials);

const ConnectedProfileHeader = connect((state) => ({
  profileImg: state.auth?.user?.avatar || defaultProfileImg,
  profileName: state.auth?.user?.display_name || state.auth?.user?.first_name,
}))(ProfileHeader);

const ConnectedProfileAvatarInput = connect((state) => ({
  name: 'avatar',
  id: 'avatar',
  src: state.auth?.user?.avatar || defaultProfileImg,
}))(FileInput);

class ProfilePage extends Block {
  constructor(props?: IBlockProps) {
    const ChangeCredentialsForm = new CredentialsForm({
      ProfileAvatarInput: new ConnectedProfileAvatarInput(),
      inputs: [
        new ConnectedEmailInput(),
        new ConnectedLoginInput(),
        new ConnectedFirstNameInput(),
        new ConnectedSecondNameInput(),
        new ConnectedDisplayNameInput(),
        new ConnectedPhoneInput(),
      ],
      SubmitButton: new Button({
        id: 'confirm',
        type: 'submit',
        textContent: 'Подтвердить',
      }),
      ResetButton: new Button({
        id: 'reset',
        type: 'reset',
        textContent: 'Отменить',
      }),
    });

    const ChangePasswordForm = new CredentialsForm({
      inputs: ChangePasswordTextInputs,
      SubmitButton: new Button({
        id: 'confirm',
        type: 'submit',
        textContent: 'Подтвердить',
      }),
      ResetButton: new Button({
        id: 'reset',
        type: 'reset',
        textContent: 'Отменить',
      }),
    });

    super({
      ...props,
      events: {},
      ProfileHeader: new ConnectedProfileHeader(),
      ProfileCredentials: new ConnectedProfileCredentials(),
      BackButton: new RoundButton({
        events: {
          click: ((e: Event) => {
            e.preventDefault();
            UsersController.router.back();
          }),
        },
      }),
      ChangeDataButton: new ProfileMenuButton({
        id: 'change-credentials',
        textContent: 'Изменить данные',
        events: {
          click: ((e: Event) => {
            e.stopPropagation();
            toggleModal(ChangeCredentialsForm);
          }),
        },
      }),
      ChangePasswordButton: new ProfileMenuButton({
        id: 'change-password',
        textContent: 'Изменить пароль',
        events: {
          click: ((e: Event) => {
            e.stopPropagation();
            toggleModal(ChangePasswordForm);
          }),
        },
      }),
      LogOutButton: new ProfileMenuButton({
        id: 'logout',
        textContent: 'Выйти',
        class: 'red',
        events: {
          click: ((e: Event) => {
            e.stopPropagation();
            e.preventDefault();
            AuthController.logout();
          }),
        },
      }),
    });
    AuthController.getUser();
  }

  override render() {
    return `<main class="profile">
                    {{{ ProfileHeader }}}
                    {{{ ProfileCredentials }}}
                    <nav class="profile__menu">
                        {{{ ChangeDataButton }}}
                        {{{ ChangePasswordButton }}}
                        {{{ LogOutButton }}}
                    </nav>
                    {{{ BackButton }}}
                </main>`;
  }
}

export default ProfilePage;

export type TProfilePage = typeof ProfilePage;
