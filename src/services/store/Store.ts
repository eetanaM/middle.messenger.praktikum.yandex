import { EventBus } from "../block";

import { set } from "../../utils/helpers";

import type { Indexed, IState } from "../../types/services/store/Store";

export enum StoreEvents {
  STORE_UPD = "store:updated",
}

class Store extends EventBus {
  private state: Indexed = {};

  static __instance: Store | null;

  constructor(initialState?: IState) {
    if (Store.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Store.__instance;
    }

    super();

    if (initialState) {
      this.state = initialState;
    }
  }

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.STORE_UPD);
  }
}

export default new Store({
  auth: {
    isLoading: false,
    user: null,
  },
  chats: {
    isLoading: false,
    allChats: [],
  },
  currentChat: {
    id: null,
    chatDetails: null,
    chatUsers: [],
  },
  searchResults: [],
});
