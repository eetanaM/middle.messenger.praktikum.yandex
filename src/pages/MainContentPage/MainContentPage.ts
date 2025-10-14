import { Block, TemplateRenderer } from '../../services/block';
import connect from '../../services/store/connect';
import ChatsController from '../../controllers/ChatsController';

import {
  ChatDetails,
  MenuChats,
  MenuHeader,
} from '../../components/blocks';

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

const ChatDetailsComponent = connect((state) => ({
  currentUserId: state.auth?.user?.id,
  currentChatItemId: state.currentChat?.id,
  messages: state.currentChat?.messages,
  title: state.currentChat?.chatDetails?.title,
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
      ChatDetails: new ChatDetailsComponent(),
    });

    ChatsController.getAllChats();
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
