import type App from "../../../App";

type Indexed<T = any> = {
  [key in string]: T;
};

interface IState {
  app: null | App,
  isAuthenticated: boolean,
  isLoading: boolean,
}

export type {
  Indexed,
  IState,
};
