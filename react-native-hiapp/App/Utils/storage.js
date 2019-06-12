import AsyncStorage from '@react-native-community/async-storage';
import merge from 'lodash/merge';

class Storage {
  /**
   * 获取
   * @param {String|Array} key
   * @return {Promise}
   */
  static get(key) {
    if (!Array.isArray(key)) {
      return AsyncStorage.getItem(key).then(value => JSON.parse(value));
    }
    return AsyncStorage.multiGet(key).then(values => values.map(value => JSON.parse(value[1])));
  }

  /**
   * 存储
   * @param  {String|Array} key
   * @param  {Any} value
   * @return {Promise}
   */
  static save(key, value) {
    if (!Array.isArray(key)) {
      return AsyncStorage.setItem(key, JSON.stringify(value));
    }
    const pairs = key.map(pair => [pair[0], JSON.stringify(pair[1])]);
    return AsyncStorage.multiSet(pairs);
  }

  /**
   * 更新
   * @param  {String} key
   * @param  {Value} value
   * @return {Promise}
   */
  static update(key, value) {
    return this.get(key).then((item) => {
      value = typeof value === 'string' ? value : merge({}, item, value);
      return AsyncStorage.setItem(key, JSON.stringify(value));
    });
  }

  /**
   * 删除
   * @param  {String|Array} key
   * @return {Promise}
   */
  static delete(key) {
    if (Array.isArray(key)) {
      return AsyncStorage.multiRemove(key);
    }
    return AsyncStorage.removeItem(key);
  }

  /**
   * 获取所有key
   * @return {Promise}
   */
  static keys() {
    return AsyncStorage.getAllKeys();
  }
}

export default Storage;
