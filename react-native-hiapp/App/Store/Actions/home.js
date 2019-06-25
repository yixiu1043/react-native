import { createAction } from 'redux-actions';
import types from '../Types';

export const initTimeline = createAction(types.INIT_TIMELINE);
export const appendTimeline = createAction(types.APPEND_TIMELINE);
export const prependTimeline = createAction(types.PREPEND_TIMELINE);
export const setChatRoomList = createAction(types.SET_CHATROOM_LIST);
