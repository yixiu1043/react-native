import React from 'react';
import connect from 'redux-connect-decorator';
import config from '@Config';
import styles from '@Styles';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

const viewStyles = StyleSheet.create({
  container: {
    ...styles.container,
    paddingTop: 20,
  },
});

@connect(state => ({
  user: state.app.user,
}))
class ProfileScreen extends React.Component {
  static navigationOptions = () => ({
    ...config.defaultNavigation,
    title: '个人信息',
  })

  render() {
    const { user } = this.props;
    return (
      <View style={viewStyles.container}>
        <View>
          <ListItem
            topDivider
            bottomDivider
            title="头像"
            rightAvatar={{
              size: 65,
              source: {
                uri: user.avatar,
              },
            }}
          />
          <ListItem
            bottomDivider
            title="UID"
            rightTitle={user.userId}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <ListItem
            topDivider
            bottomDivider
            title="性别"
            rightTitle="未设置"
          />
          <ListItem
            bottomDivider
            title="位置"
            rightTitle="马尼拉"
          />
        </View>
      </View>
    );
  }
}

export default ProfileScreen;
