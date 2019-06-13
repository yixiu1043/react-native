import { combineReducers } from 'redux';
import app from './app';
import home from './home';
import contacts from './contacts';
import chat from './chat';

export default combineReducers({
  app,
  home,
  contacts,
  chat,
});
