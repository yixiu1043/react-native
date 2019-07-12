import React from 'react';
import connect from 'redux-connect-decorator';
import config from '@Config';
import styles from '@Styles';
import Api from '@Service/api';
import CAT_IMG from '@assets/cat.jpg';
import DOG_IMG from '@assets/dog.jpg';
import PANDA_IMG from '@assets/panda.png';
import TIBETAN_ANTELOPE_IMG from '@assets/tibetan-antelope.jpg';
import TURTLE_IMG from '@assets/turtle.jpg';
import WHALE_SHARK_IMG from '@assets/whale-shark.jpg';
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
    // chatRoomList: state.home.chatRoomList,
  }),
)
class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    ...config.defaultNavigation,
    title: '主页',
  })

  state = {
    chatRoomList: [
      { id: 'cat', title: 'cat', url: CAT_IMG },
      { id: 'dog', title: 'dog', url: DOG_IMG },
      { id: 'panda', title: 'panda', url: PANDA_IMG },
      { id: 'tibetan-antelope', title: 'tibetan-antelope', url: TIBETAN_ANTELOPE_IMG },
      { id: 'turtle', title: 'turtle', url: TURTLE_IMG },
      { id: 'whale-shark', title: 'whale-shark', url: WHALE_SHARK_IMG },
    ],
  }

  componentDidMount() {
    Api.fetchChatRoomList();
  }

  goChatRoom = (id) => {
    const { navigation } = this.props;
    const chatRoomId = String(id);
    navigation.navigate('Chatroom', { chatRoomId });
  }

  render() {
    // const { chatRoomList } = this.props;
    const { chatRoomList } = this.state;
    return (
      <View style={viewStyles.container}>
        <View style={viewStyles.chatRoomWrapper}>
          {
            chatRoomList.map(item => (
              <View
                key={item.id}
                style={viewStyles.chatRoomItem}
              >
                <TouchableHighlight
                  onPress={() => this.goChatRoom(item.id)}
                >
                  <Image source={item.url} style={viewStyles.chatRoomImg} />
                </TouchableHighlight>
                <Text>{item.title}</Text>
              </View>
            ))
          }
        </View>
      </View>
    );
  }
}

export default HomeScreen;
