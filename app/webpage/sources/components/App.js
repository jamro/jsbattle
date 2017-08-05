var Row = require('./Row.js');
var Header = require('./header/Header.js');
var ErrorBox = require('./ErrorBox.js');
var Cover = require('./cover/Cover.js');
var DebugView = require('./debugView/DebugView.js');
var ScoreBoard = require('./scoreBoard/ScoreBoard.js');
var Battlefield = require('./Battlefield.js');

module.exports = class App extends React.Component {

  constructor(props) {
    super(props);
    var simSpeed = localStorage.getItem("settings.simSpeed");
    simSpeed = simSpeed ? simSpeed : 1;
    this.renderer = null;
    this.simulation = null;
    this.canvas = null;
    this.state = {
      errorMessage: null,
      simSpeed: simSpeed,
      phase: "loading",
      winner: null,
      timeLeft: 0,
      tankList: []
    };
  }

  componentDidMount() {
    this.buildSimulation();
  }

  startBattle() {
    this.simulation.start();
    this.setState({phase: 'battle'});
  }

  restartBattle() {
    this.setState({phase: 'loading'});
    this.buildSimulation();
  }

  buildSimulation() {
    this.renderer = JsBattle.createRenderer(this.props.renderer);
    this.renderer.loadAssets(() => this.onAssetsLoaded());
  }

  onAssetsLoaded() {
    var self = this;
    this.renderer.init(this.canvas);
    this.simulation = JsBattle.createSimulation(this.renderer);

    this.simulation.onError((msg) => this.showError(msg));
    this.simulation.init(900, 600);

    this.simulation.onRender(() => this.updateTankList());
    this.simulation.setSpeed(this.state.simSpeed);

    this.simulation.onFinish(() => {
      this.updateTankList();

      var winner = null;
      for(var i in self.simulation.tankList) {
        var tank = self.simulation.tankList[i];
        if(!winner || tank.score > winner.score) {
          winner = tank;
        }
      }
      self.setState({timeLeft: self.simulation.timeLimit - self.simulation.timeElapsed});

      self.setState({winner: winner});

      var keepRendering = setInterval(() => {
        self.renderer.preRender();
        self.renderer.postRender();
      }, 30);
      setTimeout(() => {
        clearInterval(keepRendering);
        self.setState({phase: 'winner'});
      }, 500);
    });

    this.setState({phase: 'loading'});

    $.getJSON( "js/tanks/index.json", (data) => {
      data.forEach(function(tankName) {
        self.simulation.addTank(tankName);
        $('#sim-loading').hide();
        $('#sim-start').show();
      });

      self.setState({
        phase: 'start'
      });
      self.updateTankList(true);
    })
    .fail(function() {
      self.showError("Cannot load and parse js/tanks/index.json");
    });
  }

  updateTankList() {
    var tankList = this.simulation.tankList.map((tank) => {
      return {
        id: tank.id,
        name: tank.fullName,
        debug: tank.debugData,
        state: tank.state,
        score: tank.score,
        energy: tank.energy,
      };
    });
    this.setState({tankList: tankList});
  }

  showError(msg) {
    this.setState({errorMessage: msg});
  }

  setSimulationSpeed(v) {
    this.setState({simSpeed: v});
    localStorage.setItem("settings.simSpeed", v);
    if(this.simulation) {
      this.simulation.setSpeed(v);
    }
  }

  render() {
    return <div>
      <Row>
        <Header speed={this.state.simSpeed} onSpeedChange={(v) => this.setSimulationSpeed(v)}/>
      </Row>
      <Row>
        <ErrorBox message={this.state.errorMessage}/>
      </Row>
      <Row>
        <Cover
          phase={this.state.phase}
          onStart={() => this.startBattle()}
          onRestart={() => this.restartBattle()}
          winner={this.state.winner}
          timeLeft={this.state.timeLeft}
        />
      </Row>
      <Row>
        <Battlefield
          ref={(battlefield) => this.canvas = battlefield ? battlefield.canvas : null }
          width="900"
          height="600"
          visible={this.state.phase == "battle"}
        />
      </Row>
      <Row>
        <DebugView
          visible={true}
          tankList={this.state.tankList}
        />
      </Row>
      <Row>
        <ScoreBoard tankList={this.state.tankList} />
      </Row>
    </div>;
  }
};
