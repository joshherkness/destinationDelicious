import { TabNavigator, StackNavigator } from 'react-navigation';

import Favorites from '../components/Favorites';
import NearMe from '../components/NearMe';
import Home from '../components/Home';
import CreateReport from '../components/CreateReport';

export const HomeTabs = TabNavigator({
  Favorites: {
    screen: Favorites
  },
  NearMe: {
    screen: NearMe,
  },
}, {
  tabBarOptions: {
    activeTintColor: '#000',
  },
});

export const Root = StackNavigator({
  Home: {
    screen: Home
  },
  CreateReport: {
    screen: CreateReport
  }
});
