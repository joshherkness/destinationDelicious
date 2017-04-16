import { TabNavigator, StackNavigator } from 'react-navigation';

import Favorites from '../components/Favorites';
import NearMe from '../components/NearMe';
import CreateReport from '../components/CreateReport';
import AccountView from '../components/AccountView';
import ReportDetail from '../components/ReportDetail';

export const HomeTabs = TabNavigator({
  NearMe: { screen: NearMe },
  Profile: { screen: AccountView },
}, {
  tabBarOptions: {
    activeTintColor: '#55acee'
  }
});

export const Root = StackNavigator({
  Home: { screen: HomeTabs },
  CreateReport: { screen: CreateReport },
  AccountView: { screen: AccountView },
  ReportDetail: { screen: ReportDetail }
});
