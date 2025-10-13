import type {
  IChangeAvatarReqData,
  IChangeCredentialsReqData,
  IChangePasswordReqData,
  ISearchUserReqData,
} from "../../types/services/api/UsersApi";
import { BaseApi } from "./BaseApi";
import HTTPTransport from "./HTTPTransport";

const usersOptions = {
  headers: {
    Accept: 'application/json',
  },
};

class UsersApi extends BaseApi {
  private readonly http = new HTTPTransport('/user');

  public changeCredentials(data: IChangeCredentialsReqData) {
    return this.http.put('/profile', { ...usersOptions, data });
  }

  public changeAvatar(data: IChangeAvatarReqData) {
    return this.http.put('/profile/avatar', { ...usersOptions, data });
  }

  public changePassword(data: IChangePasswordReqData) {
    return this.http.put('/password', { ...usersOptions, data });
  }

  public findUser(data: ISearchUserReqData) {
    return this.http.post('/search', { ...usersOptions, data });
  }
}

export default new UsersApi();
