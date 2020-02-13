import React from "react";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import FullRow from '../components/FullRow.js';
import Stats from '../lib/Stats.js';

class ChallengeListScreen extends React.Component {

  componentDidMount() {
    Stats.onChallengesList();
  }

  render() {
    let challengeList = this.props.list || [];
    challengeList.sort((a, b) => a.level - b.level);
    let completedThreshold = challengeList.length > 0 ? challengeList[0].level: 0;
    for(let i=0; i < challengeList.length; i++) {
      if(challengeList[i].isCompleted) {
        completedThreshold = Math.max(completedThreshold, challengeList[i].level+1);
      }
    }
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
        { challenge.level <= completedThreshold ? startButton : disabledButton }
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
  list: state.challenge.list
});

const mapDispatchToProps = () => ({

});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChallengeListScreen);
