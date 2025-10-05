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

// eslint-disable-next-line max-len
import { CHANGE_CREDENTIALS_FORM_TEMPLATE_DATA as CRED_MOCK } from '../../services/api/mocks/mockData';
import defaultProfileImg from '../../../images/profile/profileDefault.png';

import type { IBlockProps } from '../../types/services/block/Block';

const FileInputs = CRED_MOCK.fileInputs.map((input) => new FileInput({
  name: input.name,
  id: input.id,
  src: input.src,
}));

const CredentialsTextInputs = CRED_MOCK.inputs.map((input) => new FormInputWithValidation({
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

const ChangePasswordTextInputs = CRED_MOCK.passwordInputs.map((input) => new FormInputWithValidation({
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
  profileName: state.auth?.user?.first_name,
}))(ProfileHeader);

class ProfilePage extends Block {
  constructor(props?: IBlockProps) {
    const ChangeCredentialsForm = new CredentialsForm({
      fileInputs: FileInputs,
      inputs: CredentialsTextInputs,
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
