export default class ChallengesListScreen extends React.Component {

  openChallenge(id) {
    this.props.onChallengeOpen(id);
  }

  render() {
    let challengeList = this.props.list;
    challengeList.sort((a, b) => a.level - b.level);
    let completedThreshold = challengeList[0].level;
    for(let i=0; i < challengeList.length; i++) {
      if(challengeList[i].isCompleted) {
        completedThreshold = Math.max(completedThreshold, challengeList[i].level+1);
      }
    }
    let items = challengeList.map((challenge) => {
      let completeBadge = <span className="badge badge-secondary completed-badge"><i className="fa fa-check" aria-hidden="true"></i> Completed</span>;
      let startButton = <button type="button" className="btn btn-primary btn-small start-challenge" onClick={() => this.openChallenge(challenge.id)}>
        <i className="fas fa-play"></i>
      </button>;
      let disabledButton = <button type="button" className="btn btn-secondary btn-small start-challenge" disabled>
        <i className="fas fa-play"></i>
      </button>;
      return <li className="list-group-item d-flex justify-content-between align-items-center challenge-list-item">
        <div style={{width: '50%'}}>Level {challenge.level}: <strong>{challenge.name}</strong></div>
        { challenge.isCompleted ? completeBadge : null }
        { challenge.level <= completedThreshold ? startButton : disabledButton }
      </li>;
    });
    return <div>
      <ul className="list-group challenge-list">
        {items}
      </ul>
    </div>;
  }
}
