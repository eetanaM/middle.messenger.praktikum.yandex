import type { ISignInData, ISignUpData } from "../../types/services/api/AuthApi";
import { BaseApi } from "./BaseApi";
import HTTPTransport from "./HTTPTransport";

const authApiInstance = new HTTPTransport('/auth');

const authOptions = {
  headers: {
    Accept: 'application/json',
  },
};

class AuthApi extends BaseApi {
  public signUp(data: ISignUpData) {
    return authApiInstance.post('/signup', { ...authOptions, data });
  }

  public signIn(data: ISignInData) {
    return authApiInstance.post('/signin', { ...authOptions, data });
  }

  public logout() {
    return authApiInstance.post('/logout', { ...authOptions });
  }

  public getUser() {
    return authApiInstance.get('/user', { ...authOptions });
  }
}

export default new AuthApi();
