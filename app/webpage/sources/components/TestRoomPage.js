import BattleScreen from "./screen/battle/BattleScreen.js";
import WinnerScreen from "./screen/winner/WinnerScreen.js";
import StartScreen from "./screen/start/StartScreen.js";
import FullRow from "./common/bootstrap/FullRow.js";
import InfoBox from "./common/InfoBox.js";

export default class TestRoomPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
      phase: "start",
      battleResult: null,
      aiDefList: [],
      battleSettings: {}
    };
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
    if(this.props.quickBattleTank) {
      this.onScriptEdit(this.props.quickBattleTank);
    } else {
      this.onPrepareForBattle();
    }
  }

  onScriptEdit(name) {
    this.props.openPage('editor', {tankName: name, back: 'testroom'});
    this.setState({
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
          aiRepository={this.props.aiRepository}
          fastForward={this.props.quickBattleTank}
          stateless={this.props.stateless}
        />;
      case 'battle':
        return <BattleScreen
          renderer={this.props.renderer}
          speed={this.props.speed}
          quality={this.props.quality}
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
          onEdit={this.props.quickBattleTank ? (() => this.onScriptEdit(this.props.quickBattleTank)) : null}
        />;
      default: return null;
    }
  }

  render() {
    return <div>
      <FullRow>
        <InfoBox message={this.state.errorMessage} level="danger"/>
      </FullRow>
      {this.renderContent()}
    </div>;
  }
}
