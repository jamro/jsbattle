import React from "react";
import PropTypes from 'prop-types';
import Row from "../components/Row.js";
import Col from "../components/Col.js";

export default class LeagueJoin extends React.Component {

  constructor(props) {
    super(props);

    let submissionId = '';
    if(this.props.selected && this.props.selected.scriptId) {
      submissionId = this.props.selected.scriptId;
    } else if(props.tankList.length) {
      submissionId = props.tankList[0].id;
    }

    this.state = {
      editMode: false,
      newSubmissionId: submissionId,
    };
  }

  onSubmissionChange(event) {
    this.setState({newSubmissionId: event.target.value});
  }

  openEditor() {
    this.setState({editMode: true});
  }

  closeEditor() {
    this.setState({editMode: false});
  }

  join() {
    let selectedScript = this.props.tankList.filter((tank) => tank.id == this.state.newSubmissionId);
    let name = selectedScript.length > 0 ? selectedScript.pop().scriptName : '';
    this.props.onJoin(this.state.newSubmissionId, name);
    this.setState({editMode: false});
  }

  leave() {
    this.props.onLeave();
    this.setState({editMode: false});
  }

  renderEditor() {
    let options = this.props.tankList.map((el) => (
      <option key={el.id} value={el.id}>
        {el.scriptName}
      </option>
    ));
    let joinButton;
    let leaveButton;
    let tankSelect;
    if(this.props.tankList.length > 0) {
      joinButton = <button className="btn btn-primary mb-2 league-join" onClick={() => this.join()}><i className="fas fa-check"></i> Join</button>;
      tankSelect = <div className="form-check mb-2 mr-sm-2">
          <label htmlFor="joinTank">Your Tank: </label> &nbsp;
          <select className="custom-select" style={{width: "20em"}}  value={this.state.newSubmissionId} onChange={(e) => this.onSubmissionChange(e)}>
            {options}
          </select>
        </div>;
    } else {
      tankSelect = <div className="form-check mb-2 mr-sm-2">
          <div>Create script in <strong>Sanbox</strong> mode to join the league.</div>
        </div>;
    }
    if(this.props.selected) {
      leaveButton = <button className="btn btn-danger mb-2 league-leave" onClick={() => this.leave()}><i className="fas fa-sign-out-alt"></i> Leave</button>;
    }

    return <div className="card">
        <div className="card-body">
          <form className="form-inline">
            {tankSelect} &nbsp; {joinButton} &nbsp; {leaveButton} &nbsp;
            <button className="btn btn-secondary mb-2 league-cancel" onClick={() => this.closeEditor()}><i className="fas fa-times"></i> Cancel</button>
          </form>
        </div>
      </div>;
  }

  renderEmpty() {
    return <div className="card">
        <div className="card-body">
          <Row>
            <Col md={8} className="text-left">
              Test your AI coding skills and compete in JsBattle League with others.
            </Col>
            <Col md={4} className="text-right">
              <button className="btn btn-lg btn-primary league-edit" onClick={() => this.openEditor()}><i className="fas fa-trophy"></i> Join</button>
            </Col>
          </Row>
        </div>
      </div>;
  }

  renderSeleced() {
    return <div className="card">
        <div className="card-body">
          <Row>
            <Col md={4}>
              <h5 className="card-title"><small style={{color: '#888'}}>your tank </small><br />{this.props.selected.scriptName}</h5>
            </Col>
            <Col md={4}>
              <p className="card-text"><small style={{color: '#888'}}>script snapshot from </small><br />{this.props.selected.joinedAt}</p>
            </Col>
            <Col md={4} className="text-right">
              <button className="btn btn-lg btn-primary league-edit" onClick={() => this.openEditor()}><i className="fas fa-edit"></i> Change</button>
            </Col>
          </Row>
        </div>
      </div>;
  }

  render() {
    if(this.state.editMode) {
      return this.renderEditor();
    }
    if(!this.props.selected) {
      return this.renderEmpty();
    }
    return this.renderSeleced();
  }
}

LeagueJoin.defaultProps = {
  selected: null,
  tankList: [],
  onJoin: () => {},
  onLeave: () => {}
};

LeagueJoin.propTypes = {
  selected: PropTypes.object,
  tankList: PropTypes.array,
  onJoin: PropTypes.func,
  onLeave: PropTypes.func
};
