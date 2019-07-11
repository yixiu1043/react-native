const Skin = {
  mainColor: '#E14844',
  viewsBackgroundColor: '#eef0f3',
};

const App = {
  // APPKEY: 'kj7swf8ok3m02',
  // imUrl: 'http://192.168.88.155:5050',
  APPKEY: 'k51hidwqk4xab',
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
