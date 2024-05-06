import { forEach, isPlainObject } from 'lodash';

const proxyHandler = (onGet: () => void, onSet: () => void): ProxyHandler<Object> => ({
  get(target, property, receiver) {
    const result = Reflect.get(target, property, receiver);
    onGet();
    return result;
  },
  set(target, property, value, receiver) {
    const result = Reflect.set(target, property, value, receiver);
    onSet();
    return result;
  },
});

export const deepProxy = <T extends unknown>(value: T, onGet: () => void, onSet: () => void): T => {
  if (isPlainObject(value)) {
    const obj = value as any;
    forEach(obj, (v, k) => {
      // eslint-disable-next-line no-param-reassign
      obj[k] = deepProxy(v, onGet, onSet);
    });
    return new Proxy(obj, proxyHandler(onGet, onSet));
  }
  return value;
};
