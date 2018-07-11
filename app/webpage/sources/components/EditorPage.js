import EditorScreen from "./screen/editor/EditorScreen.js";
import CodeRepositoryScreen from "./screen/editor/CodeRepositoryScreen.js";
import FullRow from "./common/bootstrap/FullRow.js";
import InfoBox from "./common/InfoBox.js";

export default class EditorPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: null,
      phase: props.tankName ? "editor" : "repository",
      editorTank: props.tankName,
      back: 'editor'
    };
  }

  showError(msg) {
    this.setState({errorMessage: msg});
  }

  onScriptEdit(name) {
    this.openPage(
      'editor',
      {
        editorTank: name,
        back: 'editor'
      },
      'editor'
    );
  }

  openPage(name, data, phase) {
    if(name == 'editor') {
      this.setState({
        phase: phase ? phase : 'repository',
        editorTank: (data && data.editorTank) ? data.editorTank : null,
        errorMessage: null,
        back: (data && data.back) ? data.back : 'editor'
      });
    } else {
      this.props.openPage(name, data);
    }

  }


  getBackPage() {
    return this.props.back ? this.props.back : 'editor';
  }

  renderContent() {
    switch(this.state.phase) {
      case 'editor':
        return <EditorScreen
          aiRepository={this.props.aiRepository}
          name={this.state.editorTank}
          onClose={() => this.openPage(this.getBackPage(), {}, 'repository')}
          onTest={() => this.openPage('testroom', {quickBattleTank: this.state.editorTank})}
          onRename={(newName) => this.setState({editorTank: newName})}
          onUnsavedCode={(hasUnsaved) => this.props.onUnsavedCode(hasUnsaved)}
        />;
        case 'repository':
          return <CodeRepositoryScreen
            aiRepository={this.props.aiRepository}
            onScriptEdit={(name) => this.onScriptEdit(name)}
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
