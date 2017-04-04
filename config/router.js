import { TabNavigator, StackNavigator } from 'react-navigation';

import Favorites from '../components/Favorites';
import NearMe from '../components/NearMe';
import Home from '../components/Home';
import CreateReport from '../components/CreateReport';

export const HomeTabs = TabNavigator({
  NearMe: { screen: NearMe },
  Favorites: { screen: Favorites }
}, {
  tabBarOptions: {
    activeTintColor: '#55acee'
  }
});

export const Root = StackNavigator({
  Home: { screen: Home },
  CreateReport: { screen: CreateReport }
});
