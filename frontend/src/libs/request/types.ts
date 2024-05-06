/* eslint-disable no-undef */
export type Validation<T> = (data: T) => void;
export type ValidationSchema = any;
// eslint-disable-next-line no-use-before-define
export type Mock<T> = (config: RequestConfig<T>) => T;
export type ResponseModifier<T> = (data: T) => any;
export type BackErrorHandler<T> = (query: T) => string | undefined;

export type RequestConfig<T = any> = RequestInit & {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  queryParams?: Record<string, string | number>;
  validate?: Validation<T>;
  mock?: Mock<T>;
  responseModifier?: ResponseModifier<T>;
  positiveSchema?: ValidationSchema;
  negativeSchema?: ValidationSchema;
  delay?: number;
  backErrorHandler?: BackErrorHandler<T>;
  responseType?: 'text' | 'json' | 'formData' | 'blob' | 'arrayBuffer';
  readResponse?: (res: Response) => Promise<any>;
  id?: string;
};

export type RequestConfigFn<T = any> = (...props: Array<any>) => RequestConfig<T>;

export type TRequest<T> = {
  requestConfig: RequestConfig<T> | undefined;
  preprocessedConfig: RequestConfig<T> | undefined;
  response: Response | undefined;
  data: T;
  status: number;
  isError: boolean;
  isFetchError: boolean;
  isParseJsonError: boolean;
  isBackError: boolean;
  isSchemaError: boolean;
  isMockError: boolean;
  isMiddlewareError: boolean;
  isPreprocessorError: boolean;
  isResponseModifierError: boolean;
  isDelayed: boolean;
  hasMock: boolean;
  hasMiddleware: boolean;
  hasPreprocessor: boolean;
  hasResponseModifier: boolean;
  errorText: string;
  initialError: any | undefined;
};

export type QueryParams = string | number | Array<string | number>;
