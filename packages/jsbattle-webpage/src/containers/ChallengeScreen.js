import React from "react";
import {connect} from 'react-redux';
import LiveCode from '../components/LiveCode.js';
import {
  completeChallenge,
  getChallengeCode,
  updateChallengeCode,
  notifyStatsChallengeComplete,
  notifyStatsChallengeOpen,
} from '../actions';
import FullRow from '../components/FullRow.js';
import {Link} from 'react-router-dom';
import {getChallengeModifier} from "../lib/ChallengeLibrary.js";
import JsBattle from 'jsbattle-engine';

class ChallengeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.battlefield = null;
    this.reloadTimeout = null;

    let challengeId = this.props.match.params.id;
    let currentChallenge = null;
    for(let i in this.props.list) {
      if(i != 0 && !this.props.list[i].isCompleted && (!this.props.list[i-1] || !this.props.list[i-1].isCompleted)) continue;
      if(this.props.list[i].id == challengeId) {
        currentChallenge = this.props.list[i];
        break;
      }
    }
    if(!currentChallenge) {
      this.state = {};
      return;
    }

    let aiDefListTemplate = [];

    currentChallenge.aiDefList.forEach((tank) => {
      let aiDef = JsBattle.createAiDefinition();
      switch(tank.source) {
        case 'file':
          aiDef.fromFile(tank.name);
          break;
        case 'code':
          aiDef.fromCode(tank.name, tank.code);
          break;
      }
      aiDefListTemplate.push(aiDef);
    });

    let modifier = getChallengeModifier(challengeId);

    console.log(`Challenge #${currentChallenge.level} (ID: ${currentChallenge.id})`);

    this.state = {
      currentChallenge,
      code: props.code,
      aiDefListTemplate: aiDefListTemplate,
      modifier: modifier,
      tab: 'info',
      hasWon: false,
      loading: true,
      debug: {}
    };

    this.liveCode = React.createRef();
  }

  componentDidMount() {
    if(!this.state.currentChallenge) {
      return;
    }
    this.props.notifyStatsChallengeOpen(this.state.currentChallenge.level);

    console.log(`Challenge #${this.state.currentChallenge.level} (ID: ${this.state.currentChallenge.id})`);
    this.props.getChallengeCode(this.state.currentChallenge.id);
  }


  restartBattle() {
    this.liveCode.current.restartBattle();
  }

  onCodeChanged(code) {
    console.log("Challenge code changed");
    this.props.updateChallengeCode(this.state.currentChallenge.id, code);
  }

  onChallengeComplete(result) {

    let aliveTanks = result.tankList.filter((tank) => tank.energy > 0);
    if(aliveTanks.length != 1 || aliveTanks[0].name.toLowerCase() != 'player') {
      console.log("Challange lost... restarting");
      this.restartBattle();
      return;
    }
    console.log("Challange won");
    this.setState({hasWon: true});
    this.props.completeChallenge(this.state.currentChallenge.id);
    this.props.notifyStatsChallengeComplete(this.state.currentChallenge.level);
  }

  render() {
    if(!this.state.currentChallenge) {
      return <div>Challenge not available</div>;
    }

    let congratsScreen = null;
    if(this.state.hasWon) {
      congratsScreen = <div className="jumbotron text-center">
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
      <nav className="breadcrumb-container">
        <ol className="breadcrumb">
          <li style={{marginRight: '0.5em'}}><i className="fas fa-angle-right"></i></li>
          <li className="breadcrumb-item"><Link to="/challenge">Challenges</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Level {this.state.currentChallenge.level}: {this.state.currentChallenge.name}</li>
        </ol>
        <button type="button" className="btn btn-sm btn-primary restart-challenge-battle" disabled={this.props.isLoading} onClick={() => this.restartBattle()}>
          <i className="fas fa-sync" aria-hidden="true"></i> Restart the Battle
        </button>
      </nav>
    </FullRow>
      <LiveCode
        ref={this.liveCode}
        challengeId={this.props.match.params.id}
        aiDefList={this.state.aiDefListTemplate}
        list={this.props.list}
        simQuality={this.props.simQuality}
        simSpeed={this.props.simSpeed}
        isLoading={this.props.isLoading}
        code={this.props.code}
        info={this.state.currentChallenge.description}
        onFinish={(result) => this.onChallengeComplete(result)}
        onCodeChanged={(code) => this.onCodeChanged(code)}
        rngSeed={this.state.currentChallenge.rngSeed}
        timeLimit={this.state.currentChallenge.timeLimit}
        teamMode={this.state.currentChallenge.teamMode}
        modifier={this.state.modifier}
      >
        {congratsScreen}
      </LiveCode>
    </div>;
  }
}

const mapStateToProps = (state) => ({
  list: state.challenge.list,
  simQuality: state.settings.simQuality,
  simSpeed: state.settings.simSpeed,
  isLoading: state.loading.CHALLENGE_CODE,
  code: state.challenge.code
});

const mapDispatchToProps = (dispatch) => ({
  completeChallenge: (challengeId) => {
    dispatch(completeChallenge(challengeId));
  },
  getChallengeCode: (id) => {
    dispatch(getChallengeCode(id));
  },
  updateChallengeCode: (id, code) => {
    dispatch(updateChallengeCode(id, code));
  },
  notifyStatsChallengeComplete: (levelId) => {
    dispatch(notifyStatsChallengeComplete(levelId));
  },
  notifyStatsChallengeOpen: (levelId) => {
    dispatch(notifyStatsChallengeOpen(levelId));
  },

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChallengeScreen);
