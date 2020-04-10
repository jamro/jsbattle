import 'babel-polyfill';
import React from 'react';
import {mount} from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import {ChallengeListScreen} from '../ChallengeListScreen.js';
import Loading from '../../components/Loading.js';

test('ChallengeScreen renders properly', () => {
  const wrapper = mount(<Router><ChallengeListScreen/></Router>);
  expect(wrapper.text()).toMatch(/Challenges/)
});

test('displays Loading message', () => {
  const wrapper = mount(<Router><ChallengeListScreen isLoading={true}/></Router>);
  expect(wrapper.find(Loading)).toHaveLength(1)
});

test('list challenges', () => {
  const list = [
    {id: 'id-97763', level: 1, name: 'level #86529', completed: true, isUnlocked: true},
    {id: 'id-66923', level: 2, name: 'level #77923', completed: false, isUnlocked: true},
    {id: 'id-87033', level: 3, name: 'level #17495', completed: false, isUnlocked: false}
  ];
  const wrapper = mount(<Router><ChallengeListScreen list={list}/></Router>);
  expect(wrapper.find('.list-group-item')).toHaveLength(3);
  expect(wrapper.find('.list-group-item').at(0).text()).toMatch(/Level 1/i);
  expect(wrapper.find('.list-group-item').at(0).text()).toMatch(/level #86529/i);
  expect(wrapper.find('.list-group-item').at(0).text()).toMatch(/Completed/i);
  expect(wrapper.find('.list-group-item').at(0).find('.start-challenge-disabled')).toHaveLength(0)
  expect(wrapper.find('.list-group-item').at(0).find("a[href='/challenge/id-97763']")).toHaveLength(1)
  expect(wrapper.find('.list-group-item').at(1).text()).toMatch(/Level 2/i);
  expect(wrapper.find('.list-group-item').at(1).text()).toMatch(/level #77923/i);
  expect(wrapper.find('.list-group-item').at(1).text()).not.toMatch(/Completed/i);
  expect(wrapper.find('.list-group-item').at(1).find('.start-challenge-disabled')).toHaveLength(0)
  expect(wrapper.find('.list-group-item').at(1).find("a[href='/challenge/id-66923']")).toHaveLength(1)
  expect(wrapper.find('.list-group-item').at(2).text()).toMatch(/Level 3/i);
  expect(wrapper.find('.list-group-item').at(2).text()).toMatch(/level #17495/i);
  expect(wrapper.find('.list-group-item').at(2).text()).not.toMatch(/Completed/i);
  expect(wrapper.find('.list-group-item').at(2).find('.start-challenge-disabled')).toHaveLength(1)
  expect(wrapper.find('.list-group-item').at(2).find("a[href='/challenge/id-87033']")).toHaveLength(0)
});
