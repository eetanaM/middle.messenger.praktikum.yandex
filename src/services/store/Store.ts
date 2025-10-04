import { EventBus } from "../block";

import { set } from "../../utils/helpers";

import avatarImg from '../../../images/profile/avatar.png';

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
  isAuthenticated: false,
  auth: {
    isLoading: false,
    user: null,
  },
  chats: {
    isLoading: false,
    allChats: [
      {
        id: 1231,
        title: "Chat 1",
        avatar: avatarImg,
        unread_count: 1,
        created_by: 123,
        last_message: {
          user: {
            first_name: "Vasya",
            second_name: "Vasin",
            avatar: avatarImg,
            email: "asd@asd.com",
            login: "userLogin",
            phone: "8(911)-222-33-22",
          },
          time: "2025-10-03T14:22:22.000Z",
          content: "message content",
        },
      },
      {
        id: 123123,
        title: "Chat 2",
        avatar: avatarImg,
        unread_count: 0,
        created_by: 234,
        last_message: {
          user: {
            first_name: "Dima",
            second_name: "Dimin",
            avatar: avatarImg,
            email: "asd@asd.com",
            login: "userLogin1",
            phone: "8(911)-222-33-23",
          },
          time: "2025-01-01T14:22:22.000Z",
          content: "other message content",
        },
      },
      {
        id: 1241241,
        title: "Chat 3",
        avatar: avatarImg,
        unread_count: 5,
        created_by: 345,
        last_message: {
          user: {
            first_name: "Petya",
            second_name: "Petin",
            avatar: avatarImg,
            email: "asd@asd.com",
            login: "userLogin3",
            phone: "8(911)-222-42-22",
          },
          time: "2024-10-02T14:22:22.000Z",
          content: "Any message text that is pretty long to fit it into text box",
        },
      },
    ],
  },
});
