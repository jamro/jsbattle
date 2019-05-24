import Row from "../../common/bootstrap/Row.js";
import Col from "../../common/bootstrap/Col.js";
import BattleShareLink from "./BattleShareLink.js";

let config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
};

export default class WinnerScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  getWinnerName() {
    let result = this.props.result;
    return result.teamMode
      ? "Team " + result.teamWinner.name
      : result.tankWinner.fullName;
  }

  getWinnerSkin() {
    return this.props.result.tankWinner.skin;
  }

  getScoreBoardData() {
    let result = this.props.result;
    console.log(result.tankList);
    axios.post(
      "https://hooks.slack.com/services/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",
      {
        text: "Flavio"
      },
      config
    );
    if (result.teamMode) {
      return result.teamList
        .sort((a, b) => b.score - a.score)
        .map((team) => ({
          id: team.name,
          name: team.name,
          score: team.score
        }));
    } else {
      return result.tankList
        .sort((a, b) => b.score - a.score)
        .map((tank) => ({
          id: tank.id,
          name: tank.fullName,
          score: tank.score
        }));
    }
  }

  renderRows() {
    return this.getScoreBoardData().map((tank) => {
      return (
        <tr key={tank.id}>
          <td className="battle-result-name">{tank.name}</td>
          <td className="battle-result-score text-right">
            {tank.score.toFixed(2)}
          </td>
        </tr>
      );
    });
  }

  render() {
    let previewUrl = "img/tank_skin_" + this.getWinnerSkin() + ".png";

    let restartButton = (
      <button
        className="btn btn-secondary btn-lg restart-battle"
        onClick={() => this.props.onRestart()}
      >
        <i className="fas fa-sync" aria-hidden="true" /> Next Battle
      </button>
    );
    let editButton = (
      <button
        className="btn btn-primary btn-lg"
        onClick={() => this.props.onEdit()}
      >
        <i className="fas fa-pen" aria-hidden="true" /> Edit AI Script
      </button>
    );
    if (!this.props.onEdit) {
      editButton = null;
    }
    if (!this.props.onRestart) {
      restartButton = null;
    }

    return (
      <Row>
        <Col lg={4} md={6}>
          <div className="card text-center">
            <div className="card-body">
              <img
                src={previewUrl}
                alt="Winner preview"
                style={{paddingLeft: "50px"}}
              />
              <div className="caption">
                <h3 className="winner-name">{this.getWinnerName()}</h3>
                <p>has won the battle</p>
                {restartButton}
                &nbsp;
                {editButton}
              </div>
            </div>
          </div>
          <BattleShareLink
            shareLink={this.props.shareLink}
            onShare={(done) => this.props.onShare(done)}
          />
        </Col>
        <Col lg={8} md={6}>
          <table className="table">
            <thead>
              <tr>
                <th>Tank Name</th>
                <th className="text-right">Score</th>
              </tr>
            </thead>
            <tbody>{this.renderRows()}</tbody>
          </table>
        </Col>
      </Row>
    );
  }
}
