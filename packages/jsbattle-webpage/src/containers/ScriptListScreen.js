import React from "react";
import {connect} from 'react-redux';
import {
  createAiScript,
  deleteAiScript,
  getSandboxAiScriptList
} from '../actions/sandboxAction.js';
import {
  notifySandboxOpen,
} from '../actions/statsAction.js';
import FullRow from '../components/FullRow.js';
import Loading from '../components/Loading.js';
import {Link} from 'react-router-dom';
import ScriptTableRow from "../components/ScriptTableRow.js";

class ScriptListScreen extends React.Component {

  componentDidMount() {
    this.props.notifySandboxOpen();
    this.props.getSandboxAiScriptList(this.props.useRemoteService);
  }

  renderRows() {
    if(this.props.isDeleting || this.props.isLoading) {
      return <tr>
        <td colSpan={2}>
          <Loading />
        </td>
      </tr>;
    }
    let tanks = this.props.tankList.rows || [];
    tanks = tanks.map((script) => {
      return <ScriptTableRow
        key={script.id}
        id={script.id}
        name={script.scriptName}
        link={'/sandbox/' + script.id}
        onDelete={(id) => this.props.deleteAiScript(id, this.props.useRemoteService)}
      />;
    });
    if(tanks.length > 0) {
      return tanks;
    }
    return <tr>
      <td colSpan={2}>
        No Tank AIs in the repository. Start from creating one.
      </td>
    </tr>;
  }

  render() {
    let createButton;
    if(this.props.isCreating) {
      createButton = <button type="button" className="btn btn-success btn-lg float-right create-tank" disabled style={{margin: "15px"}}>
        <Loading />
      </button>;
    } else {
      createButton = <button type="button" className="btn btn-success btn-lg float-right create-tank" onClick={() => this.props.createAiScript(this.props.useRemoteService)} style={{margin: "15px"}}>
        <i className="fas fa-plus-circle" aria-hidden="true"></i> Create Tank
      </button>;
    }
    let table = null;
    table = <table className="table ai-table" >
      <thead>
        <tr>
          <th>Tank Name</th>
          <th className="text-right" style={{width: '90px'}}>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        {this.renderRows()}
      </tbody>
    </table>;
    return <div>
      <FullRow>
        <nav className="breadcrumb-container">
          <ol className="breadcrumb">
            <li style={{marginRight: '0.5em'}}><i className="fas fa-angle-right"></i></li>
            <li className="breadcrumb-item"><Link to="/sandbox">Sandbox</Link></li>
          </ol>
        </nav>
      </FullRow>
      <FullRow>
        {createButton}
        {table}
      </FullRow>
    </div>;
  }
}

const mapStateToProps = (state) => ({
  tankList: state.aiRepo.tankList,
  isLoading: state.loading.SANDBOX_AI_SCRIPT_LIST,
  isCreating: state.loading.CREATE_AI_SCRIPT,
  isDeleting: state.loading.DELETE_AI_SCRIPT,
  useRemoteService: state.auth.profile.registered
});

const mapDispatchToProps = (dispatch) => ({
  createAiScript: (useRemoteService) => {
    dispatch(createAiScript(null, useRemoteService));
  },
  deleteAiScript: (name, useRemoteService) => {
    dispatch(deleteAiScript(name, useRemoteService));
  },
  notifySandboxOpen: () => {
    dispatch(notifySandboxOpen());
  },
  getSandboxAiScriptList: (useRemoteService) => {
    dispatch(getSandboxAiScriptList(useRemoteService));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptListScreen);
