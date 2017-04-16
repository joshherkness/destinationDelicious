// __tests__/CreateReport-test.js
import 'rxjs';
import 'react-native';
import React from 'react';
import CreateReport from '../components/CreateReport';
import * as firebase from 'firebase';

 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';

 test('renders correctly', () => {
   const tree = renderer.create(
     <CreateReport />
   ).toJSON();
   expect(tree).toMatchSnapshot();
 });
