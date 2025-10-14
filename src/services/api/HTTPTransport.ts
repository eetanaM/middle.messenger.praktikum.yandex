/* eslint-disable max-len */
import { BASE_URL } from "../../utils/constants/consts";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

type TRequestMethod = keyof typeof METHODS;
type TRequestData = Record<string, unknown> | FormData;
type TRequestHeaders = Record<string, string>;

interface TRequestOptions {
  data?: TRequestData;
  headers?: TRequestHeaders;
  timeout?: number;
}

interface IFullHttpOptions extends TRequestOptions {
  method: TRequestMethod;
}

type THTTPMethod<R = any> = (url: string, options?: TRequestOptions) => Promise<R>;

function queryStringify(data: Record<string, string>): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be non-null object');
  }

  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    params.append(key, value);
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

function isPlainObject(data: unknown): data is Record<string, string> {
  return typeof data === 'object' && data !== null && !(data instanceof FormData) && !(data instanceof URLSearchParams);
}

export default class HTTPTransport {
  private _requestUrl: string;

  constructor(url: string) {
    this._requestUrl = `${BASE_URL}${url}`;
  }

  private createMethod<R = XMLHttpRequest>(method: TRequestMethod): THTTPMethod<R> {
    return (url, options = {}) => this.request<R>(`${this._requestUrl}${url}`, { ...options, method });
  }

  public readonly get = <R = XMLHttpRequest>(url: string, options = {}) => this.createMethod<R>(METHODS.GET)(url, options);

  public readonly put = <R = XMLHttpRequest>(url: string, options = {}) => this.createMethod<R>(METHODS.PUT)(url, options);

  public readonly post = <R = XMLHttpRequest>(url: string, options = {}) => this.createMethod<R>(METHODS.POST)(url, options);

  public readonly delete = <R = XMLHttpRequest>(url: string, options = {}) => this.createMethod<R>(METHODS.DELETE)(url, options);

  private request<R = XMLHttpRequest>(
    url: string,
    options: IFullHttpOptions,
  ): Promise<R> {
    const {
      headers = {}, method, data, timeout,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      xhr.withCredentials = true;

      let requestUrl = url;
      if (isGet && data && isPlainObject(data)) {
        requestUrl = `${url}${queryStringify(data)}`;
      }

      xhr.open(method, requestUrl);

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
        // TODO: Переделать resolve и типизировать ответы, возвращать типизированный ответ
        resolve(xhr as R);
      };

      xhr.onabort = () => reject(new Error('Request aborted'));
      xhr.onerror = () => reject(new Error('Network error'));
      xhr.ontimeout = () => reject(new Error('Request timeout'));

      if (timeout) {
        xhr.timeout = timeout;
      }

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData || data instanceof URLSearchParams) {
        xhr.send(data);
      } else if (isPlainObject(data)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data as unknown as XMLHttpRequestBodyInit);
      }
    });
  }
}
