import React from 'react';
import connect from 'redux-connect-decorator';
import config from '@Config';
import styles from '@Styles';
import Icon from '@Components/Icon';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Storage from '@Utils/storage';
import { getRemoteAvatar } from '@Utils';

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
    paddingTop: 20,
  },
  list: {
    marginTop: 15,
  },
  listItem: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  button: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: config.mainColor,
    color: config.viewsBackgroundColor,
    marginTop: 30,
    marginHorizontal: 10,
  },
});

@connect(state => ({
  user: state.app.user,
  isLogin: state.app.isLogin,
}))

class SettingsScreen extends React.Component {
  static navigationOptions = () => ({
    ...config.defaultNavigation,
    title: '个人中心',
  })

  state = {
    menuList: [
      {
        title: '关于我们',
        icon: 'about1',
        color: '#fc3',
        onPress() {
          const { navigation } = this.props;
          // this.props.navigation.navigate('About');
          navigation.navigate('Message');
        },
      },
    ],
    userId: '',
    avatar: '',
  }


  componentDidMount() {
    Storage.get('userId').then((res) => {
      this.setState({ userId: res });
      this.setState({ avatar: getRemoteAvatar(res) });
    });
  }

  goLogin = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  }

  render() {
    const { menuList, userId, avatar } = this.state;
    const { navigation, isLogin } = this.props;
    return (
      <View style={viewStyles.container}>
        <ListItem
          chevron
          topDivider
          bottomDivider
          leftAvatar={{
            size: 65,
            source: { uri: avatar },
          }}
          title={userId}
          titleStyle={{ fontSize: 23 }}
          subtitle="画一个姑娘陪着我"
          subtitleStyle={{ fontSize: 16, color: '#858585' }}
          onPress={() => { navigation.navigate('Profile'); }}
        />
        {
          menuList.map((item, i) => (
            <View style={viewStyles.list} key={i}>
              <ListItem
                containerStyle={viewStyles.listItem}
                chevron
                topDivider
                bottomDivider
                title={item.title}
                onPress={item.onPress.bind(this)}
                leftIcon={<Icon style={{ marginTop: 4 }} name={item.icon} color={item.color} />}
              />
            </View>
          ))
        }
        <TouchableOpacity
          style={[viewStyles.button, { display: isLogin ? 'none' : 'flex' }]}
          onPress={this.goLogin}
        >
          <Text>登陆</Text>
        </TouchableOpacity>
      </View >
    );
  }
}

export default SettingsScreen;
