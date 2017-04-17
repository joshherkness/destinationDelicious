// __tests__/NearMe-test.js
import 'rxjs';
import 'react-native';
import React from 'react';
import NearMe from '../components/NearMe';
import * as firebase from 'firebase';
import renderer from 'react-test-renderer';

 test('renders correctly', () => {
   const tree = renderer.create(
     <NearMe />
   ).toJSON();
   expect(tree).toMatchSnapshot();
 });
