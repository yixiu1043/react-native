import { createAction } from 'redux-actions';
import types from '../Types';

export const setChatList = createAction(types.SET_CHATLIST);
export const addChatList = createAction(types.ADD_CHATLIST);
