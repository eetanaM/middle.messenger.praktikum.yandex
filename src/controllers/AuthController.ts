import Controller from "./Controller";

class AuthController extends Controller {
  public registerUser = async () => {
    this.store.set("auth.isLoading", true);
    console.log("Starting registration");
    setTimeout(() => {
      this.store.set("auth.isLoading", false);
      console.log("Registration finished");
    }, 2000);
  };
}

export default new AuthController();
