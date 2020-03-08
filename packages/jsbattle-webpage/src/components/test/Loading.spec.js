import React from 'react';
import {shallow} from 'enzyme';
import Loading from '../Loading.js';

test('Loading renders properly with default settings', () => {
  const loading = shallow(<Loading />);
  expect(loading.text()).toMatch(/Loading/);
});

test('Loading renders properly with custom label', () => {
  const loading = shallow(<Loading label="custom wait"/>);
  expect(loading.text()).toMatch(/custom wait/);
});
