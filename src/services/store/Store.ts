import type { Indexed } from "../../types/services/store/Store";
import { set } from "../../utils/helpers";
import { EventBus } from "../block";

export enum StoreEvents {
  STORE_UPD = "store:updated",
}

class Store extends EventBus {
  private state: Indexed = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.STORE_UPD);
  }
}

export default new Store();
