import React from 'react';
import {shallow} from 'enzyme';
import FullRow from '../FullRow.js';

test('FullRow renders properly', () => {
  const wrapper = shallow(<FullRow />);
  expect(wrapper.render().get(0)).toHaveProperty('name', 'div');
});

test('FullRow supports custom style', () => {
  const wrapper = shallow(<FullRow style={{border: '3px solid red'}}/>);
  expect(wrapper.render().get(0).attribs.style).toMatch(/border:\w*3px solid red/);
});

test('FullRow contain children', () => {
  const wrapper = shallow(<FullRow><hr /></FullRow>);
  expect(wrapper.render().get(0).children[0].children[0]).toHaveProperty('name', 'hr');
});
