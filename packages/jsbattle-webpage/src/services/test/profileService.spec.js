import 'babel-polyfill';
import {
  getSettings,
  setSimQuality,
  setSimSpeed
} from '../profileService.js';


beforeEach(() => {
  global.localStorage.getItem.mockReset();
  global.localStorage.setItem.mockReset();
  global.localStorage.clear.mockReset();
  global.localStorage.removeItem.mockReset();
});

test('get settings default', async () => {
  const result = await getSettings();
  expect(result).toHaveProperty('simSpeed', 1);
  expect(result).toHaveProperty('qualitySettings', 0.5);
});

test('get stored settings', async () => {
  global.localStorage.getItem.mockImplementation((key) => {
    switch (key) {
      case 'settings.simSpeed': return 2.34
      case 'settings.quality':  return 'auto'
      default:                  return undefined;
    }
  })
  const result = await getSettings();
  expect(result).toHaveProperty('simSpeed', 2.34);
  expect(result).toHaveProperty('qualitySettings', 'auto');
});

test('set simulation speed', async () => {
  await setSimSpeed(4.391);
  expect(global.localStorage.setItem.mock.calls).toHaveLength(1);
  expect(global.localStorage.setItem.mock.calls[0][0]).toBe("settings.simSpeed");
  expect(global.localStorage.setItem.mock.calls[0][1]).toBe(4.391);
});

test('set quality speed', async () => {
  await setSimQuality(0.07);
  expect(global.localStorage.setItem.mock.calls).toHaveLength(1);
  expect(global.localStorage.setItem.mock.calls[0][0]).toBe("settings.quality");
  expect(global.localStorage.setItem.mock.calls[0][1]).toBe(0.07);

  global.localStorage.setItem.mockReset();
  await setSimQuality('auto');
  expect(global.localStorage.setItem.mock.calls).toHaveLength(1);
  expect(global.localStorage.setItem.mock.calls[0][0]).toBe("settings.quality");
  expect(global.localStorage.setItem.mock.calls[0][1]).toBe('auto');
});
