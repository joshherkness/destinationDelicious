import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Favorites from '../components/Favorites';
import NearMe from '../components/NearMe';

export const HomeTabs = TabNavigator({
  Favorites: {
    screen: Favorites
  },
  NearMe: {
    screen: NearMe,
  },
});
