import FullRow from "../components/FullRow.js";
import React from "react";
import {connect} from 'react-redux';
import LiveCode from '../components/LiveCode.js';
import EditableText from '../components/EditableText.js';
import DuelResultScreen from '../components/DuelResultScreen.js';
import LiveCodeSandboxSettingsTab from '../components/LiveCodeSandboxSettingsTab.js';
import {Link} from 'react-router-dom';
import {
  notifySandboxEdit
} from '../actions/statsAction.js';
import {
  getAiScript,
  getSandboxAiScriptList,
  updateAiScript,
  renameAiScript,
  setSandboxOpponent,
  setSandboxBattleMode,
  lockSandboxRng,
} from '../actions/sandboxAction.js';
import JsBattle from 'jsbattle-engine';
import PropTypes from 'prop-types';

export class SandboxScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      rngSeed: Math.random(),
      winner: {name: '', score: 0},
      loser: {name: '', score: 0},
      isRunning: true
    };

    this.liveCode = React.createRef();
    this.aiDefList = [];
    this.updateAiDefList(props.mode, props.opponent);
  }

  log(msg) {
    if(this.props.logging) {
      console.log(msg);
    }
  }

  componentDidMount() {
    let id = this.props.match.params.name;
    this.props.getAiScript(id, this.props.useRemoteService);
    this.props.getSandboxAiScriptList(this.props.useRemoteService);
    this.props.notifySandboxEdit();
    this.log('SandboxScreen mounted');
  }

  shouldComponentUpdate(nextProps) {
    if(!this.state.isRunning) return true;
    if(
      this.props.mode != nextProps.mode ||
      this.props.opponent.type != nextProps.opponent.type ||
      this.props.opponent.name != nextProps.opponent.name
    ) {
      this.updateAiDefList(nextProps.mode, nextProps.opponent);
    }
    return true;
  }

  updateAiDefList(mode, opponent) {
    let aiDefList = [];
    let teamMode = (mode == 'team');
    let count = teamMode ? 3 : 1;

    for(let i=0; i < count; i++) {
      let aiDef = JsBattle.createAiDefinition();
      switch(opponent.type) {
        case 'bundled':
          aiDef.fromFile(opponent.name);
          break;
        case 'user':
          aiDef.fromCode(opponent.name, opponent.code);
          break;
      }
      aiDefList.push(aiDef);
    }
    this.aiDefList = aiDefList;
  }

  restartBattle() {
    let newState = {isRunning: true};
    if(!this.props.lockRng) {
      newState.rngSeed = Math.random();
    }
    this.setState(newState);
    this.updateAiDefList(this.props.mode, this.props.opponent);
    this.liveCode.current.restartBattle();
  }

  onCodeChanged(code) {
    this.log("Challenge code changed");
    this.props.updateAiScript(this.props.script.id, code, this.props.useRemoteService);
  }

  onOpponentChange(value) {
    value = value.split('/');
    this.props.setSandboxOpponent(value[0], value[1]);
  }

  onBattleFinish(result) {
    let winner = null;
    let loser = null;
    let teamMode = (this.props.mode == 'team' );
    let teams = teamMode ? result.teamList : result.tankList;
    if(teams[0].score > teams[1].score) {
      winner = teams[0];
      loser = teams[1];
    } else {
      winner = teams[1];
      loser = teams[0];
    }
    this.setState({
      winner: {
        name: winner.name,
        score: winner.score,
        skin: teamMode ? winner.members[0].skin : winner.skin
      },
      loser: {
        name: loser.name,
        score: loser.score ,
        skin: teamMode ? loser.members[0].skin : loser.skin
      },
      isRunning: false
    });
  }

  renderSettingsTab() {
    let selectedOpponent;
    if(this.props.opponent.type == 'user' && this.props.opponent.name == this.props.script.scriptName) {
      selectedOpponent = 'bundled/dummy';
    } else {
      selectedOpponent = this.props.opponent.type + "/" + this.props.opponent.name;
    }

    let userTankList = this.props.userTankList
      .filter((script) => script.scriptName != this.props.script.scriptName)
      .map((row) => ({
        id: 'user/' + row.scriptName,
        scriptName: row.scriptName,
        bundled: false
      }));
    let bundledTankList = this.props.bundledTankList
      .map((name) => ({
        id: 'bundled/' + name,
        scriptName: 'Bundled: ' + name,
        bundled: true
      }));
    let opponents = bundledTankList.concat(userTankList);

    return <LiveCodeSandboxSettingsTab
      rngSeed={this.state.rngSeed}
      isRngLocked={this.props.lockRng}
      mode={this.props.mode}
      opponents={opponents}
      selectedOpponent={selectedOpponent}
      onBattleModeChange={(isTeam) => this.props.setSandboxBattleMode(isTeam)}
      onOpponentChange={(id) => this.onOpponentChange(id)}
      onRngLock={(locked) => this.props.lockSandboxRng(locked)}
    />;
  }

  renderResults() {
    return <div className="text-center">
        <DuelResultScreen
          hasWon={this.props.script.scriptName == this.state.winner.name}
          winnerName={this.state.winner.name}
          winnerSkin={this.state.winner.skin}
          winnerScore={this.state.winner.score}
          loserName={this.state.loser.name}
          loserSkin={this.state.loser.skin}
          loserScore={this.state.loser.score}
        />
        <button className="btn btn-primary btn-lg restart-sandbox-battle" role="button" onClick={() => this.restartBattle()} >
          <i className="fas fa-sync" aria-hidden="true"></i> Restart the Battle
        </button>
      </div>;
  }

  render() {
    let teamMode = (this.props.mode == 'team');
    let count = teamMode ? 3 : 1;

    return <div>
        <FullRow>
          <nav className="breadcrumb-container">
            <ol className="breadcrumb">
              <li style={{marginRight: '0.5em'}}><i className="fas fa-angle-right"></i></li>
              <li className="breadcrumb-item"><Link to="/sandbox">Sandbox</Link></li>
              <li className="breadcrumb-item">
                <EditableText
                  id={this.props.script.id}
                  name={this.props.script.scriptName}
                  onChange={(newName, id) => this.props.renameAiScript(newName, id, this.props.useRemoteService)}
                  loading={this.props.isRenameLoading}
                />
              </li>
            </ol>
            <button type="button" className="btn btn-sm btn-primary restart-battle" disabled={this.props.isLoading} onClick={() => this.restartBattle()}>
              <i className="fas fa-sync" aria-hidden="true"></i> Restart the Battle
            </button>
          </nav>
        </FullRow>
        <FullRow>
          <LiveCode
            ref={this.liveCode}
            isLoading={this.props.isLoading}
            simQuality={this.props.simQuality}
            simSpeed={this.props.simSpeed}
            code={this.props.script.code}
            name={this.props.script.scriptName}
            rngSeed={this.state.rngSeed}
            timeLimit={0}
            teamMode={teamMode}
            count={count}
            aiDefList={this.aiDefList}
            onCodeChanged={(code) => this.onCodeChanged(code)}
            onFinish={(result) => this.onBattleFinish(result)}
            extraTabs={[
              {
                id: 'settings',
                label: "Settings",
                icon: 'fas fa-tools',
                content: this.renderSettingsTab()
              }
            ]}
          >
            {this.renderResults()}
          </LiveCode>
        </FullRow>
      </div>;
  }
}

SandboxScreen.defaultProps = {
  isLoading: false,
  isRenameLoading: false,
  lockRng: false,
  useRemoteService: false,
  logging: true,
  simQuality: 'auto',
  simSpeed: 1,
  userTankList: [],
  bundledTankList: [],
  opponent: {
    type: 'user',
    name: "dummy",
    code: "importScripts('lib/tank.js'); tank.init(function(settings, info) { }); tank.loop(function(state, control) { });",
  },
  mode: 'duel',
  script: {
    id: '0',
    scriptName: 'noname',
    code: '',
  },
  getAiScript: () => {},
  updateAiScript: () => {},
  renameAiScript: () => {},
  setSandboxOpponent: () => {},
  setSandboxBattleMode: () => {},
  lockSandboxRng: () => {},
  notifySandboxEdit: () => {},
  getSandboxAiScriptList: () => {},
};

SandboxScreen.propTypes = {
  isLoading: PropTypes.bool,
  isRenameLoading: PropTypes.bool,
  lockRng: PropTypes.bool,
  useRemoteService: PropTypes.bool,
  logging: PropTypes.bool,
  simSpeed: PropTypes.number,
  userTankList: PropTypes.array,
  bundledTankList: PropTypes.array,
  opponent: PropTypes.object,
  script: PropTypes.object,
  mode: PropTypes.oneOf(['duel', 'team']),
  getAiScript: PropTypes.func,
  updateAiScript: PropTypes.func,
  renameAiScript: PropTypes.func,
  setSandboxOpponent: PropTypes.func,
  setSandboxBattleMode: PropTypes.func,
  lockSandboxRng: PropTypes.func,
  notifySandboxEdit: PropTypes.func,
  getSandboxAiScriptList: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isLoading: state.loading.AI_SCRIPT || state.loading.SANDBOX_AI_SCRIPT_LIST,
  isRenameLoading: state.loading.AI_SCRIPT_RENAME,
  simQuality: state.settings.simQuality,
  simSpeed: state.settings.simSpeed,
  userTankList: state.aiRepo.tankList,
  bundledTankList: state.sandbox.tankList,
  opponent: state.sandbox.opponent,
  mode: state.sandbox.mode,
  lockRng: state.sandbox.lockRng,
  script: state.sandbox.script,
  useRemoteService: state.auth.profile.registered
});

const mapDispatchToProps = (dispatch) => ({
  getAiScript: (name, useRemoteService) => {
    dispatch(getAiScript(name, useRemoteService));
  },
  getSandboxAiScriptList: (useRemoteService) => {
    dispatch(getSandboxAiScriptList(useRemoteService));
  },
  updateAiScript: (id, code, useRemoteService) => {
    dispatch(updateAiScript(id, code, useRemoteService));
  },
  renameAiScript: (newName, id, useRemoteService) => {
    dispatch(renameAiScript(newName, id, useRemoteService));
  },
  setSandboxOpponent: (type, name) => {
    dispatch(setSandboxOpponent(type, name));
  },
  setSandboxBattleMode: (teamMode) => {
    dispatch(setSandboxBattleMode(teamMode));
  },
  lockSandboxRng: (lock) => {
    dispatch(lockSandboxRng(lock));
  },
  notifySandboxEdit: () => {
    dispatch(notifySandboxEdit());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SandboxScreen);
