import { TRequest } from './types';

export class RequestError<T> extends Error {
  detail: TRequest<T>;

  constructor(message: string, detail: TRequest<T>) {
    super(message);
    this.name = 'RequestError';
    this.detail = detail;
    console.warn('Детали ошибки ', detail);
  }
}
