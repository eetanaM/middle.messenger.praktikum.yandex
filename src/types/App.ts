import type { IBlock } from './services/block/Block';
import { Router } from '../services/navigation';

declare global {
  interface Window {
    router: typeof Router;
  }
}

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
  modalRoot: HTMLElement;

  initRouter: () => void;

  toggleModal: (block: IBlock) => void;
}

export type {
  IAppState,
  IApp,
  IModalTemplateData,
};
