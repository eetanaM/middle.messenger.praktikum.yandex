import Router from "./Router";
import Route from "./Route";
import type { TPageBlock } from "../../types/services/navigation/Route";

jest.mock("./Route");

describe("Router tests", () => {
  beforeEach(() => {
    (Route as jest.Mock).mockClear();
  });

  it("should implement Singleton pattern", () => {
    const first = new (Router as any).constructor("#app");
    const second = new (Router as any).constructor("#app");

    expect(first).toBe(second);
  });

  it("should return Router instance by calling use method (chaining)", () => {
    Router.routes = [];

    const blockMock = jest.fn() as unknown as TPageBlock;
    const result = Router.use("/test", blockMock);

    expect(result).toBe(Router);
  });

  it("should create new Route", () => {
    Router.routes = [];

    const blockMock = jest.fn() as unknown as TPageBlock;
    Router.use("/test", blockMock);

    expect(Router.routes.length).toBe(1);
  });

  it("should push new state and call _onRoute", () => {
    const onRouteSpy = jest.spyOn(Router as any, "_onRoute");
    const pushStateSpy = jest.spyOn(Router.history as any, "pushState");
    Router.routes = [];

    const blockMock = jest.fn() as unknown as TPageBlock;
    Router.use("/test", blockMock);
    Router.go("/test");

    expect(pushStateSpy).toHaveBeenCalledWith({}, "", "/test");
    expect(onRouteSpy).toHaveBeenCalled();
  });

  it("should call history.back()", () => {
    const spy = jest.spyOn(Router.history as any, "back");
    Router.back();
    expect(spy).toHaveBeenCalled();
  });

  it("should call history.forward()", () => {
    const spy = jest.spyOn(Router.history as any, "forward");
    Router.forward();
    expect(spy).toHaveBeenCalled();
  });

  it("should return matching route", () => {
    const routeMock = { match: jest.fn().mockReturnValue(true) };
    Router.routes = [routeMock];

    expect(Router.getRoute("/path")).toBe(routeMock);
  });
});
