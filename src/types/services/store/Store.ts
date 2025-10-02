type Indexed<T = any> = {
  [key in string]: T;
};

interface IState {
  isAuthenticated: boolean,
  auth: {
    isLoading: boolean,
    user: {
      id: string,
    } | null,
  }
}

export type {
  Indexed,
  IState,
};
