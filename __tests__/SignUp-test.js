// __tests__/SignUp-test.js
import 'rxjs';
import 'react-native';
import React from 'react';
import SignUp from '../components/SignUp';
import * as firebase from 'firebase';

 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';

 test('renders correctly', () => {
   const tree = renderer.create(
     <SignUp verifyAuthState={false} />
   ).toJSON();
   expect(tree).toMatchSnapshot();
 });
