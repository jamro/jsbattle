var FullRow = require('../../common/bootstrap/FullRow.js');
var Row = require('../../common/bootstrap/Row.js');
var Col = require('../../common/bootstrap/Col.js');

module.exports = class WinnerScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  renderRows() {
    return this.props.result.tankList
    .sort((a, b) => b.score - a.score)
    .map((tank) => {
      return <tr key={tank.id}>
        <td>{tank.fullName}</td>
        <td className="text-right">{tank.score.toFixed(2)}</td>
      </tr>;
    });
  }

  render() {
    var previewUrl = "img/tank_skin_" + this.props.result.winner.skin + ".png";


    var restartButton = <button className="btn btn-default btn-lg" onClick={() => this.props.onRestart()}>
      <i className="fa fa-refresh" aria-hidden="true"></i> Next Battle
    </button>;
    var editButton = <button className="btn btn-primary btn-lg" onClick={() => this.props.onEdit()}>
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
        <div className="thumbnail text-center">
          <img src={previewUrl} alt="Winner preview" style={{paddingLeft: '50px'}} />
          <div className="caption">
            <h3>{this.props.result.winner.fullName}</h3>
            <p>has won the battle</p>
            {restartButton}
            &nbsp;
            {editButton}
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
};
