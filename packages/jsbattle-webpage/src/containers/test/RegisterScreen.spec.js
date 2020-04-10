import 'babel-polyfill';
import React from 'react';
import {shallow, mount} from 'enzyme';
import {RegisterScreen} from '../RegisterScreen.js';
import Loading from '../../components/Loading.js';

test('RegisterScreen renders properly', () => {
  const wrapper = shallow(<RegisterScreen />);
  expect(wrapper.render().text()).toMatch(/Create Account/i)
});

test('Submit Form', () => {
  const registerProfile = jest.fn();

  const wrapper = mount(<RegisterScreen
      registerProfile={registerProfile}
    />);
  const displayname = 'JohnDoe883';
  const username = 'john883_223';
  wrapper.find('#displayname').simulate('change', {target: {value: displayname}});
  wrapper.find('#displayname').instance().value = displayname;
  wrapper.find('#username').simulate('change', {target: {value: username}});
  wrapper.find('#username').instance().value = username;
  wrapper.find('.submit-form').simulate('click');

  expect(registerProfile.mock.calls).toHaveLength(1);
  expect(registerProfile.mock.calls[0][0]).toBe(username);
  expect(registerProfile.mock.calls[0][1]).toBe(displayname);
});

test('display loading', () => {
  const wrapper = shallow(
    <RegisterScreen
      isLoading={true}
    />
  );
  expect(wrapper.find(Loading)).toHaveLength(1);
});
