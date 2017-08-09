var FullRow = require('../../common/bootstrap/FullRow.js');
var Row = require('../../common/bootstrap/Row.js');
var Col = require('../../common/bootstrap/Col.js');
var NumericInput = require('../../common/NumericInput.js');

module.exports = class StartScreen extends React.Component {

  constructor(props) {
    super(props);
    var battleSet = localStorage.getItem("settings.battleSet");
    battleSet = battleSet ? JSON.parse(battleSet) : [];
    this.state = {
      loading: true,
      selectedTankList: [],
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
    $.getJSON( "js/tanks/index.json", (tankList) => {
      var battleSet = this.state.battleSet;
      battleSet = battleSet.filter((settings) => {
        return tankList.indexOf(settings.name) != -1;
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
        count: 1
      }));

      battleSet = battleSet.concat(newTanks);
      battleSet = battleSet.sort((a, b) => {
        return this.getDifficulty(a.name) - this.getDifficulty(b.name);
      });

      this.setState({
        loading: false,
        battleSet: battleSet
      });
      this.onSettingsChange();

    })
    .fail(function() {
      this.showError("Cannot load and parse js/tanks/index.json");
    });
  }

  showError(msg) {
    if(this.props.onError) {
      this.props.onError(msg);
    }
  }

  startBattle() {
    var listComplete = this.state.selectedTankList.length >= 2;
    if(!listComplete) return;
    this.props.onStart(this.state.selectedTankList);
  }

  onSettingsChange(tankName, v) {
    var i, j;
    var settings = this.state.battleSet;
    var tankList = [];
    for(i=0; i < settings.length; i++) {
      if(settings[i].name == tankName) {
        settings[i].count = v;
      }
      for(j=0; j < settings[i].count; j++) {
        tankList.push(settings[i].name);
      }
    }
    this.setState({
      selectedTankList: tankList,
      battleSet: settings
    });

    localStorage.setItem("settings.battleSet", JSON.stringify(settings));
  }

  renderLoading() {
    return <span>
      Loading...
    </span>;
  }

  renderSettingRows() {
    return this.state.battleSet
    .map((tank) => {
      var difficultyStars = [];
      var rank = this.getDifficulty(tank.name);
      if(rank) {
        for(var i=0; i < rank; i++) {
          difficultyStars.push(<i key={tank.name + "-" + i} className="fa fa-star" aria-hidden="true"></i>);
        }
      } else {
        difficultyStars = <span>unknown</span>;
      }
      return <tr key={tank.name}>
        <td>{tank.name}</td>
        <td className="text-center">
          {difficultyStars}
        </td>
        <td className="block-right">
          <NumericInput
            className="pull-right"
            defaultValue={tank.count}
            onChange={(v) => this.onSettingsChange(tank.name, v)}
            min={0}
            max={10}
          />
        </td>
      </tr>;
    });
  }

  renderSettings() {
    return <table className="table" >
              <thead>
                <tr>
                  <th>Tank Name</th>
                  <th className="text-center">Difficulty</th>
                  <th className="text-right">Count</th>
                </tr>
              </thead>
              <tbody>
                {this.renderSettingRows()}
              </tbody>
            </table>;
  }

  renderStartButton() {
    var listComplete = this.state.selectedTankList.length >= 2;
    var classNames = "btn btn-primary btn-lg " + (!listComplete ? "disabled" : "");
    return <button type="button" className={classNames} onClick={() => this.startBattle()}>
      <span className="glyphicon glyphicon-play" aria-hidden="true"></span> START
    </button>;
  }

  render() {
    var listComplete = this.state.selectedTankList.length >= 2;
    return <Row>
      <Col lg={4} md={6}>
        <div className="thumbnail text-center">
          <div className="caption">
          <p style={{marginBottom: "5px"}}>Tanks in the battle.</p>
            <h1 style={{fontSize: "100px", marginTop: "0px", paddingTop: "0px"}}>{this.state.selectedTankList.length}</h1>
            <p>{listComplete ? "Press start to begin." : "Add more tanks."}</p>
            {this.renderStartButton()}
          </div>
        </div>
      </Col>
      <Col lg={8} md={6}>
        {!this.state.loading ? this.renderSettings() : this.renderLoading()}
      </Col>
    </Row>;
  }
};
