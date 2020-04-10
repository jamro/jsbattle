import React from 'react';
import {shallow} from 'enzyme';
import ProfileButton from '../ProfileButton.js';

test('ProfileButton renders properly', () => {
  const wrapper = shallow(<ProfileButton />);
  expect(wrapper.find('.dropdown')).toHaveLength(1)
});

test('display user name', () => {
  const wrapper = shallow(<ProfileButton username="user98324"/>);
  expect(wrapper.text()).toMatch(/user98324/)
});

test('display admin role', () => {
  const wrapper = shallow(<ProfileButton role="admin"/>);
  expect(wrapper.find("a[href='/admin']")).toHaveLength(1)
});

test('display guest role', () => {
  const wrapper = shallow(<ProfileButton role="guest"/>);
  expect(wrapper.text()).toMatch('Sign in')
});

test('pass logout url', () => {
  const wrapper = shallow(<ProfileButton logoutUrl="/logout889234"/>);
  expect(wrapper.find("a[href='/logout889234']")).toHaveLength(1)
});
