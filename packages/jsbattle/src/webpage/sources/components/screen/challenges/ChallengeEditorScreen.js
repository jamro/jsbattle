import FullRow from "../../common/bootstrap/FullRow.js";
import CodeEditorWidget from "../../common/editor/CodeEditorWidget.js";

export default class ChallengeEditorScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <FullRow>
        <button type="button" className="btn btn-secondary float-right close-challenge" onClick={() => this.props.onClose()}>
          <i className="fas fa-times" aria-hidden="true"></i> Close
        </button>
        <a className="btn btn-secondary float-right help" style={{marginRight: '5px'}} href="./docs/#/docs/getting_started" target="_blank">
          <i class="fas fa-question-circle"></i> Help
        </a>
        <button type="button" className="btn btn-primary float-right editor-fight" style={{marginRight: '5px'}} onClick={() => this.props.onStart()}>
          <i className="fas fa-play" aria-hidden="true"></i> Start the Battle
        </button>
      </FullRow>
      <FullRow>
        <CodeEditorWidget
          initCode={this.props.code}
          onCodeChanged={(code) => this.props.onCodeChanged(code)}
        />
      </FullRow>
    </div>;
  }
}
