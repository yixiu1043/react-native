import React from 'react';
import connect from 'redux-connect-decorator';
import config from '@Config';
import styles from '@Styles';
import Icon from '@Components/Icon';
import {
  View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import req from '@Network';

@connect(state => ({
  user: state.app.user,
}))

class SettingsScreen extends React.Component {
  static navigationOptions = _ => ({
    ...config.defaultNavigation,
    title: '个人中心',
  })

  constructor() {
    super();
    this.menuList = [
      {
        title: '关于我们',
        icon: 'about1',
        color: '#fc3',
        onPress() {
          this.props.navigation.navigate('About');
        },
      },
    ];
  }

  goLogin = () => {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={viewStyles.container}>
        <ListItem
          chevron
          topDivider
          bottomDivider
          leftAvatar={{
            size: 65,
            source: {
              uri: this.props.user.avatar_url,
            },
          }}
          title={this.props.user.nick_name}
          titleStyle={{ fontSize: 23 }}
          subtitle={`当前位置: ${this.props.user.location}`}
          subtitleStyle={{ fontSize: 16, color: '#858585' }}
          onPress={(_) => { this.props.navigation.navigate('Profile'); }}
        />
        {
          this.menuList.map((item, i) => (
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
          style={viewStyles.button}
          onPress={this.goLogin}
        >
          <Text>登陆</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
export default SettingsScreen;
