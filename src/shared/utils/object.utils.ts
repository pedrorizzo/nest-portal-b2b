export class ObjectUtils {
  /**
   * Check if object is empty
   * @param object target object
   * @returns boolean
   */
  static isEmpty(object: any): boolean {
    if (
      object &&
      Object.keys(object).length === 0 &&
      Object.getPrototypeOf(object) === Object.prototype
    ) {
      return true;
    } else {
      return false;
    }
  }
  /**
   * Remove undefined fields
   * @param object target object
   * @returns validated object
   */
  static ensure(object: any) {
    if (!object) return {};
    Object.keys(object).forEach((key) => {
      object[key] === undefined ? delete object[key] : {};
    });
  }
}
