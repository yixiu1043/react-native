import React from 'react';
import Store from '@Store';
import Modals from '@Modals';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { auth } from '@Middleware/auth';
import AppContainer from './Navigator';

export default class App extends React.Component {
  navigator = React.createRef();

  render() {
    return (
      <Provider store={Store}>
        <StatusBar
          barStyle="light-content"
        />
        <AppContainer
          ref={(nav) => { this.navigator = nav; }}
          onNavigationStateChange={(prevState, currentState, action) => {
            auth(prevState, currentState, this.navigator);
          }}
        />
        <Modals />
      </Provider>
    );
  }
}
