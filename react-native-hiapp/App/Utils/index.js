import { Dimensions, Platform } from 'react-native';

export function getRemoteAvatar(id) {
  return `https://loremflickr.com/70/70/people?lock=${id}`;
}

export const deviceInfo = {
  deviceWidth: Dimensions.get('window').width,
  deviceHeight: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height - 24,
  isIphoneX: Dimensions.get('window').width === 375 && Dimensions.get('window').height === 812,
  // 设备系统
  deviceOS: Platform.OS,
  // 当前config: debug \ release
  mode: __DEV__ ? 'xdebug' : 'release',
};
