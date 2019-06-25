import req from '@Network';
import types from '../Types';
import { createAction } from 'redux-actions';

export const initUserInfo = createAction(types.INIT_USER_INFO);
export const setModalVisibleStatus = createAction(types.SET_MODAL_VISIBLE_STATUS);
export const setToken = createAction(types.SET_TOKEN);
export const setLogin = createAction(types.SET_ISLOGIN);

export function fetchUserInfo() {
  return (dispatch) => {
    req.get('/user_login.json').then((res) => {
      const { data } = res;
      dispatch(initUserInfo(data.user));
    });
  };
}
