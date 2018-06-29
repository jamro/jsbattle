export default class Battlefield extends React.Component {

  constructor(props) {
    super(props);
    this.simulation = null;
    this.renderer = null;
    this.state = {
      rngSeed: (props.rngSeed === undefined) ? Math.random() : props.rngSeed
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.simulation) {
      this.simulation.setSpeed(this.props.speed ? this.props.speed : 1);
      this.simulation.setRendererQuality(this.props.quality !== undefined ? this.props.quality : 'auto');
    }
  }

  buildSimulation() {
    this.renderer = JsBattle.createRenderer(this.props.renderer);
    this.renderer.loadAssets(() => this.onAssetsLoaded());
  }

  start() {
    this.simulation.start();
  }

  stop() {
    this.simulation.stop();
  }

  onAssetsLoaded() {
    this.renderer.init(this.canvas);
    this.simulation = JsBattle.createSimulation(this.renderer);
    this.simulation.setRngSeed(this.state.rngSeed);

    if(this.props.onError) {
      this.simulation.onError((msg) => this.props.onError(msg));
    }
    if(this.props.onStart) {
      this.simulation.onStart(() => this.props.onStart());
    }
    this.simulation.init(900, 600);

    if(this.props.onRender) {
      this.simulation.onRender(() => this.props.onRender());
    }
    this.simulation.setSpeed(this.props.speed ? this.props.speed : 1);
    this.simulation.setRendererQuality(this.props.quality ? this.props.quality : 'auto');
    this.simulation.onFinish(() => this.handleFinish());

    if(this.props.onReady) {
      this.props.onReady();
    }
  }

  handleFinish() {
    let tankWinner = null;
    let i;
    for(i in this.simulation.tankList) {
      let tank = this.simulation.tankList[i];
      if(!tankWinner || tank.score > tankWinner.score) {
        tankWinner = tank;
      }
    }
    let teamWinner = null;
    for(i in this.simulation.teamList) {
      let team = this.simulation.teamList[i];
      if(!teamWinner || team.score > teamWinner.score) {
        teamWinner = team;
      }
    }
    let result = {
      tankWinner: tankWinner,
      teamWinner: teamWinner,
      tankList: this.simulation.tankList,
      teamList: this.simulation.teamList,
      timeLeft: this.simulation.timeLimit - this.simulation.timeElapsed,
      ubd: this.simulation.createUltimateBattleDescriptor().encode()
    };

    let keepRendering = setInterval(() => {
      this.renderer.preRender();
      this.renderer.postRender();
    }, 30);
    setTimeout(() => {
      clearInterval(keepRendering);
      if(this.props.onFinish) {
        this.props.onFinish(result);
      }
    }, 500);
  }

  addTank(aiDefinition) {
    try {
      this.simulation.addTank(aiDefinition);
    } catch(err) {
      if(this.props.onError) {
        this.props.onError("Cannot add tank '" + aiDefinition.name + "': " +  (err.message ? err.message : err));
      }
      console.error(err);
    }
  }

  get tankList() {
    return this.simulation.tankList;
  }

  get teamList() {
    return this.simulation.teamList;
  }

  get actualRendererQuality() {
    return this.renderer.quality;
  }

  render() {
    let style = {};
    if(!this.props.visible) {
      style.display = 'none';
    } else {
      style.display = 'block';
      style.maxWidth = '900px';
    }
    return <canvas
      ref={(c) => this.canvas = c }
      className="battlefield"
      width={this.props.width}
      height={this.props.height}
      style={style}
    >
    </canvas>;
  }
}
