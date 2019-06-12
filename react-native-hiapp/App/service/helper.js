import { Alert } from 'react-native';


export class Modal {
  /**
   * 提示框
   * @param {*} title
   * @param {*} content
   */
  static message = (content, title = '提示') => {
    Alert.alert(
      title,
      content,
      [{ text: '确定' }],
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
