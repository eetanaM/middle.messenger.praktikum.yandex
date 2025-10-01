import { BASE_URL } from "../../utils/constants/consts";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

type TRequestMethod = keyof typeof METHODS;
type TRequestData = Record<string, string> | FormData | URLSearchParams;
type TRequestHeaders = Record<string, string>;

interface TRequestOptions {
  data?: TRequestData;
  headers?: TRequestHeaders;
  timeout?: number;
}

interface IFullHttpOptions extends TRequestOptions {
  method: TRequestMethod;
}

type THTTPMethod = <R = unknown>(url: string, options?: TRequestOptions) => Promise<R>;

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

  private createMethod(method: TRequestMethod): THTTPMethod {
    return (url, options = {}) => this.request(`${this._requestUrl}${url}`, { ...options, method });
  }

  public readonly get = this.createMethod(METHODS.GET);

  public readonly put = this.createMethod(METHODS.PUT);

  public readonly post = this.createMethod(METHODS.POST);

  public readonly delete = this.createMethod(METHODS.DELETE);

  private request<R>(
    url: string,
    options: IFullHttpOptions,
  ): Promise<R> {
    const {
      headers = {}, method, data, timeout,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      let requestUrl = url;
      if (isGet && data && isPlainObject(data)) {
        requestUrl = `${url}${queryStringify(data)}`;
      }

      xhr.open(method, requestUrl);

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => {
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
        xhr.send(data as XMLHttpRequestBodyInit);
      }
    });
  }
}
