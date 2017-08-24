import BattleScreen from "./screen/battle/BattleScreen.js";
import WinnerScreen from "./screen/winner/WinnerScreen.js";
import StartScreen from "./screen/start/StartScreen.js";
import EditorScreen from "./screen/editor/EditorScreen.js";
import FullRow from "./common/bootstrap/FullRow.js";
import Navi from "./common/navi/Navi.js";
import InfoBox from "./common/InfoBox.js";
import AiRepository from "../lib/AiRepository.js";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    let simSpeed;
    let qualitySettings;
    if(!props.stateless) {
      simSpeed = localStorage.getItem("settings.simSpeed");
      qualitySettings = localStorage.getItem("settings.quality");
    }
    simSpeed = simSpeed ? simSpeed : 1;
    qualitySettings = qualitySettings ? qualitySettings : "auto";
    this.state = {
      simSpeed: simSpeed,
      qualitySettings: qualitySettings,
      errorMessage: null,
      phase: "start",
      battleResult: null,
      aiDefList: [],
      editorTank: null,
      quickBattleMode: false,
      battleSettings: {}
    };
    this.aiRepository = new AiRepository(props.stateless);
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

  onPrepareForBattle() {
    this.setState({
      phase: 'start',
      battleResult: null,
      quickBattleMode: false,
      errorMessage: null
    });
  }

  onBattleStart(aiDefList, settings) {
    this.setState({
      phase: 'battle',
      aiDefList: aiDefList,
      battleSettings: settings,
      errorMessage: null
    });
  }

  onBattleExit() {
    if(this.state.editorTank && this.state.quickBattleMode) {
      this.onScriptEdit(this.state.editorTank);
    } else {
      this.onPrepareForBattle();
    }
  }

  onScriptEdit(name) {
    this.setState({
      phase: 'editor',
      editorTank: name,
      quickBattleMode: false,
      errorMessage: null
    });
  }

  onQuickBattle() {
    this.setState({
      phase: 'start',
      quickBattleMode: true,
      errorMessage: null
    });
  }

  renderContent() {
    switch(this.state.phase) {
      case 'start':
        return <StartScreen
          onStart={(aiDefList, settings) => this.onBattleStart(aiDefList, settings)}
          onError={(msg) => this.showError(msg)}
          onScriptEdit={(name) => this.onScriptEdit(name)}
          aiRepository={this.aiRepository}
          fastForward={this.state.quickBattleMode}
          stateless={this.props.stateless}
        />;
      case 'battle':
        return <BattleScreen
          renderer={this.props.renderer}
          speed={this.state.simSpeed}
          quality={this.state.qualitySettings}
          aiDefList={this.state.aiDefList}
          settings={this.state.battleSettings}
          onError={(msg) => this.showError(msg)}
          onFinish={(result) => this.onBattleFinish(result)}
          onExit={() => this.onBattleExit()}
          stateless={this.props.stateless}
        />;
      case 'winner':
        return <WinnerScreen
          result={this.state.battleResult}
          onRestart={() => this.onPrepareForBattle()}
          onEdit={this.state.editorTank && this.state.quickBattleMode ? (() => this.onScriptEdit(this.state.editorTank)) : null}
        />;
      case 'editor':
        return <EditorScreen
          aiRepository={this.aiRepository}
          name={this.state.editorTank}
          onClose={() => this.setState({phase: 'start'})}
          onTest={() => this.onQuickBattle()}
          onRename={(newName) => this.setState({editorTank: newName})}
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
}
