/* eslint-disable no-alert */
import Controller from "./Controller";
import AuthApi from "../services/api/AuthApi";
import { ERoutes } from "../utils/constants/consts";

import type { ISignInReqData, ISignUpReqData } from "../types/services/api/AuthApi";

class AuthController extends Controller {
  public registerUser = async (data: ISignUpReqData) => {
    this.store.set("auth.isLoading", true);
    try {
      const response = await AuthApi.signUp(data);

      if (response.status === 200) {
        await this.getUser();
        this.store.set("isAuthenticated", true);
        this.router.go(ERoutes.MESSENGER);
      } else if (response.status === 409) {
        const { reason } = JSON.parse(response.responseText);
        // TODO: Алерт поменять на более адекватное уведомление
        window.alert(reason);
      } else if (response.status >= 500) {
        this.router.go(ERoutes.BAD_SERVER);
      }
    } catch (error) {
      this.router.go(ERoutes.BAD_SERVER);
    } finally {
      this.store.set("auth.isLoading", false);
    }
  };

  public loginUser = async (data: ISignInReqData) => {
    this.store.set("auth.isLoading", true);
    try {
      const response = await AuthApi.signIn(data);

      if (response.status === 200) {
        await this.getUser();
        this.store.set("isAuthenticated", true);
        this.router.go(ERoutes.MESSENGER);
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
      this.store.set("auth.isLoading", false);
    }
  };

  public getUser = async () => {
    this.store.set("auth.isLoading", true);
    try {
      const response = await AuthApi.getUser();

      if (response.status === 200) {
        const userInfo = JSON.parse(response.responseText);
        this.store.set('auth.user', userInfo);
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
      this.store.set("auth.isLoading", false);
    }
  };

  public logout = async () => {
    this.store.set("auth.isLoading", true);
    try {
      const response = await AuthApi.logout();

      if (response.status === 200) {
        this.store.set('auth.user', null);
        this.router.go(ERoutes.LOGIN);
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
      this.store.set("auth.isLoading", false);
    }
  };
}

export default new AuthController();
