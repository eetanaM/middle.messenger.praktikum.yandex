type Indexed<T = any> = {
  [key in string]: T;
};

interface IState {
  isAuthenticated: boolean,
  auth: {
    isLoading: boolean,
    user: {
      id: string,
      first_name: string,
      second_name: string,
      display_name: string,
      phone: string,
      login: string,
      avatar: string,
      email: string
    } | null,
  }
}

export type {
  Indexed,
  IState,
};
