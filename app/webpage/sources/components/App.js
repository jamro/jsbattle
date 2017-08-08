var Row = require('./bootstrap/Row.js');
var FullRow = require('./bootstrap/FullRow.js');
var Col = require('./bootstrap/Col.js');
var InfoBox = require('./InfoBox.js');
var Cover = require('./cover/Cover.js');
var DebugView = require('./debugView/DebugView.js');
var ScoreBoard = require('./scoreBoard/ScoreBoard.js');
var Navi = require('./navi/Navi.js');
var Battlefield = require('./Battlefield.js');
var BootstrapRWD = require('../lib/BootstrapRWD.js');

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
    this.rwd = new BootstrapRWD();
    this.state = {
      errorMessage: null,
      simSpeed: simSpeed,
      simQuality: simQuality,
      phase: "loading",
      winner: null,
      timeLeft: 0,
      tankList: [],
      quality: 1,
      windowSize: 'md',
      debugId: 0
    };
  }

  componentDidMount() {
    this.buildSimulation();
    var self = this;

    this.rwd.onChange((s) => this.setState({windowSize: s}));
    this.setState({windowSize: this.rwd.size});
  }

  startBattle() {
    this.simulation.start();
    this.highlightTank(this.state.debugId);
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
    tankList.sort((a, b) => {
      return b.score - a.score;
    });
    for(var rank=0; rank < tankList.length; rank++) {
      tankList[rank].rank = rank;
    }
    this.setState({
      tankList: tankList,
      quality: this.renderer.quality
    });
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

  highlightTank(id) {
    this.setState({debugId: id});
    if(!this.renderer) {
      return;
    }
    if(id == 0 && this.renderer.unhighlightTank) {
      this.renderer.unhighlightTank();
    } else if(id != 0 && this.renderer.highlightTank){
      this.renderer.highlightTank(id);
    }

  }

  render() {
    var scoreboard = <ScoreBoard
      tankList={this.state.tankList}
      refreshTime={200+1300*(1-this.state.quality)}
    />;
    var debugView = <DebugView
        visible={true}
        tankList={this.state.tankList}
        highlight={this.state.quality > 0.66}
        onSelect={(id) => this.highlightTank(id)}
      />;
    var fpsWarn = <InfoBox
      message="Animation refresh rate was reduced to increase speed of the battle. You can adjust quality setting in the top bar"
      title="FPS reduced"
      level="warning"
    />;
    if(this.state.phase == 'battle' && this.state.quality <= 0.05) {
      scoreboard = <InfoBox message="Scoreboard hidden to improve performance of battle simulation" title=" " level="info"/>;
      debugView = <InfoBox message="Debug View hidden to improve performance of battle simulation" title=" " level="info"/>;
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
      <FullRow>
        <InfoBox message={this.state.errorMessage} level="danger"/>
        {fpsWarn}
      </FullRow>
      <Row>
        <Col lg={8} md={8} sm={12}>
          <Battlefield
            ref={(battlefield) => this.canvas = battlefield ? battlefield.canvas : null }
            width="900"
            height="600"
            visible={this.state.phase == "battle"}
          />
          <Cover
            phase={this.state.phase}
            onStart={() => this.startBattle()}
            onRestart={() => this.restartBattle()}
            winner={this.state.winner}
            timeLeft={this.state.timeLeft}
          />
          {this.rwd.equalOrBiggerThan('md') ? scoreboard : null}
        </Col>
        <Col lg={4} md={4} sm={12} >
          {debugView}
        </Col>
      </Row>
      <FullRow>
        {this.rwd.smallerThan('md') ? scoreboard : null}
      </FullRow>
    </div>;
  }
};
