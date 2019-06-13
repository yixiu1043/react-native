import { handleActions } from 'redux-actions';
import types from '../Types';

export default handleActions(
  {
    [types.SET_CHATLIST](state, action) {
      return {
        ...state,
        chatList: [...action.payload],
      };
    },
    [types.ADD_CHATLIST](state, action) {
      console.log('OUTPUT: action', action);
      return {
        ...state,
        chatList: [action.payload, ...state.chatList],
      };
    },
  },
  {
    chatList: [],
  },
);
