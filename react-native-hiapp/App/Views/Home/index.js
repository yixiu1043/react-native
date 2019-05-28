import React from 'react';
import connect from 'redux-connect-decorator';
import config from '@Config';
import styles from '@Styles';
import t from '@Localize';
import HeaderButton from '@Components/HeaderButton';
import { fetchUserInfo, setModalVisibleStatus } from '@Store/Actions';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import ChatService from '@service/chat';

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

@connect(state => ({
  //
}), {
  setModalVisibleStatus,
  fetchUserInfo,
})

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const onPressRightButtonFunc = params.openPublisher || function () {};
    return {
      ...config.defaultNavigation,
      title: t('global.home'),
      headerRight: (
        <HeaderButton
          isIcon
          text="feedback"
          onPressButton={onPressRightButtonFunc}
        />
      ),
    };
  }

  state = {
    chatList: [],
  }

  componentWillMount() {
    const { navigation } = this.props;
    navigation.setParams({ openPublisher: () => this.openPublisher() });
  }

  componentDidMount() {
    const { fetchUserInfo } = this.props;
    fetchUserInfo();
    this.getChatRoomList();
  }

  getChatRoomList = () => {
    fetch('http://jsonplaceholder.typicode.com/photos?_limit=9')
      .then(res => res.json())
      .then(json => this.setState({ chatList: json }));
  }

  goChatRoom = (id) => {
    const { navigation } = this.props;
    navigation.navigate('Chatroom');
    ChatService.joinChatRoom(id);
  }

  openPublisher() {
    const { setModalVisibleStatus } = this.props;
    setModalVisibleStatus({
      name: 'publisher',
      status: true,
    });
  }


  render() {
    const { chatList } = this.state;
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
