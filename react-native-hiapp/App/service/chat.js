import * as IMClient from 'rongcloud-react-native-imlib';
import Storage from '@Utils/storage';

const APPKEY = 'kj7swf8ok3m02';
const TOKEN = Storage.get('token');

export default class ChatService {
  /**
   * 链接融云服务
   */
  static start = () => {
    IMClient.init(APPKEY);
    IMClient.connect(
      TOKEN,
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
    IMClient.addConnectionStatusListener(status => {
      switch (status) {
        case 0:
          console.log('连接成功！');
          break;

        default:
          break;
      }
    })
  }
}
