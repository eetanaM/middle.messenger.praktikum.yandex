import Block from "../../utils/Block"

import ProfileCredentials from "../../components/blocks/ProfileCredentials"

import { PROFILE_TEMPLATE_DATA as MOCK } from "../../mocks/mockData"
import navButtonSrc from "../../../images/nav-button.png"

export default class ProfilePage extends Block {
    constructor() {
        super({
            events: {},
            profileImg: MOCK.profileImg,
            profileName: MOCK.profileName,
            ProfileCredentials: new ProfileCredentials({
                email: MOCK.email,
                login: MOCK.login,
                userFirstName: MOCK.profileName,
                userLastName: MOCK.userLastName,
                displayName: MOCK.displayName,
                phoneNumber: MOCK.phoneNumber
            }),
            navButtonSrc,
            
        })
    }

    override render() {
        return `<div id="app">
                    <main class="profile">
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
                        <button class="app__nav-button">
                            <img src={{ navButtonSrc }} alt="Back arrow">
                        </button>
                    </main>
                    <div id="modal">
                        <div class="modal__overlay"></div>
                        <div class="modal__content"></div> 
                    </div>
                </div>`
    }
}

