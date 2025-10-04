import { Block } from '../../services/block';

import { FormInput } from '../../components/partials';
import {
  ChatDetails,
  MenuChats,
  MenuHeader,
  SendMessageForm,
} from '../../components/blocks';

import { CHAT_DETAILS_TEMPLATE_DATA as CHAT_MOCK } from '../../services/api/mocks/mockData';
import type { IBlockProps } from '../../types/services/block/Block';
import connect from '../../services/store/connect';
import ChatsController from '../../controllers/ChatsController';

class MainContentPage extends Block {
  constructor(props?: IBlockProps) {
    const MenuHeaderComponent = connect((state) => ({
      profileName: state.auth?.user?.display_name || state.auth?.user?.first_name,
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

    const ChatDetailsComponent = new ChatDetails({
      icons: CHAT_MOCK.icons,
      SendMessageForm: SendMessageFormComponent,
    });

    super({
      ...props,
      events: {},
      Header: new MenuHeaderComponent({}),
      SearchInput: new FormInput({ type: 'text', name: 'search', placeholder: 'Поиск' }),
      MenuChats: new MenuChatsList({
        chats: ChatsController.store.getState().chats.allChats,
        isLoading: ChatsController.store.getState().chats.isLoading,
      }),
      ChatDetails: ChatDetailsComponent,
    });
  }

  override render() {
    return `<main class="main-content">
              <nav class="menu">
                  {{{ Header }}}
                  <form class="menu__menu-search">
                      {{{ SearchInput }}}
                  </form>
                  {{{ MenuChats }}}
              </nav>
              {{{ ChatDetails }}}
          </main>`;
  }
}

export default MainContentPage;

export type TMainContentPage = typeof MainContentPage;
