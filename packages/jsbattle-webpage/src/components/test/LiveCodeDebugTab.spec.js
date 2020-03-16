import React from 'react';
import {mount} from 'enzyme';
import LiveCodeDebugTab from '../LiveCodeDebugTab.js';
import JsonCode from '../JsonCode.js';

test('LiveCodeDebugTab renders properly', () => {
  const wrapper = mount(<LiveCodeDebugTab />);
  expect(wrapper.find(JsonCode).length).toBeGreaterThanOrEqual(1)
});
