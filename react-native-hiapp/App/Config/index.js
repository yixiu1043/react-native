const Skin = {
  mainColor: '#ff9800',
  viewsBackgroundColor: '#eef0f3',
};

const App = {
  APPKEY: 'kj7swf8ok3m02',
  imUrl: 'https://wxchat2.mt204.com',
  domain: 'https://jsonplaceholder.typicode.com',
  // devBaseUrl: 'https://raw.githubusercontent.com/BelinChung/api-mock/master/HiApp',
  // prodBaseUrl: 'https://raw.githubusercontent.com/BelinChung/api-mock/master/HiApp',
  defaultNavigation: {
    headerStyle: {
      backgroundColor: Skin.mainColor,
    },
    headerTintColor: '#fff',
  },
};

export default {
  ...App,
  ...Skin,
};
