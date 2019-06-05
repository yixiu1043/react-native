import conifg from '@Config';

export default class Api {
  // 获取聊天室列表
  static chatRoomList = `${conifg.domain}/photos`

  // 获取融云token
  static imToken = `${conifg.imUrl}/user/token`

}
