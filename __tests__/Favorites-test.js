// __tests__/Favorites-test.js
import 'rxjs';
import 'react-native';
import React from 'react';
import Favorites from '../components/Favorites';
import * as firebase from 'firebase';

 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';

 test('renders correctly', () => {
   const tree = renderer.create(
     <Favorites />
   ).toJSON();
   expect(tree).toMatchSnapshot();
 });
