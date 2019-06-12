import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { deviceInfo } from '@Utils';

const styles = StyleSheet.create({
  maskStyle: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: deviceInfo.deviceWidth,
    height: deviceInfo.deviceHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backViewStyle: {
    backgroundColor: '#111',
    width: 120,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

class Loading extends Component {
  render() {
    return (
      <View style={styles.maskStyle}>
        <View style={styles.backViewStyle}>
          <ActivityIndicator size="large" color="white" />
        </View>
      </View>
    );
  }
}

export default Loading;
