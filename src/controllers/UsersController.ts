/* eslint-disable no-alert */
import UsersApi from "../services/api/UsersApi";
import type { IChangeCredentialsReqData } from "../types/services/api/UsersApi";
import { ERoutes } from "../utils/constants/consts";
import Controller from "./Controller";

class UsersController extends Controller {
  public changeCredentials = async (data: IChangeCredentialsReqData) => {
    try {
      const response = await UsersApi.changeCredentials(data);

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
}

export default new UsersController();
