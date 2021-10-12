import React from "react";
import {connect} from 'react-redux';
import LiveCode from '../components/LiveCode.js';
import {
  completeChallenge,
  getChallenge,
  updateChallengeCode,
} from '../actions/challengeAction.js';
import {
  notifyStatsChallengeComplete,
} from '../actions/statsAction.js';
import FullRow from '../components/FullRow.js';
import Loading from '../components/Loading.js';
import {Link} from 'react-router-dom';
import JsBattle from 'jsbattle-engine';
import PropTypes from 'prop-types';

export class ChallengeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.battlefield = null;
    this.reloadTimeout = null;

    this.state = {
      code: props.currentChallenge ? props.currentChallenge.code : '',
      tab: 'info',
      hasWon: false,
      loading: true,
      debug: {}
    };

    this._aiDefListTemplateCache = [];
    this._lastAiDefList = [];

    this.liveCode = React.createRef();
  }

  log(msg) {
    if(this.props.logging) {
      console.log(msg);
    }
  }

  componentDidMount() {
    let challengeId = this.props.match.params.id;
    this.props.getChallenge(challengeId, this.props.useRemoteService);
    this.log('ChallengeScreen mounted');
  }

  restartBattle() {
    this.log('Restarting battle from ChallengeScreen...');
    this.liveCode.current.restartBattle();
  }

  onCodeChanged(code) {
    this.log("Challenge code changed");
    this.props.updateChallengeCode(this.props.currentChallenge.id, code, this.props.useRemoteService);
  }

  onChallengeComplete(result) {
    let aliveTanks = result.tankList.filter((tank) => tank.energy > 0);
    if(aliveTanks.length != 1 || aliveTanks[0].name.toLowerCase() != 'player') {
      this.log("Challange lost... restarting");
      this.restartBattle();
      return;
    }
    this.log("Challange won");
    this.setState({hasWon: true});
    this.props.completeChallenge(this.props.currentChallenge.id, this.props.useRemoteService);
    this.props.notifyStatsChallengeComplete(this.props.currentChallenge.level);
  }

  getAiDefListTemplate() {
    if(JSON.stringify(this._lastAiDefList) == JSON.stringify(this.props.currentChallenge.aiDefList)) {
      return this._aiDefListTemplateCache;
    }
    let aiDefListTemplate = [];
    this._lastAiDefList = this.props.currentChallenge.aiDefList;
    this.props.currentChallenge.aiDefList.forEach((tank) => {
      if(!tank.name) {
        throw new Error('Cannot create opponent AI for challenge. The name is missing: ' + JSON.stringify(tank));
      }
      let aiDef = JsBattle.createAiDefinition();
      switch(tank.source) {
        case 'file':
          aiDef.fromFile(tank.name);
          break;
        case 'code':
          aiDef.fromCode(tank.name, tank.code);
          if(this.props.disableSandbox) {
            console.warn('disabling sanboxing for ' + tank.name);
            aiDef.disableSandbox();
          }
          break;
      }
      aiDefListTemplate.push(aiDef);
    });
    this._aiDefListTemplateCache = aiDefListTemplate;
    return aiDefListTemplate;
  }

  render() {
    if(this.props.isLoading) {
      return <Loading />;
    }
    if(!this.props.currentChallenge) {
      return <FullRow>
          <nav className="breadcrumb-container bg-light rounded-3">
            <ol className="breadcrumb">
              <li style={{marginRight: '0.5em'}}><i className="fas fa-angle-right"></i></li>
              <li className="breadcrumb-item"><Link to="/challenge">Challenges</Link></li>
              <li className="breadcrumb-item" aria-current="page">Challenge unavailable</li>
            </ol>
          </nav>
        </FullRow>;
    }

    let congratsScreen = null;
    if(this.state.hasWon && this.props.isCompleting) {
      congratsScreen = <Loading />;
    } else if(this.state.hasWon) {
      congratsScreen = <div className="bg-light rounded-3 text-center" style={{padding: '1em'}}>
        <h4 className="congrats-msg result-msg"><i className="fas fa-trophy d-none d-lg-inline d-xl-inline"></i> Challenge Completed!</h4>
        <p className="d-none d-lg-block d-xl-block">Good job! You did it! Now try something more difficult - the next challenge is waiting for you.</p>
        <Link className="btn btn-primary btn-lg next-challenge" to="/challenge" role="button">
          Next Challenge
          &nbsp;
          <i className="fas fa-play"></i>
        </Link>
      </div>;
    }

    return <div>
    <FullRow>
      <nav className="breadcrumb-container bg-light rounded-3">
        <button type="button" className="btn btn-sm btn-primary restart-challenge-battle float-end" onClick={() => this.restartBattle()}>
          <i className="fas fa-sync" aria-hidden="true"></i> Restart the Battle
        </button>
        <ol className="breadcrumb">
          <li style={{marginRight: '0.5em'}}><i className="fas fa-angle-right"></i></li>
          <li className="breadcrumb-item"><Link to="/challenge">Challenges</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Level {this.props.currentChallenge.level}: {this.props.currentChallenge.name}</li>
        </ol>
      </nav>
    </FullRow>
      <LiveCode
        ref={this.liveCode}
        challengeId={this.props.match.params.id}
        aiDefList={this.getAiDefListTemplate()}
        list={this.props.list}
        simQuality={this.props.simQuality}
        simSpeed={this.props.simSpeed}
        code={this.props.currentChallenge.code}
        info={this.props.currentChallenge.description}
        onFinish={(result) => this.onChallengeComplete(result)}
        onCodeChanged={(code) => this.onCodeChanged(code)}
        rngSeed={this.props.currentChallenge.rngSeed}
        timeLimit={this.props.currentChallenge.timeLimit}
        teamMode={this.props.currentChallenge.teamMode}
        modifier={this.props.currentChallenge.modifier}
        renderer={this.props.renderer}
        disableSandbox={this.props.disableSandbox}
        debug={this.props.debug}
        reloadTime={this.props.reloadTime}
      >
        {congratsScreen}
      </LiveCode>
    </div>;
  }
}

ChallengeScreen.defaultProps = {
  reloadTime: 700,
  renderer: "brody",
  disableSandbox: false,
  logging: true,
  debug: false,
  simQuality: 'auto',
  simSpeed: 1,
  currentChallenge: {
    id: '0',
    level: 0,
    name: '',
    code: '',
    description: '',
    aiDefList: [],
    rngSeed: 0,
    timeLimit: 0,
    teamMode: false,
    modifier: null
  },
  isLoading: false,
  useRemoteService: false,
  completeChallenge: () => {},
  getChallenge: () => {},
  updateChallengeCode: () => {},
  notifyStatsChallengeComplete: () => {},
};

ChallengeScreen.propTypes = {
  reloadTime: PropTypes.number,
  renderer: PropTypes.string,
  disableSandbox: PropTypes.bool,
  debug: PropTypes.bool,
  logging: PropTypes.bool,
  simSpeed: PropTypes.number,
  currentChallenge: PropTypes.object,
  isLoading: PropTypes.bool,
  isCompleting: PropTypes.bool,
  useRemoteService: PropTypes.bool,
  completeChallenge: PropTypes.func,
  getChallenge: PropTypes.func,
  updateChallengeCode: PropTypes.func,
  notifyStatsChallengeComplete: PropTypes.func,
};

const mapStateToProps = (state) => ({
  simQuality: state.settings.simQuality,
  simSpeed: state.settings.simSpeed,
  currentChallenge: state.challenge.currentChallenge,
  isLoading: state.loading.CHALLENGE_CODE || state.loading.CHALLENGE,
  isCompleting: state.loading.COMPLETE_CHALLENGE,
  useRemoteService: state.auth.profile.registered
});

const mapDispatchToProps = (dispatch) => ({
  completeChallenge: (challengeId, useRemoteService) => {
    dispatch(completeChallenge(challengeId, useRemoteService));
  },
  getChallenge: (id, useRemoteService) => {
    dispatch(getChallenge(id, useRemoteService));
  },
  updateChallengeCode: (id, code, useRemoteService) => {
    dispatch(updateChallengeCode(id, code, useRemoteService));
  },
  notifyStatsChallengeComplete: (levelId) => {
    dispatch(notifyStatsChallengeComplete(levelId));
  }

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChallengeScreen);
