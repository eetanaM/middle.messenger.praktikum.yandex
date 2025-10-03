export class BaseApi {
  protected _checkResponse = <T>(res: Response): Promise<T> => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status} - ${res.statusText}`));
  };

  public create() { throw new Error('Not implemented'); }

  public request() { throw new Error('Not implemented'); }

  public update() { throw new Error('Not implemented'); }

  public delete() { throw new Error('Not implemented'); }
}
