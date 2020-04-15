import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CodeMirror from 'codemirror';
import CodeMirrorShowHintAddon from 'codemirror/addon/hint/show-hint';
import CodeMirrorJsAddon from 'codemirror/addon/hint/javascript-hint';

configure({ adapter: new Adapter() });

global.VERSION = '1.0.0-TEST'
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

var localStorageMock = (function() {
  var store = {};
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn()
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
