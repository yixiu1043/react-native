import Store from '@Store';
import req from '@Network';
import conifg from '@Config';
import { setToken, setChatRoomList } from '@Store/Actions';

export default class Api {
  /**
   * 获取聊天室列表
   * @returns {Promise}
   */
  static fetchChatRoomList() {
    return req.get(`${conifg.domain}/photos`, { query: { _limit: 9 } })
      .then((res) => {
        Store.dispatch(setChatRoomList(res));
      });
  }

  /**
   * 获取融云token
   * @param {*} userId
   * @param {*} password
   * @returns {Promise}
   */
  static fetchUserToken(userId, password) {
    return req.get(`${conifg.imUrl}/user/token`, { query: { userId, password } })
      .then((res) => {
        const { token } = res;
        Store.dispatch(setToken(token));
        return token;
      });
  }
}
