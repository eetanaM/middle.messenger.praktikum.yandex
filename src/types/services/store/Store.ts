type Indexed<T = any> = {
  [key in string]: T;
};

type TUserDetails = {
  id: string,
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
  }
};

interface IState {
  auth: {
    isLoading: boolean,
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
  },
}

export type {
  Indexed,
  IState,
  TChatDetails,
};
