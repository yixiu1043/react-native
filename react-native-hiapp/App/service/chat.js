import * as IMClient from 'rongcloud-react-native-imlib';
import Config from '@Config';
import Storage from '@Utils/storage';

console.log('OUTPUT: IMClient', IMClient);

const TOKEN = Storage.get('token');
console.log('OUTPUT: TOKEN', TOKEN);

export default class ChatService {
  /**
   * 链接融云服务
   */
  static start = (token) => {
    // console.log('OUTPUT: ChatService -> staticstart -> token', token);
    // console.log('OUTPUT: ChatService -> staticstart -> start', Config.APPKEY);
    // return;
    IMClient.init(Config.APPKEY);
    IMClient.addConnectionStatusListener((status) => {
      switch (status) {
        case 0:
          console.log('连接成功！');
          break;

        default:
          break;
      }
    });
    IMClient.connect(
      token,
      () => {
        console.log('连接成功！');
      },
      () => {
        console.log('连接失败！');
      },
      () => {
        console.log('token无效！');
      },
    );
  }
}
