var FullRow = require('../../common/bootstrap/FullRow.js');
var Row = require('../../common/bootstrap/Row.js');
var Col = require('../../common/bootstrap/Col.js');
var NumericInput = require('../../common/NumericInput.js');
var Loading = require('../../common/Loading.js');
var TankTableRow = require('./TankTableRow.js');

module.exports = class StartScreen extends React.Component {

  constructor(props) {
    super(props);
    var battleSet = localStorage.getItem("settings.battleSet");
    battleSet = battleSet ? JSON.parse(battleSet) : [];
    this.state = {
      loading: true,
      aiDefList: [],
      battleSet: battleSet,
    };
    this.difficultyMap = {};
    this.difficultyMap.dummy = 1;
    this.difficultyMap.crazy = 1;
    this.difficultyMap.crawler = 1;
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
    var self = this;
    $.getJSON( "tanks/index.json", (tankList) => {
      var userTankNames = this.props.aiRepository.getScriptNameList();
      this.props.aiRepository.reserveName(tankList);

      var battleSet = this.state.battleSet;
      var allTanks = tankList.concat(userTankNames);
      battleSet = battleSet.filter((settings) => {
        return allTanks.indexOf(settings.name) != -1;
      });

      var newTanks = tankList
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

      var userTanks = userTankNames
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
    .fail(function() {
      self.showError("Cannot load and parse tanks/index.json");
    });
  }

  showError(msg) {
    if(this.props.onError) {
      this.props.onError(msg);
    }
  }

  startBattle() {
    var listComplete = this.state.aiDefList.length >= 2;
    if(!listComplete) return;
    this.props.onStart(this.state.aiDefList);
  }

  onSettingsChange(tankName, v) {
    var i, j;
    var battleSet = this.state.battleSet;
    for(i=0; i < battleSet.length; i++) {
      if(battleSet[i].name == tankName) {
        battleSet[i].count = v;
      }
    }
    this.refreshTankList(battleSet);
  }

  refreshTankList(battleSet) {
    var i, j;
    var aiDefList = [];
    for(i=0; i < battleSet.length; i++) {
      for(j=0; j < battleSet[i].count; j++) {
        var aiDef = JsBattle.createAiDefinition();
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
    var battleSet = this.state.battleSet;
    var name = this.props.aiRepository.getRandomScriptName(true);
    var retry = 0;
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
      var diff = this.getDifficulty(a.name) - this.getDifficulty(b.name);
      if(diff != 0) {
        return diff;
      } else {
        return a.name.localeCompare(b.name);
      }
    });
  }

  deleteTank(name) {
    var battleSet = this.state.battleSet.filter((item) => {
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

  renderSettings() {
    return <div>
      <button type="button" className="btn btn-success btn-lg pull-right" onClick={() => this.createTank()}>
        <i className="fa fa-plus-circle" aria-hidden="true"></i> Create Tank
      </button>
      <table className="table" >
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
    var listComplete = this.state.aiDefList.length >= 2;
    var classNames = "btn btn-primary btn-lg " + (!listComplete ? "disabled" : "");
    return <button type="button" className={classNames} onClick={() => this.startBattle()}>
      <span className="glyphicon glyphicon-play" aria-hidden="true"></span> START
    </button>;
  }

  render() {
    var listComplete = this.state.aiDefList.length >= 2;
    var content = <Row>
      <Col lg={4} md={5}>
        <div className="thumbnail text-center">
          <div className="caption">
          <p style={{marginBottom: "5px"}}>Tanks in the battle.</p>
            <h1 style={{fontSize: "100px", marginTop: "0px", paddingTop: "0px"}}>{this.state.aiDefList.length}</h1>
            <p>{listComplete ? "Press start to begin." : "Add more tanks."}</p>
            {this.renderStartButton()}
          </div>
        </div>
      </Col>
      <Col lg={8} md={7}>
        {this.renderSettings()}
      </Col>
    </Row>;
    return !this.state.loading ? content : this.renderLoading();
  }
};
