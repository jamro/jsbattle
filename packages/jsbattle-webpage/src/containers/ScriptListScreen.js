import React from "react";
import {connect} from 'react-redux';
import {
  createAiScript,
  deleteAiScript,
} from '../actions';
import FullRow from '../components/FullRow.js';
import {Link} from 'react-router-dom';
import ScriptTableRow from "../components/ScriptTableRow.js";
import Stats from '../lib/Stats.js';

class ScriptListScreen extends React.Component {

  componentDidMount() {
    Stats.onSandboxOpen();
  }

  renderRows() {
    let tanks = this.props.tankList;
    tanks = tanks.map((tankName) => {
      return <ScriptTableRow
        key={tankName}
        name={tankName}
        link={'/sandbox/' + tankName}
        onDelete={(name) => this.props.deleteAiScript(name)}
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
        <button type="button" className="btn btn-success btn-lg float-right create-tank" onClick={() => this.props.createAiScript()} style={{margin: "15px"}}>
          <i className="fas fa-plus-circle" aria-hidden="true"></i> Create Tank
        </button>
        <table className="table ai-table" >
          <thead>
            <tr>
              <th>Tank Name</th>
              <th className="text-right" style={{width: '90px'}}>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </FullRow>
    </div>;
  }
}

const mapStateToProps = (state) => ({
  tankList: state.aiRepo.tankList
});

const mapDispatchToProps = (dispatch) => ({
  createAiScript: () => {
    dispatch(createAiScript());
  },
  deleteAiScript: (name) => {
    dispatch(deleteAiScript(name));
  },
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScriptListScreen);
