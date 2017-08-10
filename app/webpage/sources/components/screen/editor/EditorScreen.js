var FullRow = require('../../common/bootstrap/FullRow.js');
var Row = require('../../common/bootstrap/Row.js');
var Col = require('../../common/bootstrap/Col.js');
var FileNameHeader = require('./FileNameHeader.js');
var SaveButtons = require('./SaveButtons.js');
var CodeArea = require('./CodeArea.js');

module.exports = class EditorScreen extends React.Component {

  constructor(props) {
    super(props);
    var script = this.props.aiRepository.getScript(this.props.name);
    this.state = {
      script: script,
      unsavedCode: script.code
    };
  }

  onRename(newValue, oldValue) {
    if(newValue != oldValue && !this.props.aiRepository.isNameAllowed(newValue)) {
      return "Name must be unique, at least 3 characters long";
    }

    this.props.aiRepository.renameScript(newValue, oldValue);
    this.setState({script: this.props.aiRepository.getScript(newValue)});
    this.props.onRename(newValue, oldValue);
    return null;
  }

  onCodeChanged(code) {
    this.setState({unsavedCode: code});
  }

  hasUnsavedChanges() {
    return this.state.script.code != this.state.unsavedCode;
  }

  onClose(testNow) {
    if(testNow) {
      this.props.onTest();
    } else {
      this.props.onClose();
    }
  }

  onSave() {
    var name = this.state.script.name;
    if(this.hasUnsavedChanges()) {
      this.props.aiRepository.updateScript(name, this.state.unsavedCode);
      this.setState({script: this.props.aiRepository.getScript(name)});
    }
  }

  render() {
    return <div>
      <FullRow>
          <FileNameHeader
            className="pull-left"
            defaultName={this.props.name}
            onChange={(newValue, oldValue) => this.onRename(newValue, oldValue)}
          />
          <div className="pull-right" style={{paddingTop: '15px'}}>
            <SaveButtons
              unsavedChanges={this.hasUnsavedChanges()}
              onClose={(testNow) => this.onClose(testNow)}
              onSave={() => this.onSave()}
            />
          </div>
      </FullRow>
      <FullRow>
        <hr style={{marginTop: '5px'}}/>
      </FullRow>
      <FullRow>
        <CodeArea
          className="form-control"
          defaultValue={this.state.script.code}
          onChange={(e) => this.onCodeChanged(e)}
        />
      </FullRow>
    </div>;
  }
};
