import 'babel-polyfill';
import React from 'react';
import {mount} from 'enzyme';
import {SignInScreen} from '../SignInScreen.js';
import Loading from '../../components/Loading.js';

test('show no auth methods', () => {
  const wrapper = mount(<SignInScreen />);
  expect(wrapper.text()).toMatch(/sign in/);
  expect(wrapper.text()).toMatch(/No authorization method/);
  expect(wrapper.find(Loading)).toHaveLength(0);
});

test('show loading', () => {
  const wrapper = mount(<SignInScreen isLoading={true}/>);
  expect(wrapper.find(Loading)).toHaveLength(1);
});

test('show github auth method', () => {
  const authMethods = {
    github: {name: 'GitHub-6523', url: 'http://example.com/github'}
  };
  const wrapper = mount(<SignInScreen
    authMethods={authMethods}
  />);

  expect(wrapper.find('.github-auth-button').props()).toHaveProperty('href', 'http://example.com/github')
  expect(wrapper.find('.github-auth-button')).toHaveLength(1);
  expect(wrapper.find('.github-auth-button').text()).toMatch(/GitHub-6523/);
  expect(wrapper.find('.github-auth-button').find('.fa-github')).toHaveLength(1);
});

test('show facebook auth method', () => {
  const authMethods = {
    facebook: {name: 'Facebook-82345', url: 'http://example.com/facebook'}
  };
  const wrapper = mount(<SignInScreen
    authMethods={authMethods}
  />);

  expect(wrapper.find('.facebook-auth-button').props()).toHaveProperty('href', 'http://example.com/facebook')
  expect(wrapper.find('.facebook-auth-button')).toHaveLength(1);
  expect(wrapper.find('.facebook-auth-button').text()).toMatch(/Facebook-82345/);
  expect(wrapper.find('.facebook-auth-button').find('.fa-facebook')).toHaveLength(1);
});

test('show google auth method', () => {
  const authMethods = {
    google: {name: 'Google-5432', url: 'http://example.com/google'}
  };
  const wrapper = mount(<SignInScreen
    authMethods={authMethods}
  />);

  expect(wrapper.find('.google-auth-button').props()).toHaveProperty('href', 'http://example.com/google')
  expect(wrapper.find('.google-auth-button')).toHaveLength(1);
  expect(wrapper.find('.google-auth-button').text()).toMatch(/Google-5432/);
  expect(wrapper.find('.google-auth-button').find('.fa-google')).toHaveLength(1);
});
