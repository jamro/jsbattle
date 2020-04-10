import 'babel-polyfill';
import React from 'react';
import {shallow} from 'enzyme';
import {ScriptListScreen} from '../ScriptListScreen.js';
import ScriptTableRow from '../../components/ScriptTableRow.js';
import Loading from '../../components/Loading.js';

test('ScriptListScreen renders properly', () => {
  const tankList = [
    { id: 'tank932', scriptName: 'orange0984'},
    { id: 'tank883', scriptName: 'pink884323'},
    { id: 'tank521', scriptName: 'blue887431'}
  ];
  const wrapper = shallow(<ScriptListScreen
    tankList={tankList}
  />);

  expect(wrapper.find(ScriptTableRow)).toHaveLength(3);
  expect(wrapper.find(ScriptTableRow).at(0).props()).toHaveProperty('id', 'tank932');
  expect(wrapper.find(ScriptTableRow).at(0).props()).toHaveProperty('name', 'orange0984');
  expect(wrapper.find(ScriptTableRow).at(0).props()).toHaveProperty('link', '/sandbox/tank932');

  expect(wrapper.find(ScriptTableRow).at(1).props()).toHaveProperty('id', 'tank883');
  expect(wrapper.find(ScriptTableRow).at(1).props()).toHaveProperty('name', 'pink884323');
  expect(wrapper.find(ScriptTableRow).at(1).props()).toHaveProperty('link', '/sandbox/tank883');

  expect(wrapper.find(ScriptTableRow).at(2).props()).toHaveProperty('id', 'tank521');
  expect(wrapper.find(ScriptTableRow).at(2).props()).toHaveProperty('name', 'blue887431');
  expect(wrapper.find(ScriptTableRow).at(2).props()).toHaveProperty('link', '/sandbox/tank521');
});

test('Display loading info', () => {
  const wrapperLoading = shallow(<ScriptListScreen
    isLoading={true}
  />);
  expect(wrapperLoading.find(Loading)).toHaveLength(1);

  const wrapperCreating = shallow(<ScriptListScreen
    isCreating={true}
  />);
  expect(wrapperCreating.find(Loading)).toHaveLength(1);

  const wrapperDeleting = shallow(<ScriptListScreen
    isDeleting={true}
  />);
  expect(wrapperDeleting.find(Loading)).toHaveLength(1);

});

test('delete script', () => {
  const tankList = [
    { id: 'tank932', scriptName: 'orange0984'},
    { id: 'tank883', scriptName: 'pink884323'},
    { id: 'tank521', scriptName: 'blue887431'}
  ];
  const deleteAiScript = jest.fn();
  const wrapper = shallow(<ScriptListScreen
    tankList={tankList}
    deleteAiScript={deleteAiScript}
  />);

  wrapper.find(ScriptTableRow).at(1).props().onDelete();
  expect(deleteAiScript.mock.calls).toHaveLength(1);
  expect(deleteAiScript.mock.calls[0][0]).toBe('tank883');
});
