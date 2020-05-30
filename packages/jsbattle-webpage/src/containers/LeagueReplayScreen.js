import FullRow from "../components/FullRow.js";
import Loading from "../components/Loading.js";
import React from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import JsBattleBattlefield from "jsbattle-react";
import JsBattle from "jsbattle-engine";
import {
  getLeagueReplay
} from '../actions/leagueAction.js';
import {
  showError
} from '../actions/coreAction.js';


export class LeagueReplayScreen extends React.Component {

  constructor(props) {
    super(props);
    this.battlefield = null;
  }

  componentDidMount() {
    this.props.getLeagueReplay(this.props.match.params.id);
  }

  handleBattleFinish() {
    console.log('battle finished');
    if(this.battlefield) {
      setTimeout(() => {
        this.battlefield.restart();
        console.log('battle started');
      }, 1000);
    }
  }

  handleBattleError(error) {
    this.props.showError(error);
  }

  render() {
    if(!this.props.isAuthorized) {
      return 'Not authorized';
    }
    if(this.props.isLoading) {
      return <Loading />;
    }

    let label;
    if(this.props.result.length == 2) {
      const name1 = this.props.result[0].name.replace(/(.*)\/(.*)/g, '$1 ($2)');
      const name2 = this.props.result[1].name.replace(/(.*)\/(.*)/g, '$1 ($2)');
      label = <span>{name1} vs {name2}</span>;
    } else {
      label = "Replay";
    }
    let battlefield;
    if(this.props.aiList.length) {
      let ai;
      let aiDefList = [];
      for(let aiDef of this.props.aiList) {
        ai = JsBattle.createAiDefinition();
        ai.fromJSON(aiDef);
        aiDefList.push(ai);
      }
      battlefield = <JsBattleBattlefield
        ref={(b) => this.battlefield = b }
        debug={this.props.debug}
        autoResize={true}
        rngSeed={this.props.rngSeed}
        timeLimit={this.props.timeLimit}
        teamMode={this.props.teamMode}
        speed={this.props.simSpeed}
        quality={this.props.simQuality}
        renderer={this.props.renderer}
        aiDefList={aiDefList}
        onFinish={(result) => this.handleBattleFinish(result)}
        onError={(error) => this.handleBattleError(error)}
      />;
    }
    return <div>
      <FullRow>
        <nav className="breadcrumb-container">
          <ol className="breadcrumb">
            <li style={{marginRight: '0.5em'}}><i className="fas fa-angle-right"></i></li>
            <li className="breadcrumb-item"><Link to="/league">League</Link></li>
            <li className="breadcrumb-item" aria-current="page">{label}</li>
          </ol>
          <a href="#/league" className="btn btn-sm btn-primary">
            <i className="fas fa-reply"></i> Back
          </a>
        </nav>
      </FullRow>
      <FullRow>
        <div style={{maxWidth: '900px', margin: 'auto'}}>
          {battlefield}
        </div>
      </FullRow>
    </div>;
  }
}

LeagueReplayScreen.defaultProps = {
  debug: false,
  isAuthorized: false,
  isLoading: false,
  rngSeed: 0,
  teamMode: true,
  timeLimit: 10000,
  result: [],
  aiList: [],
  simQuality: 'auto',
  simSpeed: 1,
  renderer: "brody",
  getLeagueReplay: () => {},
  showError: () => {}
};

LeagueReplayScreen.propTypes = {
  debug: PropTypes.bool,
  isAuthorized: PropTypes.bool,
  isLoading: PropTypes.bool,
  result: PropTypes.array,
  aiList: PropTypes.array,
  timeLimit: PropTypes.number,
  teamMode: PropTypes.bool,
  simSpeed: PropTypes.number,
  renderer: PropTypes.string,
  getLeagueReplay: PropTypes.func,
  showError: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthorized: state.auth.profile && (state.auth.profile.role  == 'admin' || state.auth.profile.role  == 'user'),
  result: state.league.replay.result || [],
  aiList: state.league.replay.aiList || [],
  rngSeed: state.league.replay.rngSeed,
  timeLimit: state.league.replay.timeLimit,
  teamMode: state.league.replay.teamMode,
  simQuality: state.settings.simQuality,
  simSpeed: state.settings.simSpeed,
});

const mapDispatchToProps = (dispatch) => ({
  getLeagueReplay: (replayId) => {
    dispatch(getLeagueReplay(replayId));
  },
  showError: (msg) => {
    dispatch(showError(msg));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueReplayScreen);
