import req from '@Network';
import types from '../Types';
import { createAction } from 'redux-actions';
import Api from '@Service/api';

export const initTimeline = createAction(types.INIT_TIMELINE);
export const appendTimeline = createAction(types.APPEND_TIMELINE);
export const prependTimeline = createAction(types.PREPEND_TIMELINE);
export const setChatRoomList = createAction(types.SET_CHATROOM_LIST);

export function fetchChatRoomList() {
  return dispatch => req.get(`${Api.chatRoomList}`, { query: { _limit: 9 } })
    .then((res) => {
      dispatch(setChatRoomList(res));
    });
}
