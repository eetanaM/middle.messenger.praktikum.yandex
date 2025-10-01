import type {
  IChatUsersReqData,
  ICreateChatReqData,
  IDeleteChatReqData,
  IGetChatsReqData,
  IGetChatUsersReqData,
} from "../../types/services/api/ChatsApi";
import { BaseApi } from "./BaseApi";
import HTTPTransport from "./HTTPTransport";

const chatsApiInstance = new HTTPTransport('/chats');

const chatsOptions = {
  headers: {
    Accept: 'application/json',
  },
};

class ChatsApi extends BaseApi {
  public getAllChats(data: IGetChatsReqData) {
    return chatsApiInstance.get('/', { ...chatsOptions, data });
  }

  public createChat(data: ICreateChatReqData) {
    return chatsApiInstance.post('/', { ...chatsOptions, data });
  }

  public deleteChat(data: IDeleteChatReqData) {
    return chatsApiInstance.delete('/', { ...chatsOptions, data });
  }

  public getChatUsers(data: IGetChatUsersReqData) {
    return chatsApiInstance.get(`/${data.id}/users`, { ...chatsOptions, data });
  }

  public addUsersToChat(data: IChatUsersReqData) {
    return chatsApiInstance.put('/users', { ...chatsOptions, data });
  }

  public deleteUsersFromChat(data: IChatUsersReqData) {
    return chatsApiInstance.delete('/users', { ...chatsOptions, data });
  }
}

export default new ChatsApi();
