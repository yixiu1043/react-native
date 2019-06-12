import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import LoadingView from './loading';

class Loading {
  constructor() {
    this.sibling = null;
  }

  static show() {
    this.sibling = new RootSiblings(<LoadingView />);
  }

  static hidden() {
    this.sibling.destroy();
  }
}

export default Loading;
