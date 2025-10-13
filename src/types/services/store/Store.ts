type Indexed<T = any> = {
  [key in string]: T;
};

type TUserDetails = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
  login: string,
  avatar: string,
  email: string
};

type TChatDetails = {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  created_by: number,
  last_message: {
    user: Omit<TUserDetails, "id" | "display_name">,
    time: string,
    content: string,
  } | null,
};

type TMessage = {
  chat_id?: number,
  time: string,
  type?: string,
  user_id: number,
  content: string,
  file?: {
    id: number,
    user_id: number,
    path: string,
    filename: string,
    content_type: string,
    content_size: number,
    upload_date: string,
  },
};

interface IState {
  auth: {
    isLoading: boolean,
    isAuthenticated: boolean,
    user: TUserDetails | null,
  },
  chats: {
    isLoading: boolean,
    allChats: Array<TChatDetails>,
  },
  currentChat: {
    id: number | null,
    chatDetails: null,
    chatUsers: Array<Omit<TUserDetails, "phone" | "email"> & { role: string }>,
    messages: Array<TMessage>,
  },
  searchResults: TUserDetails[],
  websocket: WebSocket | null,
}

export type {
  Indexed,
  IState,
  TChatDetails,
  TUserDetails,
  TMessage,
};
