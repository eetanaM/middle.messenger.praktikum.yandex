import { Block, TemplateRenderer } from "../../services/block";
import ChatsController from "../../controllers/ChatsController";

import Message from "./Messages";
import SendMessageForm from "./SendMessageForm";
import { FormInput } from "../partials";
import ChatMenuButton from "../partials/ChatMenuButton";

import { isEqual } from "../../utils/helpers";
import sendButtonSrc from "../../../images/chat/send.png";
import { WS_BASE_URL } from "../../utils/constants/consts";

import type { IBlockProps } from '../../types/services/block/Block';
import type { TMessage } from "../../types/services/store/Store";
import parseDate from "../../utils/helpers/parseDate";

const createMessagesList = (message: TMessage) => new Message({
  messageContent: message.content,
  timeStamp: parseDate(message.time),
  author: Number(message.user_id) === ChatsController.store.getState().auth?.user?.id ? "user" : "opponent",
});
class ChatDetails extends Block {
  constructor(props: IBlockProps) {
    const MessagesComponent = ChatsController.store.getState().currentChat.messages.map(createMessagesList);
    const SendMessageFormComponent = new SendMessageForm({
      sendButton: sendButtonSrc,
      FormInput: new FormInput({
        type: 'text',
        name: 'message',
        placeholder: 'Введите сообщение',
        attr: { autocomplete: "off" },
      }),
      events: {
        submit: ((e: Event) => {
          e.preventDefault();
          const websocket = ChatsController.store.getState().websocket as WebSocket;
          const form = e.target as HTMLFormElement;
          const formInput = form.querySelector('input');

          const message = {
            content: "",
            type: "message",
          };

          if (formInput) {
            if (formInput?.value === "") {
              return;
            }
            message.content = TemplateRenderer.escapeHtml(formInput.value).toString();

            websocket.send(JSON.stringify(message));
            formInput.value = "";
          }
        }),
      },
    });

    super({
      ...props,
      MenuButton: new ChatMenuButton(),
      Messages: MessagesComponent,
      SendMessageForm: SendMessageFormComponent,
      events: {},
    });
  }

  protected override componentDidUpdate(oldProps: IBlockProps, newProps: IBlockProps): boolean {
    const shouldUpdate = !isEqual(oldProps, newProps);
    if (shouldUpdate) {
      const { isAuthenticated } = ChatsController.store.getState().auth;
      if (!isAuthenticated) {
        return false;
      }
      const userId = ChatsController.store.getState().auth?.user?.id;
      const oldChatId = oldProps.currentChatItemId;
      const newChatId = newProps.currentChatItemId;
      const oldWS = ChatsController.store.getState().websocket as WebSocket;
      const oldMessages = oldProps.messages as unknown as TMessage[];
      const newMessages = newProps.messages as unknown as TMessage[];

      if (oldMessages.length !== newMessages.length) {
        this.setList("Messages", newMessages.map(createMessagesList));
      }

      if ((oldChatId && !newChatId)
        || (oldChatId !== newChatId)) {
        if (oldWS) {
          oldWS.close();
        }
      }

      if (newChatId) {
        ChatsController.getChatUsers({ id: Number(newChatId) });
        let token;
        ChatsController.getChatToken(Number(newChatId)).then((res) => {
          token = res;
          const websocket = new WebSocket(`${WS_BASE_URL}${userId}/${newChatId}/${token}`);
          let intervalId: number;
          const pinger = () => {
            websocket.send(JSON.stringify({
              type: "ping",
            }));
          };

          websocket.addEventListener("open", () => {
            ChatsController.store.set("websocket", websocket);

            websocket.send(JSON.stringify({
              type: 'get old',
              content: '0',
            }));

            intervalId = setInterval(pinger, 20000);
          });

          websocket.addEventListener('close', (event) => {
            if (event.wasClean) {
              console.log("Соединение закрыто");
              clearInterval(intervalId);
            }
          });
          websocket.addEventListener("message", (event) => {
            let result = null;
            try {
              result = JSON.parse(event.data);
            } catch (error) {
              console.error(error);
            }

            if (result.type === 'pong' || result.type === 'user connected') {
              return;
            }

            if (Array.isArray(result)) {
              ChatsController.store.set('currentChat.messages', [...result.reverse()]);
              return;
            }

            const { messages } = ChatsController.store.getState().currentChat;
            ChatsController.store.set('currentChat.messages', [...messages, result]);
          });
        });
      }
    }
    return shouldUpdate;
  }

  override render() {
    if (!this.props.currentChatItemId) {
      return `<section class="chat">
                <p>Выберите чат, чтобы отправить сообщение</p>
              </section>`;
    }
    /* eslint-disable max-len */
    return `<section class="chat">
                <header class="chat__header">
                    <h1>{{ title }}</h1>
                    {{{ MenuButton }}}
                </header>
                <div class="chat__messages-container">
                  {{{ blockList "Messages" }}}
                </div>
                <footer class="chat__footer">
                    {{{ SendMessageForm }}}
                </footer>
            </section>`;
  }
/* eslint-enable max-len */
}

export default ChatDetails;
