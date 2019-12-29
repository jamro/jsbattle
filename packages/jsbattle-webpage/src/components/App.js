import Navi from "./common/navi/Navi.js";
import AiRepository from "../lib/AiRepository.js";
import ChallengeLibrary from "../lib/ChallengeLibrary.js";
import FullRow from "./common/bootstrap/FullRow.js";
import Controller from "../controller/Controller.js";
import InfoBox from "./common/InfoBox.js";
import EditorScreen from "./screen/editor/EditorScreen.js";
import CodeRepositoryScreen from "./screen/editor/CodeRepositoryScreen.js";
import BattleScreen from "./screen/battle/BattleScreen.js";
import WinnerScreen from "./screen/winner/WinnerScreen.js";
import StartScreen from "./screen/start/StartScreen.js";
import ChallengesListScreen from "./screen/challenges/ChallengesListScreen.js";
import ChallengeEditorScreen from "./screen/challenges/ChallengeEditorScreen.js";
import ChallengeBattleScreen from "./screen/challenges/ChallengeBattleScreen.js";
import ChallengeResultScreen from "./screen/challenges/ChallengeResultScreen.js";
import Loading from "./common/Loading.js";
import initState from "../state.js";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.aiRepository = new AiRepository(props.stateless, 'aiRepository.scriptMap');
    this.challengeLibrary = new ChallengeLibrary(props.stateless);

    initState.api = props.api;
    this.state = initState;

    this.controller = new Controller(this, this.aiRepository, this.challengeLibrary);
    window.appController = this.controller;
    this.controller.loadSettings(props.stateless, () => {
      if(props.replay) {
        this.controller.replayBattle(props.replay);
      } else {
        this.controller.openChallenges();
      }
    });
  }

  getController() {
    return this.controller;
  }

  showError(msg) {
    this.setState({errorMessage: msg});
  }

  onBattleExit() {
    if(this.state.battle.quickBattleTank) {
      this.controller.openCodeEditor(this.state.battle.quickBattleTank, 'TANK_LIST');
    } else {
      this.controller.openTankList();
    }
  }

  renderContent() {
    switch(this.state.navi.page) {
      case 'TANK_LIST':
        return <StartScreen
          {...this.state.battle}
          onStart={(aiDefList, teamMode, rngSeed, timeLimit) => this.controller.openBattle(aiDefList, teamMode, rngSeed, timeLimit)}
          onError={(msg) => this.showError(msg)}
          onScriptEdit={(name) => this.controller.openCodeEditor(name, 'TANK_LIST')}
          onTeamModeToggle={(isEnabled) => this.controller.toggleTeamMode(isEnabled)}
          onTankAssign={(tankName, amount) => this.controller.assignTanksToBattle(tankName, amount)}
          onTankCreate={() => this.controller.createTank()}
          onTankDelete={(name) => this.controller.removeTank(name)}
          aiRepository={this.aiRepository}
          stateless={this.props.stateless}
        />;
      case 'BATTLE':
        return <BattleScreen
          {...this.state.battle}
          renderer={this.props.renderer}
          speed={this.state.simSpeed}
          quality={this.state.qualitySettings}
          onError={(msg) => this.showError(msg)}
          onFinish={(result) => this.controller.openBattleResults(result)}
          onExit={() => this.onBattleExit()}
          stateless={this.props.stateless}
          aiRepository={this.aiRepository}
        />;
      case 'BATTLE_RESULT':
      return <WinnerScreen
        {...this.state.battle}
        onRestart={() => this.controller.openTankList()}
        onShare={(done) => this.controller.shareBattle(this.state.battle.result.ubd, done)}
        onEdit={this.state.battle.quickBattleTank ? (() => this.controller.openCodeEditor(this.state.battle.quickBattleTank, 'TANK_LIST')) : null}
      />;
      case 'CODE_EDITOR':
        return <EditorScreen
          {...this.state.editor}
          aiRepository={this.aiRepository}
          name={this.state.editor.tankName}
          onClose={() => this.controller.closeCodeEditor()}
          onTest={() => this.controller.openQuickBattle(this.state.editor.tankName)}
          onRename={(newName, oldName) => this.controller.renameAiScript(newName, oldName)}
          onCodeChanged={(code) => this.controller.editCurrentAiScript(code)}
          onCodeSave={() => this.controller.saveCurrentAiScript()}
        />;
      case 'CODE_REPOSITORY':
        return <CodeRepositoryScreen
          {...this.state.codeRepository}
          aiRepository={this.aiRepository}
          onScriptEdit={(name) => this.controller.openCodeEditor(name, this.state.navi.page)}
          onTankCreate={() => this.controller.createTank()}
          onTankDelete={(name) => this.controller.removeTank(name)}
        />;
      case 'CHALLENGE_LIST':
        return <ChallengesListScreen
          {...this.state.challenges}
          onChallengeOpen={(id) => this.controller.openChallengeEditor(id, true)}
        />;
      case 'CHALLENGE_EDITOR':
        return <ChallengeEditorScreen
          {...this.state.currentChallenge}
          renderer={this.props.renderer}
          speed={this.state.simSpeed}
          quality={this.state.qualitySettings}
          onCodeChanged={(code) => this.controller.saveCurrentChallengeScript(code)}
          onStart={() => this.controller.openChallengeBattle()}
          onClose={() => this.controller.openChallenges()}
        />;
      case 'CHALLENGE_BATTLE':
        return <ChallengeBattleScreen
          {...this.state.currentChallenge}
          quickBattleTank={null}
          shareLink={null}
          renderer={this.props.renderer}
          speed={this.state.simSpeed}
          quality={this.state.qualitySettings}
          onError={(msg) => this.showError(msg)}
          onFinish={(result) => this.controller.openChallengeResult(result)}
          onExit={() => this.controller.openChallengeEditor()}
          stateless={this.props.stateless}
          aiRepository={this.aiRepository}
        />;
      case 'CHALLENGE_RESULT':
        return <ChallengeResultScreen
          {...this.state.currentChallenge}
          onRetry={() => this.controller.openChallengeEditor()}
          onNextChallenge={() => this.controller.openChallenges()}
        />;
      case 'LOADING':
        return <FullRow><Loading /></FullRow>;
      default:
        return <FullRow>Oops! Page not found :/</FullRow>;
    }
  }

  render() {
    return <div>
      <Navi
        {...this.state.navi}
        speed={this.state.simSpeed}
        quality={this.state.qualitySettings}
        onSpeedChange={(v) => this.controller.setSimulationSpeed(v)}
        onQualityChange={(v) => this.controller.setSimulationQuality(v)}
        controller={this.controller}
      />
      <FullRow>
        <InfoBox message={this.state.errorMessage} level="danger"/>
      </FullRow>
      {this.renderContent()}
      <FullRow>
        <small style={{color: '#999', textAlign: 'center', borderTop: '1px solid #999', width: "100%", display: 'inline-block', padding: '5px'}}>
          Hosted on <a href="https://github.com/jamro/jsbattle" target="_blank" rel="noopener noreferrer"><i className="fab fa-github" aria-hidden="true"></i> GitHub</a>.
          This project is licensed under the terms of the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT license</a>.
          Version: {VERSION}
        </small>
      </FullRow>
    </div>;
  }
}
