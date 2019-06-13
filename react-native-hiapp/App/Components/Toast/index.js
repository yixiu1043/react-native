import React from 'react';
import RootToast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View, Text, Platform, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 20,
  },
});

class Toast {
  constructor() {
    this.toast = null;
  }

  static info(msg, duration = RootToast.durations.SHORT) {
    this.toast = RootToast.show(msg, {
      position: 0,
      duration,
    });
  }

  static message(type, msg, options) {
    const iconName = {
      success: 'check',
      warning: 'exclamation',
      error: 'times',
    };
    const toast = RootToast.show(
      Platform.OS === 'ios'
        ? (
          <View style={styles.container}>
            <Icon name={iconName[type]} size={50} color="#fff" />
            <Text style={styles.message}>{msg}</Text>
          </View>
        ) : msg, {
        duration: RootToast.durations.SHORT || options.duration,
        position: RootToast.positions.CENTER,
        ...options,
      },
    );
    const timer = setTimeout(() => {
      RootToast.hide(toast);
      if (typeof options === 'function') {
        if (options) {
          options();
        }
      }
      clearTimeout(timer);
    }, RootToast.durations.SHORT || options.duration);
  }

  static success(msg, options) {
    return this.message('success', msg, options);
  }

  static warning(msg, options) {
    return this.message('warning', msg, options);
  }

  static error(msg, options) {
    return this.message('error', msg, options);
  }
}

export default Toast;
