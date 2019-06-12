import React from 'react';
import config from '@Config';
import { Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import Icon from '@Components/Icon';
import HomeScreen from '@Views/Home';
import ContactsScreen from '@Views/Contacts';
import SettingsScreen from '@Views/Settings';
import AboutScreen from '@Views/About';
import ProfileScreen from '@Views/Profile';
import LanguageScreen from '@Views/Language';
import FeedbackScreen from '@Views/Feedback';
import MessageScreen from '@Views/Message';
import LoginScreen from '@Views/User/login';
import RegisterScreen from '@Views/User/register';
import ChatroomScreen from '@Views/Chatroom';

const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
});
const ContactsStack = createStackNavigator({
  Contacts: { screen: ContactsScreen },
});
const SettingsStack = createStackNavigator({
  Settings: { screen: SettingsScreen },
});

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Contacts: { screen: ContactsStack },
    Settings: { screen: SettingsStack },
  },
  {
    navigationOptions: () => ({
      header: null,
    }),
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        const style = { color: tintColor, fontSize: 12, textAlign: 'center' };
        switch (routeName) {
          case 'Home':
            return <Text style={style}>主页</Text>;
          case 'Contacts':
            return <Text style={style}>联系人</Text>;
          case 'Settings':
            return <Text style={style}>个人中心</Text>;
          default:
            break;
        }
        return null;
      },
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = `ios7home${focused ? '' : 'outline'}`;
            break;
          case 'Contacts':
            iconName = `ios7chatbubble${focused ? '' : 'outline'}`;
            break;
          case 'Settings':
            iconName = `ios7gear${focused ? '' : 'outline'}`;
            break;
          default:
            break;
        }
        return <Icon name={iconName} size={26} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: config.mainColor,
      inactiveTintColor: 'gray',
    },
  },
);

const AppStack = createStackNavigator({
  Tabs: TabNavigator,
  About: { screen: AboutScreen },
  Profile: { screen: ProfileScreen },
  Language: { screen: LanguageScreen },
  Feedback: { screen: FeedbackScreen },
  Message: { screen: MessageScreen },
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  Chatroom: { screen: ChatroomScreen },
}, {
  defaultNavigationOptions: () => ({
    ...config.defaultNavigation,
  }),
});

export default createAppContainer(AppStack);
