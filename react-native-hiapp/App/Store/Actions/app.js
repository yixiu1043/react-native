import req from '@Network'
import types from '../Types'
import { createAction } from 'redux-actions'
import Api from '@Service/api';

export const initUserInfo = createAction(types.INIT_USER_INFO)
export const setModalVisibleStatus = createAction(types.SET_MODAL_VISIBLE_STATUS)
export const setToken = createAction(types.SET_TOKEN)

export function fetchUserInfo() {
  return (dispatch) => {
    req.get('/user_login.json').then(res => {
      const data = res.data
      dispatch(initUserInfo(data.user))
    })
  }
}

/**
 * 获取token
 */
export function fetchUserToken(username, password) {
  return (dispatch) => {
    console.log('OUTPUT: fetchUserToken -> dispatch');
    req.get(`${Api.imToken}`, { query: { username, password } })
      .then(res => {
        const { token } = JSON.parse(res);
        dispatch(setToken(token))
      })
  }
}
