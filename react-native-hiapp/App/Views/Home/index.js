import React from 'react';
import connect from 'redux-connect-decorator';
import config from '@Config';
import styles from '@Styles';
import t from '@Localize';
import { fetchChatroomList } from '@Store/Actions';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import ChatService from '@Service/chat';

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
  state => {
    return {
      chatList: state.home.chatList
    }
  },
  {
    fetchChatroomList,
  }
)

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      ...config.defaultNavigation,
      title: t('global.home'),
    };
  }

  componentDidMount() {
    const { fetchChatroomList } = this.props;
    fetchChatroomList();
  }

  goChatRoom = (id) => {
    const { navigation } = this.props;
    navigation.navigate('Chatroom');
    // ChatService.joinChatRoom(id);
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
