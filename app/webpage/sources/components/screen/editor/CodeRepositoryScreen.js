import FullRow from "../../common/bootstrap/FullRow.js";
import TankTableRow from "../../common/TankTableRow.js";

export default class CodeRepositoryScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tankList: props.aiRepository.getScriptNameList()
    };
  }

  deleteTank(name) {
    this.props.aiRepository.deleteScript(name);
    this.setState({
      tankList: this.props.aiRepository.getScriptNameList()
    });
  }

  createTank() {
    let name = this.props.aiRepository.getRandomScriptName(true);
    let retry = 0;
    while(!this.props.aiRepository.isNameAllowed(name)) {
      name = this.props.aiRepository.getRandomScriptName(false);
      retry++;
      if(retry > 100) {
        throw "Cannot find unique name for the script";
      }
    }

    this.props.aiRepository.createScript(name);
    this.setState({
      tankList: this.props.aiRepository.getScriptNameList()
    });
  }

  renderSettingRows() {
    let tanks = this.state.tankList;
    tanks = tanks.map((tankName) => {
      return <TankTableRow
        key={tankName}
        name={tankName}
        onEdit={(name) => this.props.onScriptEdit(name)}
        onDelete={(name) => this.deleteTank(name)}
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
      <button type="button" className="btn btn-success btn-lg pull-right create-tank" onClick={() => this.createTank()} style={{margin: "15px"}}>
        <i className="fa fa-plus-circle" aria-hidden="true"></i> Create Tank
      </button>
      <table className="table ai-table" >
        <thead>
          <tr>
            <th>Tank Name</th>
            <th className="text-right" style={{width: '90px'}}>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {this.renderSettingRows()}
        </tbody>
      </table>
      </FullRow>
    </div>;
  }
}
