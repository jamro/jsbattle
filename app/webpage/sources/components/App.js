var BattleScreen = require('./screen/battle/BattleScreen.js');
var WinnerScreen = require('./screen/winner/WinnerScreen.js');
var StartScreen = require('./screen/start/StartScreen.js');
var FullRow = require('./common/bootstrap/FullRow.js');
var Navi = require('./common/navi/Navi.js');
var InfoBox = require('./common/InfoBox.js');

module.exports = class App extends React.Component {

  constructor(props) {
    super(props);
    var simSpeed = localStorage.getItem("settings.simSpeed");
    simSpeed = simSpeed ? simSpeed : 1;
    var qualitySettings = localStorage.getItem("settings.quality");
    qualitySettings = qualitySettings ? qualitySettings : "auto";
    this.state = {
      simSpeed: simSpeed,
      qualitySettings: qualitySettings,
      errorMessage: null,
      phase: "start",
      battleResult: null,
      tankNameList: []
    };
  }

  setSimulationSpeed(v) {
    this.setState({simSpeed: v});
    localStorage.setItem("settings.simSpeed", v);
  }

  setSimulationQuality(v) {
    this.setState({qualitySettings: v});
    localStorage.setItem("settings.quality", v);
  }

  showError(msg) {
    this.setState({errorMessage: msg});
  }

  onBattleFinish(result) {
    this.setState({
      phase: 'winner',
      battleResult: result
    });
  }

  onBattleRestart() {
    this.setState({
      phase: 'start',
      battleResult: null
    });
  }

  onBattleStart(tankList) {
    this.setState({
      phase: 'battle',
      tankNameList: tankList
    });
  }

  renderContent() {
    switch(this.state.phase) {
      case 'start':
        return <StartScreen
          onStart={(tankList) => this.onBattleStart(tankList)}
          onError={(msg) => this.showError(msg)}
        />;
      case 'battle':
        return <BattleScreen
          renderer={this.props.renderer}
          speed={this.state.simSpeed}
          quality={this.state.qualitySettings}
          tankNameList={this.state.tankNameList}
          onError={(msg) => this.showError(msg)}
          onFinish={(result) => this.onBattleFinish(result)}
        />;
      case 'winner':
        return <WinnerScreen
          result={this.state.battleResult}
          onRestart={() => this.onBattleRestart()}
        />;
      default: return null;
    }
  }

  render() {
    return <div>
      <Navi
        speed={this.state.simSpeed}
        quality={this.state.qualitySettings}
        onSpeedChange={(v) => this.setSimulationSpeed(v)}
        onQualityChange={(v) => this.setSimulationQuality(v)}
      />
      <FullRow>
        <InfoBox message={this.state.errorMessage} level="danger"/>
      </FullRow>
      {this.renderContent()}
    </div>;
  }
};
