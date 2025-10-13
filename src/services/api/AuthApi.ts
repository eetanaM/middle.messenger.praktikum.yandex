import type { ISignInReqData, ISignUpReqData } from "../../types/services/api/AuthApi";
import { BaseApi } from "./BaseApi";
import HTTPTransport from "./HTTPTransport";

const authOptions = {
  headers: {
    Accept: 'application/json',
  },
};

class AuthApi extends BaseApi {
  private readonly http = new HTTPTransport('/auth');

  public signUp(data: ISignUpReqData) {
    return this.http.post('/signup', { ...authOptions, data });
  }

  public signIn(data: ISignInReqData) {
    return this.http.post('/signin', { ...authOptions, data });
  }

  public logout() {
    return this.http.post('/logout', { ...authOptions });
  }

  public getUser() {
    return this.http.get('/user', { ...authOptions });
  }
}

export default new AuthApi();
