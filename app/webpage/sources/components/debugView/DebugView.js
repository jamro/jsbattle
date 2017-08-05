module.exports = class DebugView extends React.Component {

  constructor(props) {
    super(props);
    var debugTankId = localStorage.getItem("settings.debugTankId");
    debugTankId = debugTankId ? debugTankId : 0;
    this.state = {
      debugId: debugTankId
    };
  }

  renderOptions() {
    if(!this.props.tankList) return null;
    return this.props.tankList.map((tank) => {
      return <option key={tank.id} value={tank.id} >
        {tank.name}
      </option>;
    });
  }

  findDebugTank() {
    if(this.state.debugId == 0) return null;
    var self = this;
    return this.props.tankList.find((tank) => {
      return tank.id == self.state.debugId;
    });
  }

  onChange(e) {
    this.setState({debugId: e.target.value});
    localStorage.setItem("settings.debugTankId", e.target.value);
  }

  render() {
    if(!this.props.visible) return null;

    var debugPanel = null;
    var debugTank = this.findDebugTank();
    if(debugTank) {
      debugPanel = <div className="panel-body">
        <small>Debug Data</small>
        <pre>{JSON.stringify(debugTank.debug, null, 2)}</pre>
        <small>State Object</small>
        <pre>{debugTank.state ? JSON.stringify(debugTank.state, null, 2) : ''}</pre>
      </div>;
    }

    return <div className="panel panel-default">
      <div className="panel-heading">
        <select className="form-control" value={this.state.debugId} onChange={(e) => this.onChange(e)}>
          <option value="0">[Select Tank for Debug View]</option>
          {this.renderOptions()}
        </select>
      </div>
      {debugPanel}
    </div>;
  }
};
