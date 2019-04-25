import Row from "../bootstrap/Row.js";
import FullRow from "../bootstrap/FullRow.js";
import Col from "../bootstrap/Col.js";
import InfoBox from "../InfoBox.js";
import DebugView from "./debugView/DebugView.js";
import ScoreBoard from "./scoreBoard/ScoreBoard.js";
import Battlefield from "../battle/Battlefield.js";
import BootstrapRWD from "../../../lib/BootstrapRWD.js";
import Loading from "../Loading.js";

export default class BattleWidget extends React.Component {

  constructor(props) {
    super(props);
    this.battlefield = null;
    this.rwd = new BootstrapRWD();
    this.state = {
      qualityLevel: 1,
      phase: "loading",
      timeLeft: 0,
      tankList: [],
      teamList: [],
      windowSize: 'md',
      rngSeed: (props.rngSeed !== undefined) ? props.rngSeed : Math.random(),
      error: ""
    };
  }

  componentDidMount() {
    this.buildSimulation();
    this.rwd.onChange((s) => this.setState({windowSize: s}));
    this.setState({windowSize: this.rwd.size});
  }

  componentWillUnmount() {
    this.rwd.dispose();
    this.rwd = null;
  }

  buildSimulation() {
    this.battlefield.buildSimulation();
  }

  onBattleReady() {
    let self = this;
    let aiDefList = this.props.aiDefList;
    if(!this.props.aiDefList) {
      throw new Error("aiDefList proerty was not defined");
    }
    aiDefList.forEach((ai) => {
      if(self.props.teamMode) {
        ai.assignToTeam(ai.name);
      }
      self.battlefield.addTank(ai);
    });
    if(this.props.modifier) {
      this.props.modifier(this.battlefield.simulation);
    }
    this.updateTankList();
    this.battlefield.start();
  }

  onBattleStart() {
    this.setState({phase: 'battle'});
  }

  onBattleFinish(result) {
    result.teamMode = this.props.teamMode;
    if(this.props.onFinish) {
      this.props.onFinish(result);
    }
  }

  updateTankList() {
    let rank;
    let tankList = this.battlefield.tankList.map((tank) => {
      return {
        id: tank.id,
        name: tank.fullName,
        debug: tank.debugData,
        state: tank.state,
        score: tank.score,
        energy: 100*(tank.energy/tank.maxEnergy),
      };
    });
    tankList.sort((a, b) => {
      return b.score - a.score;
    });
    for(rank=0; rank < tankList.length; rank++) {
      tankList[rank].rank = rank;
    }

    let teamList = this.battlefield.teamList.map((team) => {
      return {
        name: team.name,
        score: team.score,
        energy: 100*(team.energy / team.maxEnergy)
      };
    });
    teamList.sort((a, b) => {
      return b.score - a.score;
    });
    for(rank=0; rank < teamList.length; rank++) {
      teamList[rank].rank = rank;
    }
    this.setState({
      tankList: tankList,
      teamList: teamList,
      qualityLevel: this.battlefield.actualRendererQuality
    });
  }


  showError(msg) {
    if(this.props.onError) {
      this.props.onError(msg);
    }
    this.setState({error: msg});
  }

  exit() {
    this.battlefield.stop();
    this.props.onExit();
  }

  render() {
    let loading = null;
    let exitButton = <button className="btn btn-danger btn-lg exit-battle" style={{width: '100%', marginBottom: '5px'}} onClick={() => this.exit()}>
      <i className="fas fa-power-off" aria-hidden="true"></i> Exit the battle
    </button>;
    let scoreboard = <ScoreBoard
      tankList={this.props.teamMode ? this.state.teamList : this.state.tankList}
      refreshTime={200+1300*(1-this.state.qualityLevel)}
    />;
    let debugView = <DebugView
        visible={true}
        tankList={this.state.tankList}
        highlight={this.state.qualityLevel > 0.66}
        stateless={this.props.stateless}
      />;
    let fpsWarn = <InfoBox
      message="Animation refresh rate was reduced to increase speed of the battle. You can adjust quality setting in the top bar"
      title="FPS reduced"
      level="warning"
    />;
    if(this.state.phase == 'battle' && this.state.qualityLevel <= 0.05) {
      scoreboard = <InfoBox message="Scoreboard hidden to improve performance of battle simulation" title=" " level="info"/>;
      debugView = <InfoBox message="Debug View hidden to improve performance of battle simulation" title=" " level="info"/>;
    }
    if(this.state.phase == 'loading') {
      scoreboard = null;
      debugView = null;
    }
    if(this.state.phase == 'loading' && !this.state.error) {
      exitButton = null;
      loading = <FullRow><Loading /></FullRow>;
    }
    if(this.state.qualityLevel >= 0.3 || this.state.phase != 'battle') {
      fpsWarn = null;
    }
    return <div>
      {loading}
      <Row>
        <Col lg={8} md={8} sm={12}>
          {fpsWarn}
          <Battlefield
            ref={(battlefield) => this.battlefield = battlefield }
            rngSeed={this.state.rngSeed}
            width="900"
            height="600"
            speed={this.props.speed}
            quality={this.props.quality}
            renderer={this.props.renderer}
            visible={this.state.phase == "battle"}
            onReady={() => this.onBattleReady()}
            onStart={() => this.onBattleStart()}
            onError={(msg) => this.showError(msg)}
            onRender={() => this.updateTankList()}
            onFinish={(result) => this.onBattleFinish(result)}
          />
          {this.rwd.equalOrBiggerThan('md') ? scoreboard : null}
        </Col>
        <Col lg={4} md={4} sm={12} >
          {exitButton}
          {debugView}
        </Col>
      </Row>
      <FullRow>
        {this.rwd.smallerThan('md') ? scoreboard : null}
      </FullRow>
    </div>;
  }
}
