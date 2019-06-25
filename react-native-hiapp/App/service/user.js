import Store from '@Store';
import Storage from '@Utils/storage';
import ChatService from './chat';
import { setLogin } from '@Store/Actions';
import Api from '@Service/api';

export default class UserService {
  /**
   * 用户登录
   * @param {*} username
   * @param {*} password
   * @returns {Promise}
   */
  static login(username, password) {
    return Api.fetchUserToken(username, password)
      .then((token) => {
        Store.dispatch(setLogin(true));
        Storage.save('token', token);
        Storage.save('userId', username);
        ChatService.start(token);
        return token;
      });
  }

  /**
   * 登出
   * @returns {Promise}
   */
  static logout() {
    try {
      Storage.delete('token');
      Storage.delete('userId');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
}
