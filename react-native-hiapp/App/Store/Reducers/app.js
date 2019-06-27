import { handleActions } from 'redux-actions';
import types from '../Types';

export default handleActions(
  {
    [types.INIT_USER_INFO](state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
    [types.SET_MODAL_VISIBLE_STATUS](state, action) {
      console.log(action);
      const { name, status } = action.payload;
      const { modalVisible } = state;
      modalVisible[name] = status;
      return {
        ...state,
        modalVisible: {
          ...modalVisible,
        },
      };
    },
    [types.SET_TOKEN](state, action) {
      return {
        ...state,
        token: action.payload,
      };
    },
    [types.SET_ISLOGIN](state, action) {
      return {
        ...state,
        isLogin: action.payload,
      };
    },
    [types.SET_USER_INFO](state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
  {
    token: '',
    user: {},
    isLogin: false,
    modalVisible: {
      publisher: false,
    },
  },
);
