import React from 'react';
import {shallow} from 'enzyme';
import Col from '../Col.js';

test('Col renders properly', () => {
  const wrapper = shallow(<Col />);
  expect(wrapper.render().get(0)).toHaveProperty('name', 'div');
});

test('Col have breakpoints', () => {
  const wrapper = shallow(<Col xs={1} sm={2} md={3} lg={4}/>);
  expect(wrapper.render().hasClass('col-xs-1')).toBe(true);
  expect(wrapper.render().hasClass('col-sm-2')).toBe(true);
  expect(wrapper.render().hasClass('col-md-3')).toBe(true);
  expect(wrapper.render().hasClass('col-lg-4')).toBe(true);
});

test('Col supports custom classNames', () => {
  const wrapper = shallow(<Col xs={1} className='superStylish'/>);
  expect(wrapper.render().hasClass('superStylish')).toBe(true);
});

test('Col supports custom style', () => {
  const wrapper = shallow(<Col xs={1} style={{border: '3px solid red'}}/>);
  expect(wrapper.render().get(0).attribs.style).toMatch(/border:\w*3px solid red/);
});

test('Col contain children', () => {
  const wrapper = shallow(<Col><hr /></Col>);
  expect(wrapper.render().get(0).children[0]).toHaveProperty('name', 'hr');
});
