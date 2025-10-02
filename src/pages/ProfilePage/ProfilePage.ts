import { Block } from '../../services/block';

import ProfileCredentials from '../../components/blocks/ProfileCredentials';
import {
  Button,
  FileInput,
  FormInputWithValidation,
  ProfileMenuButton, RoundButton,
} from '../../components/partials';
// import { CredentialsForm } from '../../components/blocks';

// eslint-disable-next-line max-len
import { PROFILE_TEMPLATE_DATA as MOCK, CHANGE_CREDENTIALS_FORM_TEMPLATE_DATA as CRED_MOCK } from '../../services/api/mocks/mockData';

import type { IBlockProps } from '../../types/services/block/Block';
import { CredentialsForm } from '../../components/blocks';
import toggleModal from '../../utils/toggleModal';

class ProfilePage extends Block {
  constructor(props?: IBlockProps) {
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
      profileImg: MOCK.profileImg,
      profileName: MOCK.profileName,
      ProfileCredentials: new ProfileCredentials({
        ...MOCK,
        userFirstName: MOCK.profileName,
      }),
      BackButton: new RoundButton({
        events: {
          click: ((e: Event) => {
            e.preventDefault();
            window.router.back();
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
            // this._appElement.toggleModal(ChangeCredentialsForm); пофиксить переход
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
            // this._appElement.toggleModal(ChangePasswordForm); пофиксить переход
          }),
        },
      }),
      LogOutButton: new ProfileMenuButton({
        id: 'logout',
        textContent: 'Выйти',
        class: 'red',
      }),
    });
  }

  override render() {
    return `<main class="profile">
                    <div class="profile__header">
                        <img class="header__avatar" src={{ profileImg }} alt="Profile image">
                        <h1 class="header__profile-name">{{ profileName }}</h1>
                    </div>
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
