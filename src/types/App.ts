import { Router } from '../services/navigation';
import type { Store } from '../services/store';

declare global {
  interface Window {
    router: typeof Router;
    store: typeof Store;
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

  initStore: () => void;
}

export type {
  IAppState,
  IApp,
  IModalTemplateData,
};
