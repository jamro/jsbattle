
function gaSubmit(category, action, label, value) {
  console.log(`[STATS] ${category || '-'} / ${action || '-'} / ${label || '-'} / ${value || '-'}`);
  let data = {};
  if(category !== undefined) {
    data.event_category = category; // eslint-disable-line camelcase
  }
  if(label !== undefined) {
    data.event_label = label; // eslint-disable-line camelcase
  }
  if(value !== undefined) {
    data.value = value; // eslint-disable-line camelcase
  }
  window.gtag('event', action, data);
}

export const onChallengesList = () => {
  gaSubmit('challenges', 'list');
};

export const onSandboxOpen = () => {
  gaSubmit('sandbox', 'open');
};

export const onChallengeOpen = (levelId) => {
  if(isNaN(levelId)) {
    console.warn("Warning: levelId must be a number");
    return;
  }
  gaSubmit('challenges', 'challenge_' + levelId, 'open');
};

export const onChallengeComplete = (levelId) => {
  if(isNaN(levelId)) {
    console.warn("Warning: levelId must be a number");
    return;
  }
  gaSubmit('challenges', 'challenge_' + levelId, 'win');
};

export const onSandboxEdit = () => {
  gaSubmit('sandbox', 'edit');
};

export const onAiScriptCreate = () => {
  gaSubmit('sandbox', 'create');
};

export const onAiScriptRemove = () => {
  gaSubmit('sandbox', 'remove');
};

export default {
  onChallengeComplete,
  onChallengeOpen,
  onAiScriptCreate,
  onAiScriptRemove,
  onChallengesList,
  onSandboxEdit,
  onSandboxOpen
};
