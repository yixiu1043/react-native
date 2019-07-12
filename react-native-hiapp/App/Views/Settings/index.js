import React from 'react';
import connect from 'redux-connect-decorator';
import config from '@Config';
import styles from '@Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserService from '@Service/user';
import { ListItem, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

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
    backgroundColor: config.mainColor,
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
        icon: 'info-circle',
        color: '#fc3',
        onPress: () => {
          const { navigation } = this.props;
          navigation.navigate('About');
        },
      },
    ],
  }

  componentDidMount() { }

  goLogin = () => {
    const { navigation } = this.props;
    navigation.navigate('Login');
  }

  logout = () => {
    const { navigation } = this.props;
    UserService.logout()
      .then(() => {
        navigation.navigate('Login');
      });
  }

  render() {
    const { menuList } = this.state;
    const {
      navigation, isLogin, user,
    } = this.props;
    return (
      <View style={viewStyles.container}>
        <ListItem
          topDivider
          bottomDivider
          leftAvatar={{
            size: 65,
            source: { uri: user.avatar },
          }}
          rightIcon={<Icon name="angle-right" size={20} />}
          title={user.userId}
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
                topDivider
                bottomDivider
                title={item.title}
                onPress={item.onPress}
                leftIcon={<Icon name={item.icon} color={item.color} size={20} />}
                rightIcon={<Icon name="angle-right" size={20} />}
              />
            </View>
          ))
        }
        <Button
          buttonStyle={[viewStyles.button, { display: isLogin ? 'none' : 'flex' }]}
          title="立即登陆"
          onPress={this.goLogin}
        />
        <Button
          buttonStyle={[viewStyles.button, { display: isLogin ? 'flex' : 'none' }]}
          title="退出登陆"
          onPress={this.logout}
        />
      </View>
    );
  }
}

export default SettingsScreen;
