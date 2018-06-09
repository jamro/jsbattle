import FullRow from "../../common/bootstrap/FullRow.js";
import Row from "../../common/bootstrap/Row.js";
import Col from "../../common/bootstrap/Col.js";
import NumericInput from "../../common/NumericInput.js";
import Loading from "../../common/Loading.js";
import TankTableRow from "./TankTableRow.js";

export default class StartScreen extends React.Component {

  constructor(props) {
    super(props);
    let teamMode;
    let battleSet;
    if(!props.stateless) {
      teamMode = localStorage.getItem("settings.teamMode");
      battleSet = localStorage.getItem("settings.battleSet");
    }
    teamMode = (teamMode == 'true');
    battleSet = battleSet ? JSON.parse(battleSet) : [];
    this.state = {
      loading: true,
      aiDefList: [],
      battleSet: battleSet,
      teamMode: teamMode,
      ubdErrorMessage: null
    };
    this.difficultyMap = {};
    this.difficultyMap.dummy = 1;
    this.difficultyMap.crazy = 1;
    this.difficultyMap.crawler = 1;
    this.difficultyMap.chicken = 2;
    this.difficultyMap.sniper = 2;
    this.difficultyMap.dodge = 2;
    this.difficultyMap.kamikaze = 3;
    this.difficultyMap.jamro = 3;
  }

  getDifficulty(tankName) {
    if(this.difficultyMap[tankName]) return this.difficultyMap[tankName];
    return 0;
  }

  componentDidMount() {
    let self = this;
    $.getJSON( "tanks/index.json", (tankList) => {
      let userTankNames = this.props.aiRepository.getScriptNameList();
      this.props.aiRepository.reserveName(tankList);

      let battleSet = this.state.battleSet;
      let allTanks = tankList.concat(userTankNames);
      battleSet = battleSet.filter((settings) => {
        return allTanks.indexOf(settings.name) != -1;
      });

      let newTanks = tankList
      .filter((value, index, self) => self.indexOf(value) === index)
      .filter((tankName) => {
        return battleSet.find((settings) => {
          return settings.name == tankName;
        }) ? false : true;
      })
      .map((name) => ({
        name: name,
        count: 1,
        userCreated: false
      }));

      let userTanks = userTankNames
      .filter((tankName) => {
        return battleSet.find((settings) => {
          return settings.name == tankName;
        }) ? false : true;
      })
      .map((name) => ({
        name: name,
        count: 1,
        userCreated: true
      }));

      battleSet = battleSet.concat(newTanks).concat(userTanks);
      battleSet = self.sortBattleSet(battleSet);

      self.setState({
        loading: false
      });
      self.refreshTankList(battleSet);
      if(this.props.fastForward) {
        self.startBattle();
      }
    })
    .fail(() => {
      self.showError("Cannot load and parse tanks/index.json");
    });
  }

  showError(msg) {
    if(this.props.onError) {
      this.props.onError(msg);
    }
  }

  startBattle() {
    let listComplete = this.state.aiDefList.length >= 2;
    if(!listComplete) return;
    this.props.onStart(this.state.aiDefList, {teamMode: this.state.teamMode, rngSeed: Math.random()});
  }

  onSettingsChange(tankName, v) {
    let i;
    let battleSet = this.state.battleSet;
    for(i=0; i < battleSet.length; i++) {
      if(battleSet[i].name == tankName) {
        battleSet[i].count = v;
      }
    }
    this.refreshTankList(battleSet);
  }

  onTeamModeChange() {
    this.setState((prevState, props) => {
      let teamMode = !prevState.teamMode;
      localStorage.setItem("settings.teamMode", teamMode ? 'true' : 'false');
      return {teamMode: teamMode};
    });
  }

  refreshTankList(battleSet) {
    let i, j;
    let aiDefList = [];
    for(i=0; i < battleSet.length; i++) {
      for(j=0; j < battleSet[i].count; j++) {
        let aiDef = JsBattle.createAiDefinition();
        if(battleSet[i].userCreated) {
          aiDef.fromCode(battleSet[i].name, this.props.aiRepository.getCompiledScript(battleSet[i].name));
        } else {
          aiDef.fromFile(battleSet[i].name);
        }
        aiDefList.push(aiDef);
      }
    }
    this.setState({
      aiDefList: aiDefList,
      battleSet: battleSet
    });
    localStorage.setItem("settings.battleSet", JSON.stringify(battleSet));
  }

  createTank() {
    let battleSet = this.state.battleSet;
    let name = this.props.aiRepository.getRandomScriptName(true);
    let retry = 0;
    while(!this.props.aiRepository.isNameAllowed(name)) {
      name = this.props.aiRepository.getRandomScriptName(false);
      retry++;
      if(retry > 100) {
        throw "Cannot find unique name for the script";
      }
    }
    battleSet.push({
      name: name,
      count: 1,
      userCreated: true
    });
    battleSet = this.sortBattleSet(battleSet);
    this.props.aiRepository.createScript(name);
    this.refreshTankList(battleSet);

  }

  sortBattleSet(battleSet) {
    return battleSet.sort((a, b) => {
      let diff = this.getDifficulty(a.name) - this.getDifficulty(b.name);
      if(diff != 0) {
        return diff;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  }

  deleteTank(name) {
    let battleSet = this.state.battleSet.filter((item) => {
      return item.name != name;
    });
    this.props.aiRepository.deleteScript(name);
    this.refreshTankList(battleSet);
  }

  renderLoading() {
    return <FullRow><Loading /></FullRow>;
  }

  renderSettingRows() {
    return this.state.battleSet
    .map((tank) => {
      return <TankTableRow
        key={tank.name}
        name={tank.name}
        count={tank.count}
        onChange={(v) => this.onSettingsChange(tank.name, v)}
        difficulty={this.getDifficulty(tank.name)}
        onEdit={tank.userCreated ? (name) => this.props.onScriptEdit(name) : null}
        onDelete={tank.userCreated ? (name) => this.deleteTank(name) : null}
      />;
    });
  }

  onUbdLoad(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    let self = this;
    reader.onload = function (e) {
      let content = e.target.result;
      let descriptor = JsBattle.createUBD();
      try {
        content = content.split("base64,")[1];
        content = atob(content);
        descriptor.decode(content);
      } catch (err) {
        console.log(err);
        self.setState({
          ubdErrorMessage: "Error! Cannot parse *.UBD file!",
          rngSeed: Math.random()
        });
        return;
      }
      self.setState({
        ubdErrorMessage: null
      });
      self.props.onStart(
        descriptor.getAiList(),
        {
          teamMode: descriptor.getTeamMode(),
          rngSeed: descriptor.getRngSeed()
        }
      );
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  renderSettings() {
    return <div>
      <button type="button" className="btn btn-success btn-lg pull-right create-tank" onClick={() => this.createTank()} style={{margin: "15px"}}>
        <i className="fa fa-plus-circle" aria-hidden="true"></i> Create Tank
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
    let listComplete = this.state.aiDefList.length >= 2;
    let classNames = "start-battle btn btn-primary btn-lg " + (!listComplete ? "disabled" : "");
    return <button type="button" className={classNames} onClick={() => this.startBattle()}>
      <i className="fa fa-play" aria-hidden="true"></i> START
    </button>;
  }

  render() {
    let listComplete = this.state.aiDefList.length >= 2;
    let ubdError = <div className="alert alert-danger" role="alert" style={{marginTop: "5px"}}>
      <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {this.state.ubdErrorMessage}
    </div>;
    if(!this.state.ubdErrorMessage) {
      ubdError = null;
    }

    let content = <Row>
      <Col lg={4} md={5}>
        <div className="card">
          <div className="card-body text-center">
            <p style={{marginBottom: "5px"}}>Tanks in the battle.</p>
            <h1 className="tank-counter" style={{fontSize: "100px", marginTop: "0px", paddingTop: "0px"}}>{this.state.aiDefList.length}</h1>
            <p>{listComplete ? "Press start to begin." : "Add more tanks."}</p>
            {this.renderStartButton()}
          </div>
          <div className="card-footer" style={{padding: '5px'}}>
            <div className="checkbox" style={{margin: "0px"}}>
             <label>
               <input type="checkbox" checked={this.state.teamMode} onChange={() => this.onTeamModeChange()} style={{margin: "0px 5px"}} />
               Enable <strong>Team Mode</strong> for tanks of the same type
             </label>
           </div>
          </div>
        </div>
        <div className="card text-white bg-dark" style={{marginTop: '10px'}}>
          <div className="card-body">
            <h5 className="card-title">Ultimate Battle Descriptor</h5>
            <p className="card-text">
              UBD files contain all the information required to replay the battle. If you have an *.UBD file,
              load it here to re-watch the competition.
              <input
                onChange={(e) => this.onUbdLoad(e)}
                className="btn btn-light"
                style={{marginTop: "20px", width: "100%"}}
                type="file" id="ubdUpload"
                name="ubdFile"
                accept=".ubd"
              />
              {ubdError}
            </p>
          </div>
        </div>
      </Col>
      <Col lg={8} md={7}>
        {this.renderSettings()}
      </Col>
    </Row>;
    return !this.state.loading ? content : this.renderLoading();
  }
}
