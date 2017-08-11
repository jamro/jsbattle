var JsonCode = require('../../../common/JsonCode.js');
var UnfreshComponent = require('../../../common/UnfreshComponent.js');
var InfoBox = require('../../../common/InfoBox.js');

module.exports = class DebugView extends UnfreshComponent {

  constructor(props) {
    super(props);
    var debugTankId = localStorage.getItem("settings.debugTankId");
    debugTankId = debugTankId ? debugTankId : 0;
    this.state = {
      debugId: debugTankId
    };
  }

  componentDidMount() {
    super.componentDidMount();
    if(this.props.onSelect) {
      this.props.onSelect(this.state.debugId);
    }
  }

  renderOptions() {
    if(!this.props.tankList) return null;
    var result = this.props.tankList.map((tank) => {
      return <option key={tank.id} value={tank.id} >
        {tank.name}
      </option>;
    });
    result.sort((a, b) => {
      return Number(a.key) - Number(b.key);
    });
    return result;
  }

  findDebugTank() {
    if(this.state.debugId == 0) return null;
    var self = this;
    return this.props.tankList.find((tank) => {
      return tank.id == self.state.debugId;
    });
  }

  onChange(e) {
    this.setState({debugId: e.target.value, forceChange: true});
    localStorage.setItem("settings.debugTankId", e.target.value);
    if(this.props.onSelect) {
      this.props.onSelect(e.target.value);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.tankList && this.props.tankList && nextProps.tankList.length != this.props.tankList.length) {
      return true;
    }
    return super.shouldComponentUpdate(nextProps, nextState);
  }

  renderDebugPanel() {
    var debugTank = this.findDebugTank();
    if(debugTank) {
      return <div className="panel-body debug-container">
        <small>Debug Data</small>
        <JsonCode className="debug" highlight={this.props.highlight} data={debugTank.debug ? debugTank.debug : {}} />
        <small>State Object</small>
        <JsonCode className="debug" highlight={this.props.highlight} data={debugTank.state ? debugTank.state : {}} />
      </div>;
    } else {
      return null;
    }
  }

  render() {
    if(!this.props.visible) return null;
    return <div>
      <div className="panel panel-default">
        <div className="panel-heading">
          <select className="form-control" value={this.state.debugId} onChange={(e) => this.onChange(e)}>
            <option value="0">[Select Tank for Debug View]</option>
            {this.renderOptions()}
          </select>
        </div>
        {this.renderDebugPanel()}
      </div>
      <InfoBox title="Hint: " level="info">
        <span>
          This panel shows <a href="docs/#/tank_state_object" target="_blank"><strong>state object</ strong></a> of
          the   selected tank and its debug data passed through <a href="docs/#/tank_control_object" target="_blank"><strong>control.DEBUG</strong></a>.
          For more details read <a href="docs/" target="_blank">the docs</a>.
        </span>
      </InfoBox>
    </div>;
  }
};
