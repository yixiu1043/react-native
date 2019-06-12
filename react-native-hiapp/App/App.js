import React from 'react';
// import Config from '@Config';
import configStore from '@Store';
import styles from '@Styles';
import Modals from '@Modals';
import { Provider } from 'react-redux';
import {
  StyleSheet,
  StatusBar,
} from 'react-native';

import AppContainer from './Navigator';

const store = configStore();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar
          barStyle="light-content"
        />
        <AppContainer />
        <Modals />
      </Provider>
    );
  }
}
