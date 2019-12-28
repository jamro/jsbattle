import Row from "../bootstrap/Row.js";
import FullRow from "../bootstrap/FullRow.js";
import Col from "../bootstrap/Col.js";
import InfoBox from "../InfoBox.js";
import DebugView from "./debugView/DebugView.js";
import ScoreBoard from "./scoreBoard/ScoreBoard.js";
import BootstrapRWD from "../../../lib/BootstrapRWD.js";
import Loading from "../Loading.js";
import JsBattleBattlefield from "jsbattle-react";

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
      timeLimt: (props.timeLimt !== undefined) ? props.timeLimt : 30000,
      error: ""
    };
  }

  componentDidMount() {
    this.rwd.onChange((s) => this.setState({windowSize: s}));
    this.setState({windowSize: this.rwd.size});
  }

  componentWillUnmount() {
    this.rwd.dispose();
    this.rwd = null;
  }

  onBattleReady() {
    this.updateTankList();
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
    let simulation = this.battlefield.getSimulation();
    let tankList = simulation.tankList.map((tank) => {
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

    let teamList = simulation.teamList.map((team) => {
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
          <div style={{visibility: (this.state.phase == "battle") ? 'visible' : 'hidden'}}>
            <JsBattleBattlefield
              ref={(battlefield) => this.battlefield = battlefield }
              aiDefList={this.props.aiDefList}
              autoResize={true}
              speed={this.props.speed}
              quality={this.props.quality}
              renderer={this.props.renderer}
              rngSeed={this.state.rngSeed}
              timeLimit={this.state.timeLimit}
              teamMode={this.props.teamMode}
              onReady={() => this.onBattleReady()}
              onStart={() => this.onBattleStart()}
              onError={(msg) => this.showError(msg)}
              onRender={() => this.updateTankList()}
              onFinish={(result) => this.onBattleFinish(result)}
            />
          </div>
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
