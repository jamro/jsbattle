import React from 'react';
import {mount} from 'enzyme';
import {Footer} from '../Footer.js';

test('Footer renders properly', () => {
  const wrapper = mount(<Footer />);
  expect(wrapper.text()).toMatch('1.0.0-TEST')
  expect(wrapper.find("a[href='https://github.com/jamro/jsbattle']")).toHaveLength(1);
});
