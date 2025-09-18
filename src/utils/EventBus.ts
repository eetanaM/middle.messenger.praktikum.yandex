import type { Callback, IEventBus } from './types/EventBus';

class EventBus implements IEventBus {
  private _listeners: {
    [key: string]: Callback[]
  } = {};

  get listeners() {
    return this._listeners;
  }

  on = (event: string, listener: Callback) => {
    if (!this._listeners[event]) {
      this._listeners[event] = [];
    }
    this._listeners[event].push(listener);
  };

  off = (event: string, listener: Callback) => {
    if (!this._listeners[event]) {
      throw new Error(`There is no such event: ${event}`);
    }

    this._listeners[event] = this._listeners[event].filter((fn) => fn !== listener);
  };

  emit = (event: string, ...args: unknown[]) => {
    if (!this._listeners[event]) {
      throw new Error(`There is no such event: ${event}`);
    }
    this._listeners[event].forEach((callback) => {
      callback(...args);
    });
  };
}

export default EventBus;
