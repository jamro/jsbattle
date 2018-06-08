import FullRow from "../../common/bootstrap/FullRow.js";
import Row from "../../common/bootstrap/Row.js";
import Col from "../../common/bootstrap/Col.js";

export default class WinnerScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  getWinnerName() {
    let result = this.props.result;
    return result.teamMode ? "Team " + result.teamWinner.name : result.tankWinner.fullName;
  }

  getUBD() {
    return this.props.result.ubd;
  }

  getWinnerSkin() {
    return this.props.result.tankWinner.skin;
  }

  getScoreBoardData() {
    let result = this.props.result;
    if(result.teamMode) {
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
    return this.getScoreBoardData()
    .map((tank) => {
      return <tr key={tank.id}>
        <td>{tank.name}</td>
        <td className="text-right">{tank.score.toFixed(2)}</td>
      </tr>;
    });
  }

  render() {
    let previewUrl = "img/tank_skin_" + this.getWinnerSkin() + ".png";
    let ubdUri = 'data:text/plain;base64,' + btoa(this.getUBD());

    let restartButton = <button className="btn btn-secondary btn-lg" onClick={() => this.props.onRestart()}>
      <i className="fa fa-refresh" aria-hidden="true"></i> Next Battle
    </button>;
    let editButton = <button className="btn btn-primary btn-lg" onClick={() => this.props.onEdit()}>
      <i className="fa fa-pencil" aria-hidden="true"></i> Edit AI Script
    </button>;
    if(!this.props.onEdit) {
      editButton = null;
    }
    if(!this.props.onRestart) {
      restartButton = null;
    }

    return <Row>
      <Col lg={4} md={6}>
        <div className="card text-center">
          <div className="card-body">
            <img src={previewUrl} alt="Winner preview" style={{paddingLeft: '50px'}} />
            <div className="caption">
              <h3>{this.getWinnerName()}</h3>
              <p>has won the battle</p>
              {restartButton}
              &nbsp;
              {editButton}
            </div>
          </div>
        </div>
        <div className="card text-white bg-dark" style={{marginTop: '10px'}}>
          <div className="card-body">
            <h5 className="card-title">Ultimate Battle Descriptor</h5>
            <p className="card-text">UBD file contains all the information required to replay the battle later.</p>
            <a href={ubdUri} download="battle.ubd" className="btn btn-light" style={{width: "100%"}}>Download <strong>battle.ubd</strong> file</a>
          </div>
        </div>
      </Col>
      <Col lg={8} md={6}>
        <table className="table">
          <thead>
            <tr>
              <th>Tank Name</th>
              <th className="text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </Col>
    </Row>;
  }
}
