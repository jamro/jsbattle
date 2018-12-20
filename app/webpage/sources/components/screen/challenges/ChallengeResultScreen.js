import FullRow from "../../common/bootstrap/FullRow.js";
import Row from "../../common/bootstrap/Row.js";
import Col from "../../common/bootstrap/Col.js";

export default class ChallengeResultScreen extends React.Component {

  constructor(props) {
    super(props);
  }


  renderWinner() {
    return <div className="jumbotron text-center">
      <h1 className="display-4 congrats-msg result-msg">Congrats!</h1>
      <p>
        <i className="fas fa-trophy fa-10x"></i>
      </p>
      <p className="lead">Good job! You did it! Now try something more difficult - the next challenge is waiting for you.</p>
      <button onClick={() => this.props.onNextChallenge()} className="btn btn-primary btn-lg next-challenge" href="#" role="button">
        Next Challenge
        &nbsp;
        <i className="fas fa-play"></i>
      </button>
    </div>;
  }

  renderLoser() {
    return <div className="jumbotron text-center">
      <h1 className="display-4 defeat-msg result-msg">Defeated!</h1>
      <p className="lead">Ops! Something went wrong! You have been beaten by more powerful AI. Improve your code and get back here to achieve the victory!</p>
      <button onClick={() => this.props.onRetry()} className="btn btn-primary btn-lg retry-challenge" href="#" role="button">
        <i className="fas fa-redo"></i>
        &nbsp;
        Try Again
      </button>
    </div>;
  }

  render() {
    if(this.props.battleWon) {
        return this.renderWinner();
    } else  {
        return this.renderLoser();
    }

  }
}
