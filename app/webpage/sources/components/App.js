var Row = require('./Row.js');
var InfoBox = require('./InfoBox.js');
var Cover = require('./cover/Cover.js');
var DebugView = require('./debugView/DebugView.js');
var ScoreBoard = require('./scoreBoard/ScoreBoard.js');
var Navi = require('./navi/Navi.js');
var Battlefield = require('./Battlefield.js');

module.exports = class App extends React.Component {

  constructor(props) {
    super(props);
    var simSpeed = localStorage.getItem("settings.simSpeed");
    simSpeed = simSpeed ? simSpeed : 1;
    var simQuality = localStorage.getItem("settings.quality");
    simQuality = simQuality ? simQuality : "auto";
    this.renderer = null;
    this.simulation = null;
    this.canvas = null;
    this.tankList = [];
    this.scoreboardRefreshLoop = null;
    this.state = {
      errorMessage: null,
      simSpeed: simSpeed,
      simQuality: simQuality,
      phase: "loading",
      winner: null,
      timeLeft: 0,
      tankList: [],
      quality: 1,
    };
  }

  componentDidMount() {
    this.buildSimulation();
    var self = this;
    self.updateScoreBoard();
  }

  componentWillUnmount() {
    clearTimeout(this.scoreboardRefreshLoop);
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
    this.simulation.setRendererQuality(this.state.simQuality);

    this.simulation.onFinish(() => {
      this.updateTankList();
      this.updateScoreBoard();

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
      self.updateTankList();
      this.updateScoreBoard();
    })
    .fail(function() {
      self.showError("Cannot load and parse js/tanks/index.json");
    });
  }

  updateTankList() {
    this.tankList = this.simulation.tankList.map((tank) => {
      return {
        id: tank.id,
        name: tank.fullName,
        debug: tank.debugData,
        state: tank.state,
        score: tank.score,
        energy: tank.energy,
      };
    });
    this.tankList.sort((a, b) => {
      return b.score - a.score;
    });
    for(var rank=0; rank < this.tankList.length; rank++) {
      this.tankList[rank].rank = rank;
    }
  }

  updateScoreBoard() {
    this.setState({tankList: this.tankList});
    var refreshTime = Math.round(300 + 1700*(1-this.renderer.quality));
    this.setState({quality: this.renderer.quality});
    var self = this;
    this.scoreboardRefreshLoop = setTimeout(() => {
      self.scoreboardRefreshLoop = null;
      self.updateScoreBoard();
    }, refreshTime);
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

  setSimulationQuality(v) {
    this.setState({simQuality: v});
    localStorage.setItem("settings.quality", v);
    if(this.simulation) {
      this.simulation.setRendererQuality(v);
    }
  }

  render() {
    var scoreboard = <Row>
      <ScoreBoard tankList={this.state.tankList} />
    </Row>;
    var debugView = <Row>
      <DebugView
        visible={true}
        tankList={this.state.tankList}
      />
    </Row>
    var fpsWarn = <Row><InfoBox
      message="Animation refresh rate was reduced to increase speed of the battle and reserve it more of CPU time"
      title="FPS reduced"
      level="warning"
    /></Row>;
    if(this.state.phase == 'battle' && this.state.quality <= 0.05) {
      scoreboard = <Row><InfoBox message="Scoreboard hidden to improve performance of battle simulation" title=" " level="info"/></Row>;
      debugView = <Row><InfoBox message="Debug View hidden to improve performance of battle simulation" title=" " level="info"/></Row>;
    }
    if(this.state.quality >= 0.3 || this.state.phase != 'battle') {
      fpsWarn = null;
    }
    return <div>
      <Navi
        speed={this.state.simSpeed}
        quality={this.state.simQuality}
        onSpeedChange={(v) => this.setSimulationSpeed(v)}
        onQualityChange={(v) => this.setSimulationQuality(v)}
      />
      <Row>
        <InfoBox message={this.state.errorMessage} level="danger"/>
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
      {fpsWarn}
      {debugView}
      {scoreboard}
    </div>;
  }
};
