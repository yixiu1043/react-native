import * as IMClient from 'rongcloud-react-native-imlib';

export const init = (appKey) => {
  IMClient.init(appKey);
};

function onSuccess(userId) {
  console.log('连接成功：' + userId);
}

function onError(errorCode) {
  console.log('连接失败：' + errorCode);
}

function onTokenIncorrect() {
  console.log('Token 不正确或已过期');
}

export const connect = (token) => {
  IMClient.connect(
    token,
    onSuccess,
    onError,
    onTokenIncorrect,
  );
};
