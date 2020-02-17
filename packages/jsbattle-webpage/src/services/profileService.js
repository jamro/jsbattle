const serviceDelay = 10;

export const getSettings = async () => {
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));
  let settings = {};
  settings.simSpeed = localStorage.getItem("settings.simSpeed");
  settings.qualitySettings = localStorage.getItem("settings.quality");
  settings.simSpeed = settings.simSpeed ? Number(settings.simSpeed) : 1;
  settings.qualitySettings = settings.qualitySettings ? settings.qualitySettings : 0.5;
  settings.qualitySettings = isNaN(settings.qualitySettings) ? settings.qualitySettings : Number(settings.qualitySettings);

  return settings;
};

export const setSimQuality = async (quality) => {
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));
  localStorage.setItem("settings.quality", quality);
};

export const setSimSpeed = async (speed) => {
  await new Promise((resolve) => setTimeout(resolve, serviceDelay));
  localStorage.setItem("settings.simSpeed", speed);
};

export default {
  getSettings,
  setSimQuality,
  setSimSpeed
};
