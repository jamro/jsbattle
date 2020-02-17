import FullRow from "../components/FullRow.js";
import React from "react";
import {connect} from 'react-redux';
import LiveCode from '../components/LiveCode.js';
import EditableText from '../components/EditableText.js';
import DuelResultScreen from '../components/DuelResultScreen.js';
import {Link} from 'react-router-dom';
import Row from '../components/Row.js';
import Col from '../components/Col.js';
import {
  notifySandboxEdit
} from '../actions/statsAction.js';
import {
  getAiScript,
  updateAiScript,
  renameAiScript,
  setSandboxOpponent,
  setSandboxBattleMode,
  lockSandboxRng,
} from '../actions/sandboxAction.js';
import JsBattle from 'jsbattle-engine';

class SandboxScreen extends React.Component {

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

  componentDidMount() {
    let name = this.props.match.params.name;
    this.props.getAiScript(name);
    this.props.notifySandboxEdit();
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
    console.log("Challenge code changed");
    this.props.updateAiScript(this.props.name, code);
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
    let opponents = [];
    let selectedOpponent;
    if(this.props.opponent.type == 'user' && this.props.opponent.name == this.props.name) {
      selectedOpponent = 'bundled/dummy';
    } else {
      selectedOpponent = this.props.opponent.type + "/" + this.props.opponent.name;
    }

    opponents = opponents.concat(
      this.props.bundledTankList.map((name) => <option key={`bundled/${name}`} value={`bundled/${name}`}>Bundled: {name}</option>),
      this.props.userTankList.filter((name) => name != this.props.name).map((name) => <option key={`user/${name}`} value={`user/${name}`}>{name}</option>),
    );

    return <Row>
        <Col sm={12}>
          <div className="card" style={{marginTop: '1em'}}>
            <div className="card-body debug-container" style={{padding: '1em'}}>
              <form>
                <div className="form-group">
                  <label htmlFor="opponent"><i className="fas fa-crosshairs"></i> Opponent</label>
                  <select className="form-control" id="opponent" value={selectedOpponent} onChange={(e) => this.onOpponentChange(e.target.value)}>
                    {opponents}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="opponent"><i className="fas fa-users-cog"></i> Mode</label>
                  <select className="form-control" id="mode" value={this.props.mode} onChange={(e) => this.props.setSandboxBattleMode(e.target.value == 'team')}>
                    <option value="duel">Duel</option>
                    <option value="team">Team Deathmatch</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="seed"><i className="fas fa-seedling"></i> RNG Seed</label>
                  <input type="text" className="form-control" id="seed" value={this.state.rngSeed} disabled />
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="lock" checked={this.props.lockRng} onChange={(e) => this.props.lockSandboxRng(e.target.checked)} />
                    <label className="form-check-label" htmlFor="lock">
                      Lock RNG
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Col>
      </Row>;
  }

  renderResults() {
    return <div className="text-center">
        <DuelResultScreen
          hasWon={this.props.name == this.state.winner.name}
          winnerName={this.state.winner.name}
          winnerSkin={this.state.winner.skin}
          winnerScore={this.state.winner.score}
          loserName={this.state.loser.name}
          loserSkin={this.state.loser.skin}
          loserScore={this.state.loser.score}
        />
        <button className="btn btn-primary btn-lg next-challenge" role="button" onClick={() => this.restartBattle()} >
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
                  name={this.props.name}
                  onChange={(newName, oldName) => this.props.renameAiScript(newName, oldName)}
                  loading={this.props.isRenameLoading}
                />
              </li>
            </ol>
            <button type="button" className="btn btn-sm btn-primary restart-challenge-battle" disabled={this.props.isLoading} onClick={() => this.restartBattle()}>
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
            code={this.props.code}
            name={this.props.name}
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

const mapStateToProps = (state) => ({
  isLoading: state.loading.AI_SCRIPT,
  isRenameLoading: state.loading.AI_SCRIPT_RENAME,
  simQuality: state.settings.simQuality,
  simSpeed: state.settings.simSpeed,
  code: state.sandbox.code,
  name: state.sandbox.name,
  userTankList: state.aiRepo.tankList,
  bundledTankList: state.sandbox.tankList,
  opponent: state.sandbox.opponent,
  mode: state.sandbox.mode,
  lockRng: state.sandbox.lockRng,
});

const mapDispatchToProps = (dispatch) => ({
  getAiScript: (name) => {
    dispatch(getAiScript(name));
  },
  updateAiScript: (name, code) => {
    dispatch(updateAiScript(name, code));
  },
  renameAiScript: (newName, oldName) => {
    dispatch(renameAiScript(newName, oldName));
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
