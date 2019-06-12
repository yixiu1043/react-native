import React from 'react';
import connect from 'redux-connect-decorator';
import config from '@Config';
import styles from '@Styles';
import { fetchChatroomList } from '@Store/Actions';
import ChatService from '@Service/chat';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
  },
  chatRoomWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 10,
  },
  chatRoomItem: {
    width: '33.33333%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  chatRoomImg: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
});

@connect(
  state => ({
    chatList: state.home.chatList,
  }),
  {
    getchChatroomList: fetchChatroomList,
  },
)
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    ...config.defaultNavigation,
    title: '主页',
  })

  componentDidMount() {
    const { getchChatroomList } = this.props;
    getchChatroomList();
  }

  goChatRoom = (id) => {
    const { navigation } = this.props;
    const chatRoomId = String(id);
    navigation.navigate('Chatroom', { chatRoomId });
    ChatService.joinChatRoom(chatRoomId);
  }

  render() {
    const { chatList } = this.props;
    return (
      <View style={viewStyles.container}>
        <View style={viewStyles.chatRoomWrapper}>
          {
            chatList.map(item => (
              <View
                key={item.id}
                style={viewStyles.chatRoomItem}
              >
                <TouchableHighlight
                  onPress={() => this.goChatRoom(item.id)}
                >
                  <Image source={{ uri: item.thumbnailUrl }} style={viewStyles.chatRoomImg} />
                </TouchableHighlight>
                <Text>{item.title.substring(0, 5)}</Text>
              </View>
            ))
          }
        </View>
      </View>
    );
  }
}

export default HomeScreen;
