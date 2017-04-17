// __tests__/AccountView-test.js
import 'rxjs';
import 'react-native';
import React from 'react';
import AccountView from '../components/AccountView';

 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';

 test('renders correctly', () => {
   const tree = renderer.create(
     <AccountView />
   ).toJSON();
   expect(tree).toMatchSnapshot();
 });
