type Callback = (...args: unknown[]) => void;

interface IEventBus {
  readonly listeners: {
    [key: string]: Callback[];
  }

  on: (event: string, listener: Callback) => void
  off: (event: string, listener: Callback) => void
  emit: (event: string, ...args: unknown[]) => void
}

export type {
  Callback,
  IEventBus,
};
