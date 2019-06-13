import React from 'react';
// import configStore from '@Store';
import Store from '@Store';
import Modals from '@Modals';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import AppContainer from './Navigator';

// const store = configStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <StatusBar
          barStyle="light-content"
        />
        <AppContainer />
        <Modals />
      </Provider>
    );
  }
}
