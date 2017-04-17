// __tests__/Home-test.js
import 'rxjs';
import 'react-native';
import React from 'react';
import Home from '../components/Home';
import * as firebase from 'firebase';

 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';

 test('renders correctly', () => {
   const tree = renderer.create(
     <Home />
   ).toJSON();
   expect(tree).toMatchSnapshot();
 });
