import { Block, TemplateRenderer } from '../../services/block';
import connect from '../../services/store/connect';
import ChatsController from '../../controllers/ChatsController';
import AuthController from '../../controllers/AuthController';

import { FormInput } from '../../components/partials';
import {
  ChatDetails,
  MenuChats,
  MenuHeader,
  SendMessageForm,
} from '../../components/blocks';

import { CHAT_DETAILS_TEMPLATE_DATA as CHAT_MOCK } from '../../services/api/mocks/mockData';
import type { IBlockProps } from '../../types/services/block/Block';
import SearchForm from '../../components/blocks/SearchForm';
import type { ISearchUserReqData } from '../../types/services/api/UsersApi';
import UsersController from '../../controllers/UsersController';

const MenuHeaderComponent = connect((state) => ({
  profileName: state.auth.user?.display_name || state.auth.user?.first_name,
}))(MenuHeader);

const MenuChatsList = connect((state) => ({
  chats: state.chats.allChats,
  isLoading: state.chats.isLoading,
}))(MenuChats);

const SendMessageFormComponent = new SendMessageForm({
  icons: CHAT_MOCK.icons,
  FormInput: new FormInput({
    type: 'text',
    name: 'message',
    placeholder: 'Введите сообщение',
  }),
});

const ChatDetailsComponent = connect((state) => ({
  currentChatItemId: state.currentChat?.id || null,
}))(ChatDetails);

class MainContentPage extends Block {
  constructor(props?: IBlockProps) {
    super({
      ...props,
      events: {},
      Header: new MenuHeaderComponent(),
      Search: new SearchForm({
        events: {
          submit: ((e: Event) => {
            e.preventDefault();
            e.stopPropagation();

            const form = e.target as HTMLFormElement;
            const formInput = form.querySelector('input') as HTMLInputElement;

            const formData: ISearchUserReqData = {
              login: '',
            };

            formData.login = TemplateRenderer.escapeHtml(formInput?.value).toString();

            if (formData.login === "") {
              return;
            }

            formInput.value = '';
            UsersController.findUser(formData);
          }),
        },
      }),
      MenuChats: new MenuChatsList(),
      ChatDetails: new ChatDetailsComponent({
        icons: CHAT_MOCK.icons,
        SendMessageForm: SendMessageFormComponent,
      }),
    });

    ChatsController.getAllChats();
    AuthController.getUser();
  }

  override render() {
    return `<main class="main-content">
              <nav class="menu">
                  {{{ Header }}}
                  {{{ Search }}}
                  {{{ MenuChats }}}
              </nav>
              {{{ ChatDetails }}}
          </main>`;
  }
}

export default MainContentPage;

export type TMainContentPage = typeof MainContentPage;
