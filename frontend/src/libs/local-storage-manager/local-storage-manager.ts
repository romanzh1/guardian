import { cloneDeep, forEach } from 'lodash';
import { nanoid } from 'nanoid';
import * as z from 'zod';
import { deepProxy } from './deep-proxy';
import { LocalStorageType } from './types';

export class LocalStorageManager {
  public readonly name: string;

  public readonly schema: any;

  public readonly defaultData: LocalStorageType;

  public data: LocalStorageType;

  private tempData: LocalStorageType;

  constructor(name: string, schema: z.ZodSchema<LocalStorageType>, defaultData: LocalStorageType) {
    this.name = name;
    this.schema = schema;
    this.defaultData = defaultData;
    this.tempData = this.get();
    this.data = this.tempData;
    this.sign();

    // eslint-disable-next-line no-restricted-globals
    addEventListener('storage', event => {
      if (event.key === this.name) {
        this.tempData = this.get();
        this.sign();
        this.notify();
      }
    });
  }

  public set(obj: LocalStorageType): void {
    try {
      // z.(obj, this.schema);
      const stringObj = JSON.stringify(obj);
      localStorage.setItem(this.name, stringObj);
    } catch (e) {
      console.warn(
        'Ошибка валидации. Произошла попытка записать в localStorage дынные не соответствующие схеме валидации.',
      );
      console.warn(e);
    }
  }

  public get(): LocalStorageType {
    const item = localStorage.getItem(this.name);

    if (item) {
      let obj;
      try {
        obj = JSON.parse(item);
      } catch (e) {
        console.warn('Ошибка парсинга. Данные в localStorage повреждены.');
        console.warn(e);
        return this.defaultData;
      }
      try {
        return this.schema.parse(obj);
      } catch (e) {
        console.warn('Ошибка валидации. Данные в localStorage не соответствуют схеме валидации.');
        console.warn(e);
        return this.defaultData;
      }
    }
    return this.defaultData;
  }

  private sign() {
    const onGet = () => {};
    const onSet = () => {
      // при использовании deepProxy использовать только вновь созданный объект this.tempData
      // если использовать  this.tempData который был ранее связан по средствам deepProxy с this.data происходит зацикливание вызовов onSet и sing
      // не смотря на то что this.tempData выглядит простым объектом, при его изменении срабатывает onSet
      this.tempData = cloneDeep(this.tempData);
      this.set(this.tempData);
      this.sign();
      this.notify();
    };
    this.data = deepProxy(this.tempData, onGet, onSet);
  }

  private subscriptions: Record<string, (state: LocalStorageType) => void> = {};

  public subscribe(callback: (state: LocalStorageType) => void): string {
    const id = nanoid();
    this.subscriptions[id] = callback;
    return id;
  }

  public unsubscribe(id: string) {
    delete this.subscriptions[id];
  }

  private notify() {
    forEach(this.subscriptions, (subscription, key) => {
      subscription(this.data);
    });
  }
}
