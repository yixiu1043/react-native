/* eslint-disable no-unused-expressions */
import { Dimensions, Platform, Alert } from 'react-native';
import Storage from '@Utils/storage';

/**
 * 获取用户头像
 * @param {*} id
 * @returns
 */
export function getRemoteAvatar(id) {
  return `https://loremflickr.com/70/70/people?lock=${id}`;
}

/**
 * 获取设备信息
 * @returns
 */
export const getDeviceInfo = () => ({
  deviceWidth: Dimensions.get('window').width,
  deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24,
  isIphoneX: Dimensions.get('window').width === 375 && Dimensions.get('window').height === 812,
  // 设备系统
  deviceOS: Platform.OS,
  // 当前config: debug \ release
  mode: __DEV__ ? 'xdebug' : 'release',
});

/**
 * 提示框
 * @class Modal
 */
export class Modal {
  /**
   * 消息提示框
   * @param {*} title
   * @param {*} content
   */
  static info = (content, onOk, title = '提示') => {
    Alert.alert(
      title,
      content,
      [{ text: '确定', onPress: () => onOk() }],
      { cancelable: false },
    );
  };

  /**
   * 确认提示框
   * @param {*} title
   * @param {*} content
   * @param {*} onOk
   * @param {*} onCancel
   */
  static confirm = (content, onOk, onCancel, title = '提示') => {
    Alert.alert(
      title,
      content,
      [
        { text: '取消', onPress: () => onCancel() },
        { text: '确定', onPress: () => onOk() },
      ],
      { cancelable: false },
    );
  };
}

/**
 * 转换融云消息格式为gift chat需要的格式
 * @param {*} messageObj
 */
export const transformMessage = (messageObj) => {
  const data = {
    _id: messageObj.messageId,
    text: messageObj.content.content,
    createdAt: messageObj.sentTime,
    user: {
      _id: messageObj.senderUserId,
      name: messageObj.senderUserId,
      avatar: getRemoteAvatar(messageObj.senderUserId),
    },
  };
  return data;
};

/**
 * 制作消息到本地
 * @param {*} message
 */
export const makeMessage = (message) => {
  console.log('OUTPUT: makeMessage -> message', message);
  return Storage.get('userId').then((userId) => {
    console.log('OUTPUT: makeMessage -> res', userId);
    const data = {
      _id: Math.round(Math.random() * 1000000),
      text: message,
      createdAt: Date.now(),
      user: {
        _id: userId,
        name: userId,
        avatar: getRemoteAvatar(userId),
      },
    };
    return data;
  });
};
