import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CodeMirror from 'codemirror';
import CodeMirrorShowHintAddon from 'codemirror/addon/hint/show-hint';
import CodeMirrorJsAddon from 'codemirror/addon/hint/javascript-hint';

configure({ adapter: new Adapter() });

global.CodeMirror = CodeMirror;
global.document.body.createTextRange = () => ({
  setEnd: () => {},
  setStart: () => {},
  getBoundingClientRect: () => ({right: 0}),
  getClientRects: () => ({
    length: 0,
    left: 0,
    right: 0
  })
});
