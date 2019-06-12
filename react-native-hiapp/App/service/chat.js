import * as IMClient from 'rongcloud-react-native-imlib';
import Config from '@Config';

/**
 * 聊天室服务
 * @export
 * @class ChatService
 */
export default class ChatService {
  /**
   * 链接融云服务
   * @param token
   */
  static start = (token) => {
    ChatService.init(Config.APPKEY);
    ChatService.connect(token);
    ChatService.addConnectionStatusListener();
    ChatService.addReceiveMessageListener();
  }

  /**
   * im初始化
   * @param appKey
   */
  static init = (appKey) => {
    IMClient.init(appKey);
  }

  /**
   * 连接im
   * @param token
   */
  static connect = (token) => {
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

  /**
   * 添加连接状态监听器
   */
  static addConnectionStatusListener = () => {
    IMClient.addConnectionStatusListener((status) => {
      switch (status) {
        case 0:
          console.log('连接成功！');
          break;

        default:
          break;
      }
    });
  }

  /**
   * 添加接收消息监听器
   */
  static addReceiveMessageListener = () => {
    IMClient.addReceiveMessageListener((message) => {
      console.log(message);
    });
  }

  /**
   * 断开连接
   */
  static disconnect = () => {
    IMClient.disconnect(false);
  }

  /**
   * 发送消息
   * @param targetId 根据会话类型的不同，可以是用户 ID、讨论组 ID、组群 ID 等
   * @param content
   * @param callback
   * @param chatType
   */
  static sendMessage = (targetId, message, callback, chatType) => {
    const { PRIVATE, CHATROOM } = IMClient.ConversationType;
    // const conversationType = chatType ?
    // IMClient.ConversationType.PRIVATE :
    // IMClient.ConversationType.CHATROOM;
    const conversationType = chatType ? PRIVATE : CHATROOM;
    const content = { type: message.type || 'text', content: message.content };
    IMClient.sendMessage(
      { conversationType, targetId, content },
      {
        success(messageId) {
          console.log(`发送成功：${messageId}`);
          if (callback) {
            callback.success(messageId);
          }
        },
        error(errorCode) {
          console.log(`发送失败：${errorCode}`);
          if (callback) {
            callback.error(errorCode);
          }
        },
      },
    );
  }

  /**
   * 加入聊天室,如果聊天室不存在，会自动创建并加入。加入已经存在的聊天室，如果聊天室不存在，则会抛出错误
   * @param chatRoomId 为默认拉取的消息数量，-1 时不拉取任何消息，0 时拉取 10 条消息，最多只能拉取 50 条
   * @param messageCount
   */
  static joinChatRoom = async (chatRoomId, messageCount = -1) => {
    IMClient.joinChatRoom(chatRoomId, messageCount);
    try {
      await IMClient.joinExistChatRoom(chatRoomId, messageCount);
    } catch (error) {
      if (error.code === IMClient.ErrorCode.CHATROOM_NOT_EXIST) {
        console.log('聊天室不存在');
      }
    }
  }

  /**
   * 退出聊天室
   * @param chatRoomId
   */
  static quitChatRoom = (chatRoomId) => {
    IMClient.quitChatRoom(chatRoomId);
  }
}
