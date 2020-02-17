import React from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import FullRow from '../components/FullRow.js';
import Loading from '../components/Loading.js';
import {
  getChallengeList
} from '../actions/challengeAction.js';
import {
  notifyChallengesListOpen
} from '../actions/statsAction.js';
class ChallengeListScreen extends React.Component {

  componentDidMount() {
    this.props.notifyChallengesListOpen();
    this.props.getChallengeList();
  }

  render() {
    if(this.props.isLoading) {
      return <Loading />;
    }
    let challengeList = this.props.list || [];
    let items = challengeList.map((challenge) => {
      let completeBadge = <span className="badge badge-secondary completed-badge"><i className="fa fa-check" aria-hidden="true"></i> Completed</span>;
      let startButton = <Link to={'/challenge/' + challenge.id} className="start-challenge">
        <button type="button" className="btn btn-primary btn-small">
          <i className="fas fa-play"></i>
        </button>
      </Link>;
      let disabledButton = <button type="button" className="btn btn-secondary btn-small start-challenge" disabled>
        <i className="fas fa-play"></i>
      </button>;
      return <li key={challenge.id} className="list-group-item d-flex justify-content-between align-items-center challenge-list-item">
        <div style={{width: '50%'}}>Level {challenge.level}: <strong>{challenge.name}</strong></div>
        { challenge.isCompleted ? completeBadge : null }
        { challenge.isUnlocked ? startButton : disabledButton }
      </li>;
    });
    return <div>
      <FullRow>
        <nav className="breadcrumb-container">
          <ol className="breadcrumb">
            <li style={{marginRight: '0.5em'}}><i className="fas fa-angle-right"></i></li>
            <li className="breadcrumb-item"><Link to="/challenge">Challenges</Link></li>
          </ol>
        </nav>
      </FullRow>
      <FullRow>
        <ul className="list-group challenge-list">
          {items}
        </ul>
      </FullRow>
    </div>;
  }
}
const mapStateToProps = (state) => ({
  list: state.challenge.list,
  isLoading: state.loading.CHALLENGE_LIST,
});

const mapDispatchToProps = (dispatch) => ({
  notifyChallengesListOpen: () => {
    dispatch(notifyChallengesListOpen());
  },
  getChallengeList: () => {
    dispatch(getChallengeList());
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChallengeListScreen);
