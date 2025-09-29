import type { IBlock } from './utils/block/Block';

interface IAppState {
  currentPage: string | null,
  accessToken: string | null,
  refreshToken: string | null,
}

interface IModalTemplateData {
  fileInputs?: Array<{
    type: string,
    name: string,
    id: string,
    src?: string,
  }>,
  inputs: Array<{
    type: string;
    name: string;
    placeholder: string;
  }>;
  button: Array<{
    id: string;
    type: string;
    textContent: string | number;
  }>;
}

abstract class IApp {
  state: IAppState;

  appElement: HTMLElement | null;

  modalRoot: HTMLElement | null;

  render:() => void;

  toggleModal: (block: IBlock) => void;

  changePage: (page: string) => void;
}

export type {
  IAppState,
  IApp,
  IModalTemplateData,
};
