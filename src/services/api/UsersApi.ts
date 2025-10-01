import type {
  IChangeAvatarReqData,
  IChangeCredentialsReqData,
  IChangePasswordReqData,
  ISearchUserReqData,
} from "../../types/services/api/UsersApi";
import { BaseApi } from "./BaseApi";
import HTTPTransport from "./HTTPTransport";

const usersApiInstance = new HTTPTransport('/user');

const usersOptions = {
  headers: {
    Accept: 'application/json',
  },
};

class UsersApi extends BaseApi {
  public changeCredentials(data: IChangeCredentialsReqData) {
    return usersApiInstance.put('/profile', { ...usersOptions, data });
  }

  public changeAvatar(data: IChangeAvatarReqData) {
    return usersApiInstance.put('/profile/avatar', { ...usersOptions, data });
  }

  public changePassword(data: IChangePasswordReqData) {
    return usersApiInstance.put('/profile', { ...usersOptions, data });
  }

  public findUser(data: ISearchUserReqData) {
    return usersApiInstance.post('/search', { ...usersOptions, data });
  }
}

export default new UsersApi();
