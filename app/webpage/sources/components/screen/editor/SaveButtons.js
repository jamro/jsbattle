var FullRow = require('../../common/bootstrap/FullRow.js');
var Row = require('../../common/bootstrap/Row.js');
var Col = require('../../common/bootstrap/Col.js');

module.exports = class SaveButtons extends React.Component {

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
    var saveButton;
    if(this.props.unsavedChanges) {
      saveButton = <button type="button" className="btn btn-default"  onClick={() => this.onSave()}>
          <i className="fa fa-save" aria-hidden="true"></i> Save
      </button>;
    } else {
      saveButton = <button type="button" className="btn btn-default disabled" >
          <i className="fa fa-check" aria-hidden="true"></i> Saved
      </button>;
    }
    return <div>
      <button type="button" className="btn btn-primary" onClick={() => this.onCloseRequest(true)}>
        <i className="fa fa-play" aria-hidden="true"></i> Quick Fight
      </button> &nbsp;
      {saveButton} &nbsp;
      <button type="button" className="btn btn-default" onClick={() => this.onCloseRequest(false)}>
        <i className="fa fa-times" aria-hidden="true"></i> Close
      </button> &nbsp;

    </div>;
  }

  renderConfirm() {
    return <div>
      <label>Save Changes? </label> &nbsp;
      <button type="button" className="btn btn-primary" onClick={() => this.onSaveAndClose()}>
          <i className="fa fa-check" aria-hidden="true"></i> Yes
      </button> &nbsp;
      <button type="button" className="btn btn-default"  onClick={() => this.onClose()}>
          <i className="fa fa-times" aria-hidden="true"></i> No
      </button>
    </div>;
  }

  render() {
    switch(this.state.mode) {
      case 'normal': return this.renderStandard();
      case 'confirm': return this.renderConfirm();
    }
  }
};
