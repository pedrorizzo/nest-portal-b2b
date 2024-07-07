import { ObjectUtils } from './object.utils';

export class ArrayUtils {
  static ensure(arr: any) {
    for (const item of arr) {
      if (typeof item === 'object') {
        ObjectUtils.ensure(item);
      } else {
        delete arr[item];
      }
    }
  }

  static isArray(target: any): boolean {
    return Array.isArray(target);
  }
}
