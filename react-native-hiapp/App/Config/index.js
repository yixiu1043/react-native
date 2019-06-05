const Skin = {
  mainColor: '#ff9800',
  viewsBackgroundColor: '#eef0f3',
};

const App = {
  imUrl: 'http://localhost:5050',
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
