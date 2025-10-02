import AuthApi from "../services/api/AuthApi";
import type { ISignUpReqData } from "../types/services/api/AuthApi";
import Controller from "./Controller";

class AuthController extends Controller {
  public registerUser = async (data: ISignUpReqData) => {
    this.store.set("auth.isLoading", true);
    try {
      const response = await AuthApi.signUp(data);
      console.log(response);
      // TODO реализовать логику поведения при регистрации
    } catch (error) {
      console.error(error);
    }
  };
}

export default new AuthController();
