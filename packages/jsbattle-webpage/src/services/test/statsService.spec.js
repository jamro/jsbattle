import 'babel-polyfill';
import {
  onChallengesList,
  onSandboxOpen,
  onChallengeOpen,
  onChallengeComplete,
  onSandboxEdit,
  onAiScriptRemove,
  onAiScriptCreate
} from '../statsService.js';


let gtagOrig;
let logOrig;

beforeEach(() => {
  logOrig = console.log;
  gtagOrig = window.gtag
  console.log = jest.fn();
  window.gtag = jest.fn();
});

afterEach(() => {
  window.gtag = gtagOrig
  console.log = logOrig
});

test('notify open challenges', () => {
  onChallengesList();
  expect(window.gtag.mock.calls).toHaveLength(1);
  expect(window.gtag.mock.calls[0][0]).toBe('event');
  expect(window.gtag.mock.calls[0][1]).toBe('list');
  expect(window.gtag.mock.calls[0][2]).toHaveProperty('event_category', 'challenges')
});

test('notify open sandbox', () => {
  onSandboxOpen();
  expect(window.gtag.mock.calls).toHaveLength(1);
  expect(window.gtag.mock.calls[0][0]).toBe('event');
  expect(window.gtag.mock.calls[0][1]).toBe('open');
  expect(window.gtag.mock.calls[0][2]).toHaveProperty('event_category', 'sandbox')
});

test('notify challenge open', () => {
  onChallengeOpen(5);
  expect(window.gtag.mock.calls).toHaveLength(1);
  expect(window.gtag.mock.calls[0][0]).toBe('event');
  expect(window.gtag.mock.calls[0][1]).toBe('challenge_5');
  expect(window.gtag.mock.calls[0][2]).toHaveProperty('event_category', 'challenges')
  expect(window.gtag.mock.calls[0][2]).toHaveProperty('event_label', 'open')
});

test('ignore challenge open with invalid levelId', () => {
  let warnOrig = console.warn;
  console.warn = jest.fn();

  let levelIdValues = [
    null,
    undefined,
    "abc",
    {},
    [1,2,3]
  ];
  for(let levelId of levelIdValues) {
    console.warn.mockReset();
    onChallengeOpen(levelId);
    expect(window.gtag.mock.calls).toHaveLength(0);
    expect(console.warn.mock.calls).toHaveLength(1);
  }
  console.warn = warnOrig;
});

test('notify challenge complete', () => {
  onChallengeComplete(2);
  expect(window.gtag.mock.calls).toHaveLength(1);
  expect(window.gtag.mock.calls[0][0]).toBe('event');
  expect(window.gtag.mock.calls[0][1]).toBe('challenge_2');
  expect(window.gtag.mock.calls[0][2]).toHaveProperty('event_category', 'challenges')
  expect(window.gtag.mock.calls[0][2]).toHaveProperty('event_label', 'win')
});

test('ignore challenge complete with invalid levelId', () => {
  let warnOrig = console.warn;
  console.warn = jest.fn();

  let levelIdValues = [
    null,
    undefined,
    "abc",
    {},
    [1,2,3]
  ];
  for(let levelId of levelIdValues) {
    console.warn.mockReset();
    onChallengeComplete(levelId);
    expect(window.gtag.mock.calls).toHaveLength(0);
    expect(console.warn.mock.calls).toHaveLength(1);
  }
  console.warn = warnOrig;
});

test('notify edit sandbox', () => {
  onSandboxEdit();
  expect(window.gtag.mock.calls).toHaveLength(1);
  expect(window.gtag.mock.calls[0][0]).toBe('event');
  expect(window.gtag.mock.calls[0][1]).toBe('edit');
  expect(window.gtag.mock.calls[0][2]).toHaveProperty('event_category', 'sandbox')
});

test('notify create sandbox', () => {
  onAiScriptCreate();
  expect(window.gtag.mock.calls).toHaveLength(1);
  expect(window.gtag.mock.calls[0][0]).toBe('event');
  expect(window.gtag.mock.calls[0][1]).toBe('create');
  expect(window.gtag.mock.calls[0][2]).toHaveProperty('event_category', 'sandbox')
});

test('notify remove sandbox', () => {
  onAiScriptRemove();
  expect(window.gtag.mock.calls).toHaveLength(1);
  expect(window.gtag.mock.calls[0][0]).toBe('event');
  expect(window.gtag.mock.calls[0][1]).toBe('remove');
  expect(window.gtag.mock.calls[0][2]).toHaveProperty('event_category', 'sandbox')
});
