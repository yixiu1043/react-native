import { NavigationActions } from 'react-navigation';
// import Storage from '@Utils/storage';
import Store from '@Store';

const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
};

// export const reset = (navigation, routeName) => {
//   const resetAction = NavigationActions.reset({
//     index: 0,
//     actions: [NavigationActions.navigate({ routeName })],
//   });
//   navigation.dispatch(resetAction);
// };

export const auth = (from, to, navigator) => {
  const currentScreen = getActiveRouteName(to);
  const prevScreen = getActiveRouteName(from);

  if (prevScreen !== currentScreen) {
    const { app } = Store.getState();
    if (!app.token) {
      navigator.dispatch(
        NavigationActions.navigate({ routeName: 'Login' }),
      );
    }
  }
};
