import { Router } from "../services/navigation";
import Store from "../services/store/Store";
import type { IController } from "../types/controllers/Controller";

class Controller implements IController {
  public router: typeof Router = Router;

  public store: typeof Store = Store;
}

export const BaseController = new Controller();
export default Controller;
