/* eslint-disable no-alert */
import ChatsApi from "../services/api/ChatsApi";
import type {
  IChatUsersReqData,
  ICreateChatReqData,
  IDeleteChatReqData,
  IGetChatUsersReqData,
} from "../types/services/api/ChatsApi";
import { ERoutes } from "../utils/constants/consts";
import Controller from "./Controller";

class ChatsController extends Controller {
  public getAllChats = async () => {
    this.store.set('chats.isLoading', true);

    try {
      const response = await ChatsApi.getAllChats();

      if (response.status === 200) {
        const chats = JSON.parse(response.responseText);
        this.store.set('chats.allChats', chats);
      } else if (response.status === 401 || response.status === 400) {
        const { reason } = JSON.parse(response.responseText);
        // TODO: Алерт поменять на более адекватное уведомление
        window.alert(reason);
      } else if (response.status >= 500) {
        this.router.go(ERoutes.BAD_SERVER);
      }
    } catch (error) {
      this.router.go(ERoutes.BAD_SERVER);
    } finally {
      this.store.set("chats.isLoading", false);
    }
  };

  public createChat = async (data: ICreateChatReqData) => {
    try {
      const response = await ChatsApi.createChat(data);
      if (response.status === 200) {
        const chatId = JSON.parse(response.responseText)?.id;
        await this.getAllChats();
        this.store.set('currentChat.id', chatId);
      }
      if (response.status === 401 || response.status === 400) {
        const { reason } = JSON.parse(response.responseText);
        // TODO: Алерт поменять на более адекватное уведомление
        window.alert(reason);
      } else if (response.status >= 500) {
        this.router.go(ERoutes.BAD_SERVER);
      }
    } catch (error) {
      this.router.go(ERoutes.BAD_SERVER);
    }
  };

  public deleteChat = async (data: IDeleteChatReqData) => {
    try {
      const response = await ChatsApi.deleteChat(data);
      if (response.status === 200) {
        this.store.set('currentChat.id', null)
        await this.getAllChats();
      }
      if (response.status === 401 || response.status === 400) {
        const { reason } = JSON.parse(response.responseText);
        // TODO: Алерт поменять на более адекватное уведомление
        window.alert(reason);
      } else if (response.status >= 500) {
        this.router.go(ERoutes.BAD_SERVER);
      }
    } catch (error) {
      this.router.go(ERoutes.BAD_SERVER);
    }
  };

  public getChatUsers = async (data: IGetChatUsersReqData) => {
    try {
      const response = await ChatsApi.getChatUsers(data);
      if (response.status === 200) {
        const chatUsers = JSON.parse(response.responseText);
        this.store.set('currentChat.chatUsers', chatUsers);
      }
      if (response.status === 401 || response.status === 400) {
        const { reason } = JSON.parse(response.responseText);
        // TODO: Алерт поменять на более адекватное уведомление
        window.alert(reason);
      } else if (response.status >= 500) {
        this.router.go(ERoutes.BAD_SERVER);
      }
    } catch (error) {
      this.router.go(ERoutes.BAD_SERVER);
    }
  };

  public addChatUsers = async (data: IChatUsersReqData) => {
    try {
      const response = await ChatsApi.addUsersToChat(data);
      if (response.status === 200) {
        this.getChatUsers({ id: data.chatId });
      }
      if (response.status === 401 || response.status === 400) {
        const { reason } = JSON.parse(response.responseText);
        // TODO: Алерт поменять на более адекватное уведомление
        window.alert(reason);
      } else if (response.status >= 500) {
        this.router.go(ERoutes.BAD_SERVER);
      }
    } catch (error) {
      this.router.go(ERoutes.BAD_SERVER);
    }
  };

  public deleteChatUsers = async (data: IChatUsersReqData) => {
    try {
      const response = await ChatsApi.deleteUsersFromChat(data);
      if (response.status === 200) {
        this.getChatUsers({ id: data.chatId });
      }
      if (response.status === 401 || response.status === 400) {
        const { reason } = JSON.parse(response.responseText);
        // TODO: Алерт поменять на более адекватное уведомление
        window.alert(reason);
      } else if (response.status >= 500) {
        this.router.go(ERoutes.BAD_SERVER);
      }
    } catch (error) {
      this.router.go(ERoutes.BAD_SERVER);
    }
  };
}

export default new ChatsController();
