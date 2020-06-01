import FullRow from "../components/FullRow.js";
import Row from "../components/Row.js";
import Col from "../components/Col.js";
import Loading from "../components/Loading.js";
import LeagueJoin from "../components/LeagueJoin.js";
import LeagueHistory from "../components/LeagueHistory.js";
import React from "react";
import {Link} from 'react-router-dom';
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
import {
  wsConnect,
  wsDisconnect
} from '../actions/wsAction.js';
import PropTypes from 'prop-types';

export class LeagueScreen extends React.Component {

  componentDidMount() {
    this.props.notifyLeagueOpen();
    this.props.getSandboxAiScriptList(true);
    this.props.getLeagueSummary();
    this.props.wsConnect();
  }

  componentWillUnmount() {
    this.props.wsDisconnect();
  }

  renderTableRow(item) {
    let isActive = this.props.submission && item.scriptId === this.props.submission.scriptId;
    return <tr key={item.scriptId} className={isActive ? 'table-active' : ''}>
      <td className="text-right">#{item.rank}</td>
      <td className="text-left">{item.ownerName} / {item.scriptName}</td>
      <td className="text-right">{item.fights_total}</td>
      <td className="text-right">{item.fights_win}</td>
      <td className="text-right">{item.fights_lose}</td>
      <td className="text-right"><span className="badge badge-danger"><i className="fas fa-star" style={{marginRight: '1em'}}></i> {item.score}</span></td>
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
        <nav className="breadcrumb-container">
          <ol className="breadcrumb">
            <li style={{marginRight: '0.5em'}}><i className="fas fa-angle-right"></i></li>
            <li className="breadcrumb-item"><Link to="/league">League</Link></li>
          </ol>
        </nav>
      </FullRow>
      <div className="jumbotron" style={{padding: '2rem'}}>
        <Row>
          <Col lg={4} style={{paddingTop: '0.5em'}}>
            {leagueJoin}
          </Col>
          <Col lg={8} style={{paddingTop: '0.5em'}}>
            <LeagueHistory
              data={this.props.leagueHistory}
              selectedId={this.props.submission ? this.props.submission.id : ''}
            />
          </Col>
        </Row>
      </div>
      <FullRow>
        <h1 className="display-4">Leaderboard</h1>
        <table className="table leaderboard">
          <thead className="thead-dark">
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
  leagueHistory: [],
  isLoading: false,
  isJoining: false,
  getSandboxAiScriptList: () => {},
  getLeagueSummary: () => {},
  joinLeague: () => {},
  leaveLeague: () => {},
  notifyLeagueOpen: () => {},
  wsConnect: () => {},
  wsDisconnect: () => {},
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
  wsConnect: PropTypes.func,
  wsDisconnect: PropTypes.func,
  leagueHistory: PropTypes.array
};
const mapStateToProps = (state) => ({
  isAuthorized: state.auth.profile && (state.auth.profile.role  == 'admin' || state.auth.profile.role  == 'user'),
  tankList: state.aiRepo.tankList,
  submission: state.league.submission,
  ranktable: state.league.ranktable,
  leagueHistory: state.league.history,
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
  },
  wsConnect: () => {
    dispatch(wsConnect());
  },
  wsDisconnect: () => {
    dispatch(wsDisconnect());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeagueScreen);
