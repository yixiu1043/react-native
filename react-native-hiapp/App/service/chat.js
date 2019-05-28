// import store from '../store';
import {
  start, joinChatRoom, sendPersonMessage, reconnect, disconnect,
} from '@libs/rongCloud';
// import { showToast, showLoading, hideLoading } from './helper';

const APPKEY = 'kj7swf8ok3m02';

export default class ChatService {
  /**
   * 链接融云服务
   */
  static rongCloudStart(token, userId) {
    start({
      appKey: APPKEY,
      token,
      userId,
      callbacks: {
        connectSuccess: () => {
          // store.commit('SET_RONGCLOUD_CONNECT', true);
        },
        connectionStatusListener: (res) => {
          this.connectionStatusListener(res);
        },
        receiveNewMessage: (message) => {
          this.receiveNewMessage(message);
        },
        onError: (message) => {
          // hideLoading();
          // showToast(message);
        },
      },
    });
  }

  /**
   * 监听收到消息
   * @param {*} message
   */
  static receiveNewMessage(message) {
    // console.log('收到新消息>>>>>>>>>>>>>>>>');
    // console.log(message);
    const { content } = message.content.message || message;
    const chatDetails = {
      type: content.type,
      msg: content.msg,
      avatar: content.avatar,
      sentUser: content.sentUser,
      messageId: message.messageId,
      targetId: message.targetId,
      receivedTime: message.receivedTime,
      sentTime: message.sentTime,
    };
    // store.commit('GET_CLIENT_CHAT_LIST', chatDetails);
  }

  /**
   * 监听融云连接状态
   * @param {*} res
   */
  static connectionStatusListener(res) {
    const { code, message } = res;

    switch (code) {
      case 0:
        // hideLoading();
        break;
      case 2:
        if (path !== '/') {
          // showMsgBox('服务断开连接,是否重连？');
        }
        break;
      case 3:
        // showToast(message);
        break;
      case 4:
        // showMsgBox('未知原因,连接关闭,是否重连？');
        break;
      case 6:
        // showMsgBox('您在其他设备登录,是否重连？');
        break;
      case 12:
        // showToast(message);
        break;

      default:
        break;
    }
  }

  /**
   * 加入聊天室
   * @param {*} chatRoomId
   */
  static joinChatRoom = async (chatRoomId) => {
    // showLoading('加载中,请稍后');
    await joinChatRoom({
      chatRoomId,
      success: () => {
        // hideLoading();
      },
      error: () => {
        // hideLoading();
        // showToast('拉取聊天室历史消息失败');
      },
    });
  }

  /**
   * 发送融云自定义消息
   * @param {*} { conversationType, targetId, content, success, error,}
   * @param content: { type: user用户|notice公告|planMsg|开奖信息, msg: 消息, avatar: 头像, }
   * content可以拓展其他的自定义信息，type可以拓展自己定义消息类型，
   */
  static sendPersonMessage({
    conversationType,
    targetId,
    content,
    success,
    error,
  }) {
    sendPersonMessage({
      conversationType,
      targetId,
      content,
      success: (message) => {
        success(message);
        const chatDetails = {
          type: message.content.type,
          msg: message.content.msg,
          avatar: message.content.avatar,
          sentUser: message.content.sentUser,
          messageId: message.messageId,
          targetId: message.targetId,
          receivedTime: message.receivedTime,
          sentTime: message.sentTime,
        };
        // store.commit('GET_CLIENT_CHAT_LIST', chatDetails);
      },
      error: message => error(message),
    });
  }

  /**
   * 重连接
   */
  static reconnect() {
    reconnect({
      // success: message => showToast(message),
      // error: message => showToast(message),
    });
  }

  /**
   * 退出登录断开连接
  */
  static disconnect() {
    disconnect();
  }
}
