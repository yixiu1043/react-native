import React, { PureComponent } from 'react';
import {
  Text, View, TextInput, StyleSheet, TouchableOpacity,
} from 'react-native';
import config from '@Config';
import Storage from '@service/storage';
import styles from '@Styles';

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    height: 30,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 10,
    paddingLeft: 10,
  },
  button: {
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    backgroundColor: config.mainColor,
    color: config.viewsBackgroundColor,
    marginTop: 30,
    borderColor: config.mainColor,
    borderWidth: 1,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    fontSize: 25,
  },
});

export default class login extends PureComponent {
  static navigationOptions = {
    header: null,
  }

  state = {
    username: '',
    password: '',
  };

  onChangeText = (name, text) => {
    this.setState({ [name]: text });
  }

  onPress = () => {
    const { username, password } = this.state;
    const { navigation } = this.props;
    fetch(`http://localhost:5050/user/token?userId=${username}&name=${password}`)
      .then(res => res.text())
      .then((res) => {
        const { token } = JSON.parse(res);
        Storage.set('token', token);
        navigation.navigate('Home');
      });
  }

  render() {
    return (
      <View style={viewStyles.container}>
        <View style={viewStyles.title}>
          <Text>LOGIN</Text>
        </View>
        <TextInput
          style={viewStyles.input}
          placeholder="用户名"
          onChangeText={text => this.onChangeText('username', text)}
        />
        <TextInput
          style={viewStyles.input}
          placeholder="密码"
          onChangeText={text => this.onChangeText('password', text)}
        />
        <TouchableOpacity
          style={viewStyles.button}
          onPress={this.onPress}
        >
          <Text>立即登陆</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
