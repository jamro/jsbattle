import FullRow from "../../common/bootstrap/FullRow.js";
import Row from "../../common/bootstrap/Row.js";
import Col from "../../common/bootstrap/Col.js";

export default class SaveButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'normal'
    };
    this.testNow = false;
  }

  onCloseRequest(testNow) {
    this.testNow = testNow;
    if(this.props.unsavedChanges) {
      this.setState({mode: 'confirm'});
    } else {
      this.props.onClose(this.testNow);
    }
  }

  onClose() {
    this.props.onClose(this.testNow);
  }

  onSave() {
    this.props.onSave();
  }

  onSaveAndClose() {
    this.props.onSave();
    this.props.onClose(this.testNow);
  }

  renderStandard() {
    let saveButton;
    if(this.props.unsavedChanges) {
      saveButton = <button type="button" className="btn btn-secondary editor-save"  onClick={() => this.onSave()}>
          <i className="fas fa-save" aria-hidden="true"></i> Save
      </button>;
    } else {
      saveButton = <button type="button" className="btn btn-secondary disabled editor-save" >
          <i className="fas fa-check" aria-hidden="true"></i> Saved
      </button>;
    }
    return <div>
      <button type="button" className="btn btn-primary editor-fight" onClick={() => this.onCloseRequest(true)}>
        <i className="fas fa-play" aria-hidden="true"></i> Quick Fight
      </button> &nbsp;
      {saveButton} &nbsp;
      <button type="button" className="btn btn-secondary editor-close" onClick={() => this.onCloseRequest(false)}>
        <i className="fas fa-times" aria-hidden="true"></i> Close
      </button> &nbsp;

    </div>;
  }

  renderConfirm() {
    return <div>
      <label>Save Changes? </label> &nbsp;
      <button type="button" className="btn btn-primary" onClick={() => this.onSaveAndClose()}>
          <i className="fas fa-check" aria-hidden="true"></i> Yes
      </button> &nbsp;
      <button type="button" className="btn btn-secondary"  onClick={() => this.onClose()}>
          <i className="fas fa-times" aria-hidden="true"></i> No
      </button>
    </div>;
  }

  render() {
    switch(this.state.mode) {
      case 'normal': return this.renderStandard();
      case 'confirm': return this.renderConfirm();
    }
  }
}
