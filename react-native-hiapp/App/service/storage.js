import AsyncStorage from '@react-native-community/async-storage';

export default class Storage {
  // 獲取資料
  static get = async key => AsyncStorage.getItem(key)
    .then(value => JSON.parse(value))

  // 儲存資料
  static set = async (key, value) => AsyncStorage.setItem(key,
    JSON.stringify(value))

  // 清除資料
  static clear = async () => AsyncStorage.clear()

  static remove = async key => AsyncStorage.removeItem(key)
}
