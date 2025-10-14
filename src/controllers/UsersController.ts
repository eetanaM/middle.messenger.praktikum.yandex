/* eslint-disable no-alert */
import UsersApi from "../services/api/UsersApi";
import type {
  IChangeAvatarReqData,
  IChangeCredentialsReqData,
  IChangePasswordReqData,
  ISearchUserReqData,
} from "../types/services/api/UsersApi";
import { ERoutes } from "../utils/constants/consts";
import Controller from "./Controller";

class UsersController extends Controller {
  public changeCredentials = async (data: IChangeCredentialsReqData) => {
    try {
      const response = await UsersApi.changeCredentials(data);

      if (response.status === 200) {
        const userInfo = JSON.parse(response.responseText);
        this.store.set('auth.user', userInfo);
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

  public changePassword = async (data: IChangePasswordReqData) => {
    try {
      const response = await UsersApi.changePassword(data);

      if (response.status === 200) {
        // TODO: Алерт поменять на более адекватное уведомление
        window.alert("Пароль успешно изменен");
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

  public changeAvatar = async (data: IChangeAvatarReqData) => {
    try {
      const response = await UsersApi.changeAvatar(data);

      if (response.status === 200) {
        const userInfo = JSON.parse(response.responseText);
        this.store.set('auth.user', userInfo);
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

  public findUser = async (data: ISearchUserReqData) => {
    try {
      const response = await UsersApi.findUser(data);

      if (response.status === 200) {
        const results = JSON.parse(response.responseText);
        if (results.length > 0) {
          this.store.set('searchResults', results);
        } else {
          window.alert("Ничего не нашлось");
        }
      } else if (response.status === 401 || response.status === 400) {
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

export default new UsersController();
