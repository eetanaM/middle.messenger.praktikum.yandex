import type {
  IChatUsersReqData,
  ICreateChatReqData,
  IDeleteChatReqData,
  IGetChatsReqData,
  IGetChatUsersReqData,
} from "../../types/services/api/ChatsApi";
import { BaseApi } from "./BaseApi";
import HTTPTransport from "./HTTPTransport";

const chatsOptions = {
  headers: {
    Accept: 'application/json',
  },
};

class ChatsApi extends BaseApi {
  private readonly http = new HTTPTransport('/chats');

  public getAllChats(data?: IGetChatsReqData) {
    return this.http.get('/', { ...chatsOptions, data });
  }

  public createChat(data: ICreateChatReqData) {
    return this.http.post('/', { ...chatsOptions, data });
  }

  public deleteChat(data: IDeleteChatReqData) {
    return this.http.delete('/', { ...chatsOptions, data });
  }

  public getChatUsers(data: IGetChatUsersReqData) {
    return this.http.get(`/${data.id}/users`, { ...chatsOptions, data });
  }

  public addUsersToChat(data: IChatUsersReqData) {
    return this.http.put('/users', { ...chatsOptions, data });
  }

  public deleteUsersFromChat(data: IChatUsersReqData) {
    return this.http.delete('/users', { ...chatsOptions, data });
  }

  public getToken(id: number) {
    return this.http.post(`/token/${id}`);
  }
}

export default new ChatsApi();
