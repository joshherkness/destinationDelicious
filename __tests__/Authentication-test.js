// __tests__/Authentication-test.js
import 'rxjs';
import 'react-native';
import React from 'react';
import Authentication from '../components/Authentication';

 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';

 test('renders correctly', () => {
   const tree = renderer.create(
     <Authentication />
   ).toJSON();
   expect(tree).toMatchSnapshot();
 });
