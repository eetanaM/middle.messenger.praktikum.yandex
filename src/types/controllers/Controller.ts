import { Router } from "../../services/navigation";
import Store from "../../services/store/Store";

interface IController {
  store: typeof Store,
  router: typeof Router,
}

export type {
  IController,
};
