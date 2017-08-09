module.exports = class Battlefield extends React.Component {

  construct() {
    this.simulation = null;
    this.renderer = null;
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

  onAssetsLoaded() {
    this.renderer.init(this.canvas);
    this.simulation = JsBattle.createSimulation(this.renderer);

    if(this.props.onError) {
      this.simulation.onError((msg) => this.props.onError(msg));
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
    var winner = null;
    for(var i in this.simulation.tankList) {
      var tank = this.simulation.tankList[i];
      if(!winner || tank.score > winner.score) {
        winner = tank;
      }
    }
    var result = {
      winner: winner,
      tankList: this.simulation.tankList,
      timeLeft: this.simulation.timeLimit - this.simulation.timeElapsed
    };

    var keepRendering = setInterval(() => {
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
    }
  }

  get tankList() {
    return this.simulation.tankList;
  }

  get actualRendererQuality() {
    return this.renderer.quality;
  }

  render() {
    var style = {};
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
};
