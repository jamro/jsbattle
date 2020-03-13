import React from 'react';
import {shallow} from 'enzyme';
import Row from '../Row.js';

test('Row renders properly', () => {
  const wrapper = shallow(<Row />);
  expect(wrapper.render().get(0)).toHaveProperty('name', 'div');
});

test('Row supports custom style', () => {
  const wrapper = shallow(<Row style={{border: '3px solid red'}}/>);
  expect(wrapper.render().get(0).attribs.style).toMatch(/border:\w*3px solid red/);
});

test('Row contain children', () => {
  const wrapper = shallow(<Row><hr /></Row>);
  expect(wrapper.render().get(0).children[0]).toHaveProperty('name', 'hr');
});
