class Stats {

  onChallengesList() {
    this._gaSubmit('challenges', 'list');
  }

  onCustomBattleOpen() {
    this._gaSubmit('custom_battle', 'open');
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

  onCustomBattleStart(teamMode) {
    this._gaSubmit('custom_battle', 'start', teamMode ?'team_mode' : 'free_for_all');
  }

  onCustomBattleComplete() {
    this._gaSubmit('custom_battle', 'complete');
  }

  onCustomBattleTankSelected(tank, count) {
    if(isNaN(count)) {
      console.warn("Warning: count must be a number");
      return;
    }
    this._gaSubmit('custom_battle', 'tank', tank, count);
  }

  onAiScriptCreate() {
    this._gaSubmit('editor', 'create');
  }

  onAiScriptRemove() {
    this._gaSubmit('editor', 'remove');
  }

  _gaSubmit(category, action, label, value) {
    console.log(`[STATS] ${category} / ${action} / ${label} / ${value}`);
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
