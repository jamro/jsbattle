
import React from 'react';
import {mount, unmount} from 'enzyme';
import CodeArea from '../CodeArea.js';

test('Renders properly', () => {
  const codearea = mount(<CodeArea defaultValue="hello world from code" />);
  expect(codearea.text()).toMatch(/hello world from code/);
});

test('Unmount properly', () => {
  const codearea = mount(<CodeArea />);
  codearea.instance().componentWillUnmount();
  codearea.unmount();
});

test('Trigger onChange callback', () => {
  const onChange= jest.fn()
  const codearea = mount(<CodeArea onChange={onChange} />);

  codearea.instance().codeMirror.setValue('My new code #1')

  expect(onChange.mock.calls.length).toBe(1);
  expect(onChange.mock.calls[0][0]).toBe('My new code #1');

  codearea.find('textarea.code-editor').simulate("change", {target: {value: 'My new code #2'}});

  expect(onChange.mock.calls.length).toBe(2);
  expect(onChange.mock.calls[1][0]).toBe('My new code #2');
});

test('Works without onChange callback', () => {
  const codearea = mount(<CodeArea />);

  codearea.instance().codeMirror.setValue('My new code #2')

  expect(codearea.instance().codeMirror.getValue()).toBe('My new code #2');
});

test('Display code hint for JS libs', () => {
  const onChange= jest.fn()
  const codearea = mount(<CodeArea defaultValue="a" onChange={onChange} />);

  codearea.instance().codeMirror.setValue('Mat');
  codearea.instance().codeMirror.setCursor(0, 3);
  let result = CodeMirror.hint.javascript(codearea.instance().codeMirror);
  expect(result.list).toContain('Math');

  codearea.instance().codeMirror.setValue('//');
  codearea.instance().codeMirror.setCursor(0, 2);
  result = CodeMirror.hint.javascript(codearea.instance().codeMirror);
  expect(result.list).toHaveLength(0);
});

test('Display code hint for JsBatlle libs', () => {
  const onChange= jest.fn()
  const codearea = mount(<CodeArea defaultValue="a" onChange={onChange} />);

  codearea.instance().codeMirror.setValue('control.SH');
  codearea.instance().codeMirror.setCursor(0, 11);
  let result = CodeMirror.hint.javascript(codearea.instance().codeMirror);
  expect(result.list).toContain('SHOOT');
});

test('Autocomplete', () => {
  const onChange= jest.fn()
  const wrapper = mount(<div><CodeArea defaultValue="a" onChange={onChange} /></div>);
  const codearea = wrapper.childAt(0);
  let event = new KeyboardEvent('keyup', {
    key: 'a',
    keyCode: 65,
    witch: 65
  });
  codearea.instance().codeMirror.setValue('a');
  codearea.instance().codeMirror.setCursor(0, 1);
  CodeMirror.signal(codearea.instance().codeMirror, 'keyup', codearea.instance().codeMirror, event)

  event = new KeyboardEvent('keyup', {
    keyCode: 37,
    witch: 37
  });
  codearea.instance().codeMirror.setValue('a');
  codearea.instance().codeMirror.setCursor(0, 1);
  CodeMirror.signal(codearea.instance().codeMirror, 'keyup', codearea.instance().codeMirror, event)

});
