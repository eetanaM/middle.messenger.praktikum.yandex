interface IGetChatsReqData {
  offset?: number,
  limit?: number,
  title?: string,
}

interface ICreateChatReqData {
  title: string,
}

interface IDeleteChatReqData {
  chatId: number,
}

interface IGetChatUsersReqData {
  id: number,
  offset?: number,
  limit?: number,
  name?: string,
  email?: string,
}

interface IChatUsersReqData {
  users: Array<number>,
  chatId: number,
}

export type {
  IGetChatsReqData,
  ICreateChatReqData,
  IDeleteChatReqData,
  IGetChatUsersReqData,
  IChatUsersReqData,
};
