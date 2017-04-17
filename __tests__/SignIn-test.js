// __tests__/SignIn-test.js
import 'rxjs';
import 'react-native';
import React from 'react';
import SignIn from '../components/SignIn';

 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';

 test('renders correctly', () => {
   const tree = renderer.create(
     <SignIn verifyAuthState={false} />
   ).toJSON();
   expect(tree).toMatchSnapshot();
 });
