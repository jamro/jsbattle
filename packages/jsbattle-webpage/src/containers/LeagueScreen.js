import FullRow from "../components/FullRow.js";
import Loading from "../components/Loading.js";
import LeagueJoin from "../components/LeagueJoin.js";
import React from "react";
import {connect} from 'react-redux';
import {
  getSandboxAiScriptList
} from '../actions/sandboxAction.js';
import {
  notifyLeagueOpen,
} from '../actions/statsAction.js';
import {
  getLeagueSummary,
  joinLeague,
  leaveLeague
} from '../actions/leagueAction.js';
import PropTypes from 'prop-types';

export class LeagueScreen extends React.Component {

  componentDidMount() {
    this.props.notifyLeagueOpen();
    this.props.getSandboxAiScriptList(true);
    this.props.getLeagueSummary();
  }

  renderTableRow(item) {
    let isActive = this.props.submission && item.scriptId === this.props.submission.scriptId;
    return <tr key={item.scriptId} className={isActive ? 'table-active' : ''}>
      <td className="text-right">#{item.rank}</td>
      <td className="text-left">{item.ownerName} / {item.scriptName}</td>
      <td className="text-right">{item.fights_total}</td>
      <td className="text-right">{item.fights_win}</td>
      <td className="text-right">{item.fights_lose}</td>
      <td className="text-right"><span className="badge badge-primary"><i className="fas fa-star" style={{marginRight: '1em'}}></i> {item.score}</span></td>
    </tr>;
  }

  render() {
    if(!this.props.isAuthorized) {
      return 'Not authorized';
    }
    if(this.props.isLoading) {
      return <Loading />;
    }

    let rows = this.props.ranktable.map((item) => this.renderTableRow(item));
    if(rows.length == 0) {
      rows = <tr colSpan="6" >
        <td>The league is empty!</td>
      </tr>;
    }
    let leagueJoin;
    if(this.props.isJoining) {
      leagueJoin = <Loading />;
    } else {
      leagueJoin = <LeagueJoin
        selected={this.props.submission}
        tankList={this.props.tankList}
        onJoin={(scriptId, scriptName) => this.props.joinLeague(scriptId, scriptName)}
        onLeave={() => this.props.leaveLeague()}
      />;
    }

    return <div>
      <FullRow>
        {leagueJoin}
      </FullRow>
      <FullRow>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="text-right">Rank</th>
              <th scope="col" className="text-left">Name</th>
              <th scope="col" className="text-right">Fights</th>
              <th scope="col" className="text-right">Won</th>
              <th scope="col" className="text-right">Lost</th>
              <th scope="col" className="text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </FullRow>
    </div>;
  }
}

LeagueScreen.defaultProps = {
  isAuthorized: false,
  tankList: [],
  submission: null,
  ranktable: [],
  isLoading: false,
  isJoining: false,
  getSandboxAiScriptList: () => {},
  getLeagueSummary: () => {},
  joinLeague: () => {},
  leaveLeague: () => {},
  notifyLeagueOpen: () => {},
};

LeagueScreen.propTypes = {
  isAuthorized: PropTypes.bool,
  tankList: PropTypes.array,
  submission: PropTypes.object,
  ranktable: PropTypes.array,
  isLoading: PropTypes.bool,
  isJoining: PropTypes.bool,
  getSandboxAiScriptList: PropTypes.func,
  getLeagueSummary: PropTypes.func,
  joinLeague: PropTypes.func,
  leaveLeague: PropTypes.func,
  notifyLeagueOpen: PropTypes.func,
};
const mapStateToProps = (state) => ({
  isAuthorized: state.auth.profile && (state.auth.profile.role  == 'admin' || state.auth.profile.role  == 'user'),
  tankList: state.aiRepo.tankList,
  submission: state.league.submission,
  ranktable: state.league.ranktable,
  isLoading: state.loading.LEAGUE_SUMMARY,
  isJoining: state.loading.SANDBOX_AI_SCRIPT_LIST || state.loading.LEAGUE_NEW_SUBMISSION || state.loading.LEAGUE_CLEAR_SUBMISSION
});

const mapDispatchToProps = (dispatch) => ({
  getSandboxAiScriptList: (useRemoteService) => {
    dispatch(getSandboxAiScriptList(useRemoteService));
  },
  getLeagueSummary: () => {
    dispatch(getLeagueSummary());
  },
  joinLeague: (scriptId, scriptName) => {
    dispatch(joinLeague(scriptId, scriptName));
  },
  leaveLeague: () => {
    dispatch(leaveLeague());
  },
  notifyLeagueOpen: () => {
    dispatch(notifyLeagueOpen());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueScreen);
