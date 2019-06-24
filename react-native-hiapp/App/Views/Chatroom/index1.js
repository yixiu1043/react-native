import React, { Component } from 'react';
import config from '@Config';
import styles from '@Styles';
import ChatService from '@Service/chat';
import {
  Text, View, StyleSheet, Image,
} from 'react-native';
import { Input, Button } from 'react-native-elements';

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
    position: 'relative',
    padding: 10,
  },
  msgContainer: {
  },
  msgContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#666',
  },
  msgInfo: {
    marginLeft: 10,
  },
  text: {
    width: 100,
    height: 30,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    position: 'relative',
  },
  triangle: {
    position: 'absolute',
    left: -10,
    top: 5,
    borderWidth: 5,
    borderRightColor: '#fff',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  bottom: {
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: '#aaa',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
  },
  button: {
    width: 80,
  },
});

class Chatroom extends Component {
  static navigationOptions = () => ({
    ...config.defaultNavigation,
    title: '聊天室',
  })

  state = {
    text: '',
  }

  onChangeText = (text) => {
    this.setState({ text });
  }

  sendMessage = () => {
    const { navigation } = this.props;
    const { params } = navigation.state;
    const { text } = this.state;
    ChatService.sendMessage(params.chatRoomId, { content: text });
  }

  render() {
    return (
      <View style={viewStyles.container}>
        <View style={viewStyles.msgContainer}>
          <View style={viewStyles.msgContent}>
            <View>
              <Image style={viewStyles.avatar} source={require('../../assets/cat.jpg')} />
            </View>
            <View style={viewStyles.msgInfo}>
              <View style={viewStyles.time}>
                <Text>2019.5.18 20:00</Text>
              </View>
              <View style={viewStyles.text}>
                <View style={viewStyles.triangle} />
                <Text>hello</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={viewStyles.bottom}>
          <Input
            containerStyle={viewStyles.input}
            placeholder="请输入"
            onChangeText={text => this.onChangeText(text)}
          />
          <Button
            buttonStyle={viewStyles.button}
            type="clear"
            title="发送"
            onPress={this.sendMessage}
          />
        </View>
      </View>
    );
  }
}

export default Chatroom;
