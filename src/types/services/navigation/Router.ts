import type { Block } from "../../../services/block";

interface IRouter {
  routes: Array<any>
  use(path: string, block: Block): void
  start(): void
  go(path: string): void
  back(): void
  forward(): void
}

export type {
  IRouter,
};
