import Row from "../../common/bootstrap/Row.js";
import Col from "../../common/bootstrap/Col.js";
import TankTableRow from "../../common/TankTableRow.js";

export default class StartScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ubdErrorMessage: null
    };
  }

  getDifficulty(tankName) {
    let difficultyMap = {};
    difficultyMap.dummy = 1;
    difficultyMap.crazy = 1;
    difficultyMap.crawler = 1;
    difficultyMap.chicken = 2;
    difficultyMap.sniper = 2;
    difficultyMap.dodge = 2;
    difficultyMap.kamikaze = 3;
    difficultyMap.jamro = 3;

    if(difficultyMap[tankName]) return difficultyMap[tankName];
    return 0;
  }

  showError(msg) {
    if(this.props.onError) {
      this.props.onError(msg);
    }
  }

  startBattle() {
    let listComplete = this.getTankCount() >= 2;
    if(!listComplete) return;
    this.props.onStart(this.props.battleSet.getAiDefList(this.props.aiRepository), this.props.teamMode, Math.random());
  }

  onTeamModeChange() {
    this.setState((prevState) => {
      let teamMode = !prevState.teamMode;
      localStorage.setItem("settings.teamMode", teamMode ? 'true' : 'false');

      this.props.onTeamModeToggle(teamMode);

      return {teamMode: teamMode};
    });
  }

  getTankCount() {
    return this.props.battleSet.getTankCount();
  }

  renderSettingRows() {
    return this.props.battleSet
    .map((tank) => {
      return <TankTableRow
        key={tank.name}
        name={tank.name}
        count={tank.count}
        onChange={(v) => this.props.onTankAssign(tank.name, v)}
        difficulty={this.getDifficulty(tank.name)}
        onEdit={tank.userCreated ? (name) => this.props.onScriptEdit(name) : null}
        onDelete={tank.userCreated ? (name) => this.props.onTankDelete(name) : null}
      />;
    });
  }

  renderSettings() {
    return <div>
      <button type="button" className="btn btn-success btn-lg float-right create-tank" onClick={() => this.props.onTankCreate()} style={{margin: "15px"}}>
        <i className="fas fa-plus-circle" aria-hidden="true"></i> Create Tank
      </button>
      <table className="table tank-table" >
        <thead>
          <tr>
            <th>Tank Name</th>
            <th className="text-center">Difficulty</th>
            <th className="text-right" style={{width: '90px'}}>&nbsp;</th>
            <th className="text-center" style={{width: '180px'}}>Count</th>
          </tr>
        </thead>
        <tbody>
          {this.renderSettingRows()}
        </tbody>
      </table>
    </div>;
  }

  renderStartButton() {
    let listComplete = this.getTankCount() >= 2;
    let classNames = "start-battle btn btn-primary btn-lg " + (!listComplete ? "disabled" : "");
    return <button type="button" className={classNames} onClick={() => this.startBattle()}>
      <i className="fas fa-play" aria-hidden="true"></i> START
    </button>;
  }

  render() {
    let listComplete = this.getTankCount() >= 2;

    return <Row>
      <Col lg={4} md={5}>
        <div className="card">
          <div className="card-body text-center">
            <p style={{marginBottom: "5px"}}>Tanks in the battle.</p>
            <h1 className="tank-counter" style={{fontSize: "100px", marginTop: "0px", paddingTop: "0px"}}>{this.getTankCount()}</h1>
            <p>{listComplete ? "Press start to begin." : "Add more tanks."}</p>
            {this.renderStartButton()}
          </div>
          <div className="card-footer" style={{padding: '5px'}}>
            <div className="checkbox" style={{margin: "0px"}}>
             <label>
               <input type="checkbox" checked={this.props.teamMode} onChange={() => this.onTeamModeChange()} style={{margin: "0px 5px"}} />
               Enable <strong>Team Mode</strong> for tanks of the same type
             </label>
           </div>
          </div>
        </div>
      </Col>
      <Col lg={8} md={7}>
        {this.renderSettings()}
      </Col>
    </Row>;
  }
}
