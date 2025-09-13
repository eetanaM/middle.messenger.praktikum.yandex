import Block from "../../utils/Block";

import ProfileCredentials from "../../components/blocks/ProfileCredentials";
import { RoundButton } from "../../components/partials";

import { PROFILE_TEMPLATE_DATA as MOCK } from "../../utils/api/mocks/mockData";

import type { IBlockProps } from "../../utils/types/Block";

export default class ProfilePage extends Block {
    constructor(props: IBlockProps) {
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
                appEl: props.appEl,
            }),
        })
    }

    override render() {
        return `<main class="profile">
                    <div class="profile__header">
                        <img class="header__avatar" src={{ profileImg }} alt="Profile image">
                        <h1 class="header__profile-name">{{ profileName }}</h1>
                    </div>
                    {{{ ProfileCredentials }}}
                    <nav class="profile__menu">
                        <button id="change-credentials">Изменить данные</button>
                        <button id="change-password">Изменить пароль</button>
                        <button id="logout" class="red">Выйти</button>
                    </nav>
                    {{{ BackButton }}}
                </main>`
    }
}

