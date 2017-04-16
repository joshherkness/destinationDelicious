// __tests__/ReportRow-test.js
import 'rxjs';
import 'react-native';
import React from 'react';
import ReportRow from '../components/ReportRow';

 // Note: test renderer must be required after react-native.
 import renderer from 'react-test-renderer';

 test('renders correctly', () => {
   const tree = renderer.create(
     <ReportRow />
   ).toJSON();
   expect(tree).toMatchSnapshot();
 });
