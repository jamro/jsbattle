class Stats {

  onChallengesList() {
    this._gaSubmit('challenges', 'list');
  }

  onSandboxOpen() {
    this._gaSubmit('sandbox', 'open');
  }

  onChallengeOpen(levelId) {
    if(isNaN(levelId)) {
      console.warn("Warning: levelId must be a number");
      return;
    }
    this._gaSubmit('challenges', 'challenge_' + levelId, 'open');
  }

  onChallengeComplete(levelId) {
    if(isNaN(levelId)) {
      console.warn("Warning: levelId must be a number");
      return;
    }
    this._gaSubmit('challenges', 'challenge_' + levelId, 'win');
  }

  onSandboxEdit() {
    this._gaSubmit('sandbox', 'edit');
  }

  onAiScriptCreate() {
    this._gaSubmit('sandbox', 'create');
  }

  onAiScriptRemove() {
    this._gaSubmit('sandbox', 'remove');
  }

  _gaSubmit(category, action, label, value) {
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

}

export default new Stats();
