import React, { PureComponent } from 'react';
import connect from 'redux-connect-decorator';
import config from '@Config';
import Storage from '@Utils/storage';
import styles from '@Styles';
import ChatService from '@Service/chat';
import { fetchUserToken } from '@Store/Actions';
import Toast from '@Components/Toast';
import { Input, Button, Text } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    backgroundColor: config.mainColor,
  },
});

@connect(
  state => ({
    token: state.app.token,
  }),
  {
    getUserToken: fetchUserToken,
  },
)
class login extends PureComponent {
  static navigationOptions = {
    header: null,
  }

  state = {
    username: '',
    password: '',
    loading: false,
  };

  onChangeText = (name, text) => {
    this.setState({ [name]: text });
  }

  login = () => {
    const { username, password } = this.state;
    const { navigation, getUserToken } = this.props;
    if (!username || !password) {
      Toast.info('用户名密码不能为空哦!');
      return false;
    }
    this.setState({ loading: true });
    return getUserToken(username, password)
      .then((token) => {
        this.setState({ loading: false });
        Storage.save('token', token);
        Storage.save('userId', username);
        ChatService.start(token);
        navigation.navigate('Home');
      });
  }

  render() {
    const { loading } = this.state;
    return (
      <View style={viewStyles.container}>
        <Text h3 style={viewStyles.title}>LOGIN</Text>
        <Input
          placeholder="用户名"
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          errorStyle={{ color: 'red' }}
          // errorMessage="ENTER A VALID ERROR HERE"
          onChangeText={text => this.onChangeText('username', text)}
        />
        <Input
          placeholder="密码"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          errorStyle={{ color: 'red' }}
          // errorMessage="ENTER A VALID ERROR HERE"
          onChangeText={text => this.onChangeText('password', text)}
        />
        <Button
          buttonStyle={viewStyles.button}
          title="立即登陆"
          loading={loading}
          onPress={this.login}
        />
      </View>
    );
  }
}

export default login;
