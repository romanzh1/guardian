/* eslint-disable max-classes-per-file */
import { RequestError } from './request-error';
import { RequestConfig, TRequest } from './types';
import { queryParamsStr } from './query-params-to-string';

export class Request {
  public enabledMock: boolean = false;

  public preprocessor: Array<<T>(config: RequestConfig<T>) => RequestConfig<T>> = [];

  public host: string | undefined;

  public delay: number | undefined;

  public middleware: Array<<T>(query: TRequest<T>) => TRequest<T>> = [];

  public validate: <T>(data: T, schema: any) => void = () => {
    // eslint-disable-next-line no-console
    console.warn('Схема валидации данных не задана');
  };

  public backErrorHandler: (<T>(query: TRequest<T>) => string | undefined) | undefined;

  private pause = (ms: number) =>
    new Promise((res, rej) => {
      setTimeout(() => {
        res(true);
      }, ms);
    });

  private createEmptyQuery = (): TRequest<any> => ({
    requestConfig: undefined,
    preprocessedConfig: undefined,
    response: undefined,
    data: undefined,
    status: 0,
    isError: false,
    isFetchError: false,
    isBackError: false,
    isSchemaError: false,
    isParseJsonError: false,
    isResponseModifierError: false,
    hasMock: false,
    isMockError: false,
    isMiddlewareError: false,
    isPreprocessorError: false,
    isDelayed: false,
    hasMiddleware: false,
    hasPreprocessor: false,
    hasResponseModifier: false,
    errorText: '',
    initialError: null,
  });

  async send<T>(config: RequestConfig<T>): Promise<T> {
    const request = this.createEmptyQuery();
    request.requestConfig = config;
    let processedConfig = config;

    try {
      request.hasPreprocessor = this.preprocessor.length > 0;
      this.preprocessor.forEach(preprocess => {
        processedConfig = preprocess(processedConfig);
      });
    } catch (e) {
      const error = e as Error;
      request.isError = true;
      request.isPreprocessorError = true;
      request.initialError = error;
      request.errorText = `Ошибка в препроцессоре конфига ${config.method} ${config.url}`;
      throw new RequestError(request.errorText, request);
    }
    request.preprocessedConfig = processedConfig;

    const {
      method,
      url,
      queryParams,
      validate,
      mock,
      responseModifier,
      positiveSchema,
      negativeSchema,
      delay,
      backErrorHandler,
      responseType = 'json',
      readResponse,
      headers: initHeaders,
      body,
      ...rest
    } = request.preprocessedConfig;

    const headers = new Headers(initHeaders);
    const params = queryParamsStr(queryParams);

    if (!headers.has('Content-Type') && body && typeof body === 'string') {
      headers.append('Content-Type', 'application/json;charset=utf-8');
    }

    const newUrl = this.host ? new URL(url, this.host) : url;
    // const baseUrl = new URL(url, this.host);
    // const newUrl = baseUrl.href.endsWith('/') ? baseUrl.href.slice(0, -1) : baseUrl.href;

    if (delay) {
      await this.pause(delay);
      request.isDelayed = true;
    } else if (this.delay) {
      await this.pause(this.delay);
      request.isDelayed = true;
    }

    if (this.enabledMock && mock) {
      try {
        request.hasMock = true;
        request.data = mock(request.preprocessedConfig);
      } catch (e) {
        const error = e as Error;
        request.isError = true;
        request.isMockError = true;
        request.initialError = error;
        request.errorText = `Ошибка подстановки тестовых данных: ${method} ${newUrl}`;
        throw new RequestError(request.errorText, request);
      }
    } else {
      try {
        request.response = await fetch(newUrl + params, {
          method,
          headers,
          body,
          ...rest,
        });
        request.status = request.response.status;
      } catch (e) {
        const error = e as Error;
        request.isError = true;
        request.isFetchError = true;
        request.initialError = error;
        request.errorText = `Ошибка отправки запроса ${method} ${newUrl}`;
        throw new RequestError(request.errorText, request);
      }

      try {
        const contentLength = request.response.headers.get('content-length');
        const noContent = request.response.status === 204 || (contentLength && Number(contentLength) === 0);

        if (noContent) {
          request.data = null;
        } else if (readResponse) {
          request.data = await readResponse(request.response);
        } else {
          if (responseType === 'text') {
            request.data = await request.response.text();
          }
          if (responseType === 'json') {
            request.data = await request.response.json();
          }
          if (responseType === 'formData') {
            request.data = await request.response.formData();
          }
          if (responseType === 'blob') {
            request.data = await request.response.blob();
          }
          if (responseType === 'arrayBuffer') {
            request.data = await request.response.arrayBuffer();
          }
        }
      } catch (e) {
        const error = e as Error;
        request.isError = true;
        request.isParseJsonError = true;
        request.initialError = error;
        request.errorText = `Ошибка при парсе ответа ${method} ${newUrl}`;
        throw new RequestError(request.errorText, request);
      }

      if (!request.response.ok) {
        request.isError = true;
        request.isBackError = true;
        try {
          if (validate) {
            await validate(request.data);
          }
          if (negativeSchema) {
            await this.validate(request.data, negativeSchema);
          }
        } catch (e) {
          const error = e as Error;
          request.isSchemaError = true;
          request.initialError = error;
          request.errorText = `Ошибка ${request.status}:  ${method} ${newUrl} (ошибка в схеме ответа)`;
          throw new RequestError(request.errorText, request);
        }

        let handlerResult;
        if (backErrorHandler) {
          handlerResult = backErrorHandler(request);
        } else if (this.backErrorHandler) {
          handlerResult = this.backErrorHandler(request);
        }
        request.errorText = handlerResult || `Ошибка ${request.status}:  ${method} ${newUrl}`;
        throw new RequestError(request.errorText, request);
      }
    }

    try {
      if (responseModifier) {
        request.hasResponseModifier = true;
        request.data = responseModifier(request.data);
      }
    } catch (e) {
      const error = e as Error;
      request.isError = true;
      request.isResponseModifierError = true;
      request.initialError = error;
      request.errorText = `Ошибка при модификации ответа ${method} ${newUrl}`;
      throw new RequestError(request.errorText, request);
    }
    try {
      if (validate) {
        await validate(request.data);
      }
      if (positiveSchema) {
        await this.validate(request.data, positiveSchema);
      }
    } catch (e) {
      const error = e as Error;
      request.isError = true;
      request.isSchemaError = true;
      request.initialError = error;
      request.errorText = `Ошибка в структуре данных ответа на запрос ${method} ${newUrl}`;
      throw new RequestError(request.errorText, request);
    }

    let processedRequest = request;

    try {
      request.hasMiddleware = this.middleware.length > 0;
      this.middleware.forEach(mdl => {
        processedRequest = mdl(processedRequest);
      });
    } catch (e) {
      const error = e as Error;
      request.isError = true;
      request.isMiddlewareError = true;
      request.initialError = error;
      request.errorText = `Ошибка в промежуточном обработчике ${method} ${newUrl}`;
      throw new RequestError(request.errorText, request);
    }

    return processedRequest.data;
  }
}
