var SpeedButton = require('./SpeedButton.js');

module.exports = class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      speed: props.speed ? props.speed : 1
    };
  }

  renderSpeedButton(speed) {
    var label;
    if(speed < 0.1) label = "Super Slow";
    else if(speed < 1) label = "Slow";
    else if(speed == 1) label = "Normal";
    else if(speed < 10) label = "Fast";
    else label = "Super Fast";
    return <SpeedButton
      label={label}
      value={speed}
      selected={this.state.speed == speed}
      onClick={() => this.setSpeed(speed)}
    />;
  }

  setSpeed(v) {
    this.setState({speed: v});
    this.props.onSpeedChange(v);
  }

  render() {
    return <span>
      <h1 className="pull-left">JsBattle</h1>
      <span className="pull-right" style={{marginTop: '35px', marginLeft: '10px'}}>
        <div className="btn-group btn-group-xs" role="group" aria-label="...">
          {this.renderSpeedButton(0.05)}
          {this.renderSpeedButton(0.3)}
          {this.renderSpeedButton(1)}
          {this.renderSpeedButton(8)}
          {this.renderSpeedButton(50)}
        </div>
      </span>
      <span className="pull-right" style={{marginTop: '35px'}}>
        <div className="btn-group btn-group-xs" role="group" aria-label="...">
          <a href="./docs" type="button" target="_blank" className="btn btn-primary">
            Documentation
          </a>
        </div>
      </span>
    </span>;
  }
};
