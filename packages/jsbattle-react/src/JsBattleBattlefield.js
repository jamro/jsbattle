import React from 'react';
import PropTypes from 'prop-types';
import JsBattle from 'jsbattle-engine';

class JsBattleBattlefield extends React.Component {

  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.canvas = null;
    this.renderer = null;
    this.onWindowResizeHandler = this.onWindowResize.bind(this);
  }

  createCanvas(width, height) {
    let container = this.container.current;
    let child = container.lastElementChild;
    while (child) {
      container.removeChild(child);
      child = container.lastElementChild;
    }
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = width + "px";
    this.canvas.style.height = height + "px";
    this.canvas.style.display = 'none';
    this.canvas.className = 'jsbattle_battlefield';
    container.appendChild(this.canvas);

    this.onWindowResizeHandler();
  }

  componentDidMount() {
    this.createCanvas(this.props.width, this.props.height);
    this.renderer = JsBattle.createRenderer(this.props.renderer);
    this.renderer.loadAssets(() => this.onAssetsLoaded());
    window.addEventListener('resize', this.onWindowResizeHandler);
    if(this.props.onInit) {
      this.props.onInit();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResizeHandler);
  }

  componentDidUpdate(prevProps) {
    if(!this.simulation) {
      return;
    }
    let hasChanged = (name) => {
      return (prevProps[name] !== this.props[name]);
    };
    if(hasChanged('speed')) {
      this.simulation.setSpeed(this.props.speed);
    }
    if(hasChanged('quality')) {
      this.simulation.setRendererQuality(this.props.quality);
    }
    if(
      hasChanged('aiDefList') ||
      hasChanged('renderer') ||
      hasChanged('rngSeed') ||
      hasChanged('teamMode') ||
      hasChanged('battlefieldWidth') ||
      hasChanged('battlefieldHeight') ||
      hasChanged('modifier') ||
      hasChanged('timeLimit')
    ) {
      this.restart();
    }
  }

  stop() {
    this.simulation.stop();
  }

  restart() {
    if(this.simulation) {
      this.simulation.stop();
      this.simulation = null;
    }
    if(this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }
    this.createCanvas(this.props.width, this.props.height);
    this.renderer = JsBattle.createRenderer(this.props.renderer);
    this.renderer.loadAssets(() => this.onAssetsLoaded());
    if(this.props.onInit) {
      this.props.onInit();
    }
  }

  onWindowResize() {
    if(!this.props.autoResize) {
      return;
    }
    let w = this.canvas.parentElement.clientWidth;
    let ratio = w/900;
    this.canvas.style.width = (ratio * 900) + "px";
    this.canvas.style.height = (ratio * 600) + "px";

  }

  onAssetsLoaded() {
    this.renderer.init(this.canvas);
    this.simulation = JsBattle.createSimulation(this.renderer);
    let rngSeed;
    if(this.props.rngSeed === undefined) {
      rngSeed = Math.random();
    } else {
      rngSeed = this.props.rngSeed;
    }
    this.simulation.setRngSeed(rngSeed);
    this.simulation.timeLimit = this.props.timeLimit;

    if(this.props.onError) {
      this.simulation.onError((msg) => this.props.onError(msg));
    }
    if(this.props.onStart) {
      this.simulation.onStart(() => this.props.onStart());
    }
    this.simulation.init(this.props.battlefieldWidth, this.props.battlefieldHeight);

    if(this.props.onRender) {
      this.simulation.onRender(() => this.props.onRender(this.simulation));
    }
    this.simulation.setSpeed(this.props.speed !== undefined ? this.props.speed : 1);
    this.simulation.setRendererQuality(this.props.quality !== undefined ? this.props.quality : 'auto');
    this.simulation.onFinish(() => this.handleFinish());

    if(this.props.onReady) {
      this.props.onReady(this.simulation);
    }
    this.canvas.style.display = 'block';

    if(!this.props.aiDefList) {
      throw new Error("aiDefList property was not defined");
    }

    this.props.aiDefList.forEach((ai) => {
      if(this.props.teamMode) {
        ai.assignToTeam(ai.name);
      }
      this.addTank(ai);
    });

    if(this.props.modifier) {
      this.props.modifier(this.simulation);
    }

    this.simulation.start();
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

  get tankList() {
    return this.simulation.tankList;
  }

  get teamList() {
    return this.simulation.teamList;
  }

  get actualRendererQuality() {
    return this.renderer.quality;
  }

  getSimulation() {
    return this.simulation;
  }

  render() {
    return <div ref={this.container}></div>;
  }
}

JsBattleBattlefield.defaultProps = {
  width: 900,
  height: 600,
  battlefieldWidth: 900,
  battlefieldHeight: 600,
  renderer: "debug",
  rngSeed: undefined,
  timeLimit: 30000,
  speed: 1,
  quality: 'auto',
  teamMode: false,
  aiDefList: [],
  autoResize: false,
  modifier: undefined,
  onError: undefined,
  onStart: undefined,
  onRender: undefined,
  onReady: undefined,
  onInit: undefined,
  onFinish: undefined,
};

JsBattleBattlefield.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  battlefieldWidth: PropTypes.number,
  battlefieldHeight: PropTypes.number,
  renderer: PropTypes.string,
  rngSeed: PropTypes.number,
  timeLimit: PropTypes.number,
  speed: PropTypes.number,
  quality: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto'])
  ]),
  teamMode: PropTypes.oneOf([true, false]),
  autoResize: PropTypes.oneOf([true, false]),
  aiDefList: PropTypes.arrayOf(PropTypes.instanceOf(JsBattle.createAiDefinition().constructor)).isRequired,
  modifier: PropTypes.func,
  onError: PropTypes.func,
  onStart: PropTypes.func,
  onRender: PropTypes.func,
  onReady: PropTypes.func,
  onInit: PropTypes.func,
  onFinish: PropTypes.func,
};


export default JsBattleBattlefield;
