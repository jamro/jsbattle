import React from "react";
import PropTypes from 'prop-types';
import FullRow from "../components/FullRow.js";
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
      joinButton = <p><button className="btn btn-primary btn-lg league-join" style={{width: "100%"}} onClick={() => this.join()}><i className="fas fa-check"></i> Join</button></p>;
      tankSelect = <div>
          <small style={{color: '#888'}}>your tank: </small>
          <select className="custom-select custom-select-lg mb-3" style={{width: "100%"}}  value={this.state.newSubmissionId} onChange={(e) => this.onSubmissionChange(e)}>
            {options}
          </select>
        </div>;
    } else {
      tankSelect = <div style={{padding: '3em'}}>
          <div>Create script in <a href="#/sandbox">Sanbox</a> mode to join the league.</div>
          <hr/>
        </div>;
    }
    if(this.props.selected) {
      leaveButton = <p><button className="btn btn-danger btn-lg  league-leave" style={{width: "100%"}} onClick={() => this.leave()}><i className="fas fa-sign-out-alt"></i> Leave</button></p>;
    }

    return <div className="card text-white bg-dark">
        <div className="card-body">
          <form>
            {tankSelect}
            {joinButton}
            {leaveButton}
            <p><button className="btn btn-secondary btn-lg league-cancel" style={{width: "100%"}} onClick={() => this.closeEditor()}><i className="fas fa-times"></i> Cancel</button></p>
          </form>
        </div>
      </div>;
  }

  renderEmpty() {
    return <div className="card text-white bg-dark">
        <div className="card-body">
          <FullRow>
            <div style={{padding: '3em'}}>Test your AI coding skills and compete in JsBattle League with others.</div>
          </FullRow>
          <hr/>
          <FullRow>
            <button className="btn btn-lg btn-primary league-edit" style={{width: "100%"}} onClick={() => this.openEditor()}><i className="fas fa-trophy"></i> Join</button>
          </FullRow>
        </div>
      </div>;
  }

  renderSeleced() {
    return <div className="card text-white bg-dark">
        <div className="card-body">
          <Row>
            <Col md={12} className="text-center">
              <h1 className="card-title"><small style={{color: '#888', fontSize: '0.4em'}}>your tank </small><br />{this.props.selected.scriptName}</h1>
              <hr />
              <p className="card-text"><small style={{color: '#888'}}>script snapshot from </small><br />{new Date(this.props.selected.joinedAt).toLocaleString()}</p>
              <hr />
              <button className="btn btn-lg btn-primary league-edit" onClick={() => this.openEditor()} style={{width: "100%"}}><i className="fas fa-edit"></i> Change</button>
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
