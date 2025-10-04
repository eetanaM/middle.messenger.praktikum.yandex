/* eslint-disable no-alert */
import ChatsApi from "../services/api/ChatsApi";
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
      } else if (response.status === 401) {
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
}

export default new ChatsController();
