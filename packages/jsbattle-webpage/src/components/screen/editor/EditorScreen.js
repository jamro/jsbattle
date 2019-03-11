import FullRow from "../../common/bootstrap/FullRow.js";
import ExitWarning from "../../common/ExitWarning.js";
import FileNameHeader from "./FileNameHeader.js";
import SaveButtons from "./SaveButtons.js";
import CodeEditorWidget from "../../common/editor/CodeEditorWidget.js";

export default class EditorScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  onRename(newValue, oldValue) {
    if(oldValue == newValue) {
      return null;
    }
    if(!this.props.aiRepository.isNameAllowed(newValue)) {
      return "Name must be unique, at least 3 characters long";
    }
    this.props.onRename(newValue, oldValue);
    return null;
  }

  hasUnsavedChanges() {
    return this.props.originalCode != this.props.unsavedCode;
  }

  onClose(testNow) {
    if(testNow) {
      this.props.onTest();
    } else {
      this.props.onClose();
    }
  }

  render() {
    return <div>
      <ExitWarning disabled={!this.hasUnsavedChanges()}/>
      <FullRow>
          <FileNameHeader
            className="pull-left"
            defaultName={this.props.name}
            onChange={(newValue, oldValue) => this.onRename(newValue, oldValue)}
          />
          <div className="float-right" style={{paddingTop: '15px'}}>
            <SaveButtons
              unsavedChanges={this.hasUnsavedChanges()}
              onClose={(testNow) => this.onClose(testNow)}
              onSave={() => this.props.onCodeSave()}
            />
          </div>
      </FullRow>
      <FullRow>
        <hr style={{marginTop: '5px'}}/>
      </FullRow>
      <CodeEditorWidget
        initCode={this.props.unsavedCode}
        onCodeChanged={(code) => this.props.onCodeChanged(code)}
      />
    </div>;
  }
}
