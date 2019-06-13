import { handleActions } from 'redux-actions';
import types from '../Types';

export default handleActions(
  {
    [types.INIT_TIMELINE](state, action) {
      return {
        ...state,
        timeline: action.payload,
      };
    },
    [types.PREPEND_TIMELINE](state, action) {
      return {
        ...state,
        timeline: [...action.payload, ...state.timeline],
      };
    },
    [types.APPEND_TIMELINE](state, action) {
      return {
        ...state,
        timeline: [...state.timeline, ...action.payload],
      };
    },
    [types.SET_CHATROOM_LIST](state, action) {
      return {
        ...state,
        chatRoomList: [...action.payload],
      };
    },
  },
  {
    // state
    timeline: [],
    chatRoomList: [],
  },
);
