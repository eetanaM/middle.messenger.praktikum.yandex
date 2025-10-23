import HTTPTransport from "./HTTPTransport";
import { BASE_URL } from "../../utils/constants/consts";

describe("HTTPTranspot tests", () => {
  const open = jest.fn();
  const send = jest.fn();
  const onload = jest.fn();
  const onerror = jest.fn();
  const onabort = jest.fn();
  const ontimeout = jest.fn();
  const xhrMock = {
    open,
    send,
    setRequestHeader: jest.fn(),
    onload,
    onerror,
    onabort,
    ontimeout,
    withCredentials: false,
  };

  global.XMLHttpRequest = jest.fn(() => xhrMock) as unknown as typeof XMLHttpRequest;

  it("should prepend BASE_URL to given path", () => {
    const testHTTP = new HTTPTransport("/test");
    expect((testHTTP as any)._requestUrl).toBe(`${BASE_URL}/test`);
  });

  it("should append query string for GET request", async () => {
    const testHTTP = new HTTPTransport("/test");
    const promise = testHTTP.get("/test", { data: { name: "john", age: "20" } });

    // Имитация успешного завершения запроса
    xhrMock.onload();

    await promise;

    expect(open).toHaveBeenCalledWith(
      "GET",
      `${BASE_URL}/test/test?name=john&age=20`,
    );
  });

  it("should set headers for POST request", async () => {
    const testHTTP = new HTTPTransport("/test");
    const promise = testHTTP.post("/test", { data: { name: "Bob" } });

    // Имитация успешного завершения запроса
    xhrMock.onload();

    await promise;

    expect(xhrMock.setRequestHeader).toHaveBeenCalledWith(
      "Content-Type",
      "application/json",
    );
  });

  describe("Errors handling", () => {
    it("should reject on error", async () => {
      const transport = new HTTPTransport("/test");
      const promise = transport.get("/error");

      // Имитация ошибки запроса
      xhrMock.onerror();

      await expect(promise).rejects.toThrow("Network error");
    });

    it("should reject on abort", async () => {
      const transport = new HTTPTransport("/test");
      const promise = transport.get("/abort");

      // Имитация отмены запроса
      xhrMock.onabort();

      await expect(promise).rejects.toThrow("Request aborted");
    });

    it("should reject on timeout", async () => {
      const transport = new HTTPTransport("/test");
      const promise = transport.get("/timeout");

      // Имитация таймаута запроса
      xhrMock.ontimeout();

      await expect(promise).rejects.toThrow("Request timeout");
    });
  });
});
