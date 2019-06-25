import React from 'react';
import config from '@Config';
import connect from 'redux-connect-decorator';
import ChatService from '@Service/chat';
import Storage from '@Utils/storage';
import { getRemoteAvatar } from '@Utils';
import { Button } from 'react-native-elements';
import { setChatList } from '@Store/Actions';
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import {
  SafeAreaView,
} from 'react-native';

@connect(
  state => ({
    chatList: state.chat.chatList,
  }),
  { resetChatList: setChatList },
)
class Chatroom extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    ...config.defaultNavigation,
    title: '聊天室',
  })

  state = {
    text: '',
    userInfo: {},
  };

  componentDidMount() {
    const { resetChatList } = this.props;
    const { navigation } = this.props;
    const { params } = navigation.state;
    resetChatList([]);
    Storage.get('userId').then((userId) => {
      const userInfo = {
        _id: userId,
        name: userId,
        avatar: getRemoteAvatar(userId),
      };
      this.setState({ userInfo });
    });
    ChatService.joinChatRoom(params.chatRoomId);
  }

  onSend = () => {
    const { navigation } = this.props;
    const { params } = navigation.state;
    const { text } = this.state;
    if (!text) {
      return;
    }
    ChatService.sendMessage(
      params.chatRoomId,
      { content: text },
      () => {
        this.setState({ text: '' });
      },
    );
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }));
  }

  onChangeText = (text) => {
    this.setState({ text });
  }

  renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#f0f0f0',
        },
      }}
    />
  )

  renderSystemMessage = props => (
    <SystemMessage
      {...props}
      containerStyle={{
        marginBottom: 15,
      }}
      textStyle={{
        fontSize: 14,
      }}
    />
  )

  renderSend = props => (
    <Send
      {...props}
    >
      <Button
        onPress={props.onSend}
        type="clear"
        title="发送"
      />
    </Send>
  )

  render() {
    const { chatList } = this.props;
    const { text, userInfo } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <GiftedChat
          text={text}
          onInputTextChanged={value => this.onChangeText(value)}
          messages={chatList}
          onSend={this.onSend}
          user={userInfo}
          alwaysShowSend
          showUserAvatar
          showAvatarForEveryMessage
          renderSend={this.renderSend}
          renderBubble={this.renderBubble}
        // renderSystemMessage={this.renderSystemMessage}
        />
      </SafeAreaView>
    );
  }
}

export default Chatroom;
