const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

type HttpMethod = keyof typeof METHODS;
type HttpData = Record<string, string> | FormData | URLSearchParams;
type HttpHeaders = Record<string, string>;

interface HttpOptions {
  data?: HttpData;
  headers?: HttpHeaders;
  timeout?: number;
}

interface FullHttpOptions extends HttpOptions {
  method: HttpMethod;
}

interface HttpResponse extends XMLHttpRequest {
  // ожидаем любой ответ
  responseJSON?: any;
  responseXML: Document | null;
}

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
  /* eslint-disable max-len */
  get = (url: string, options: HttpOptions = {}): Promise<HttpResponse> => this.request(url, { ...options, method: 'GET' }, options.timeout);

  post = (url: string, options: HttpOptions = {}): Promise<HttpResponse> => this.request(url, { ...options, method: 'POST' }, options.timeout);

  put = (url: string, options: HttpOptions = {}): Promise<HttpResponse> => this.request(url, { ...options, method: 'PUT' }, options.timeout);

  delete = (url: string, options: HttpOptions = {}): Promise<HttpResponse> => this.request(url, { ...options, method: 'DELETE' }, options.timeout);
  /* eslint-enable max-len */

  private request = (
    url: string,
    options: FullHttpOptions,
    timeout = 5000,
  ): Promise<HttpResponse> => {
    const { headers = {}, method, data } = options;

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
        resolve(xhr as HttpResponse);
      };

      xhr.onabort = () => reject(new Error('Request aborted'));
      xhr.onerror = () => reject(new Error('Network error'));
      xhr.ontimeout = () => reject(new Error('Request timeout'));

      xhr.timeout = timeout;

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
  };
}
