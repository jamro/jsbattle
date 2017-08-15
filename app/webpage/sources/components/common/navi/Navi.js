module.exports = class Navi extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      speed: props.speed ? props.speed : 1,
      quality: props.quality ? props.quality : 1
    };
  }

  speedToName(speed) {
    var label;
    if(speed < 0.1) label = "Super Slow";
    else if(speed < 1) label = "Slow";
    else if(speed == 1) label = "Normal";
    else if(speed < 3) label = "Fast";
    else label = "Super Fast";
    return label;
  }

  qualityToName(q) {
    if(q == 'auto') return 'Auto';
    var label;
    if(q < 0.33) label = "Low";
    else if(q < 0.66) label = "Normal";
    else label = "High";
    return label;
  }

  renderSpeedButton(speed) {
    var label = this.speedToName(speed);
    return <li>
      <a href="#" onClick={() => this.setSpeed(speed)}>{label}</a>
    </li>;
  }

  renderQualityButton(q) {
    var label = this.qualityToName(q);
    return <li>
      <a href="#" onClick={() => this.setQuality(q)}>{label}</a>
    </li>;
  }

  setQuality(q) {
    this.setState({quality: q});
    this.props.onQualityChange(q);
  }

  setSpeed(v) {
    this.setState({speed: v});
    this.props.onSpeedChange(v);
  }

  render() {
    return <nav className="navbar navbar-inverse">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="http://jsbattle.jamro.net"><strong>JsBattle</strong> <small style={{color: '#666666', fontSize: '10px'}}>%%GULP_INJECT_VERSION%%</small></a>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><a href="https://github.com/jamro/jsbattle" target="_blank"><i className="fa fa-github-alt" aria-hidden="true"></i> GitHub</a></li>
            <li><a href="./docs" target="_blank"><i className="fa fa-file-text-o" aria-hidden="true"></i> Docs</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Quality: {this.qualityToName(this.state.quality)} <span className="caret"></span></a>
              <ul className="dropdown-menu">
                {this.renderQualityButton('auto')}
                <li role="separator" className="divider"></li>
                {this.renderQualityButton(0.0)}
                {this.renderQualityButton(0.5)}
                {this.renderQualityButton(1.0)}
              </ul>
            </li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Speed: {this.speedToName(this.state.speed)} <span className="caret"></span></a>
              <ul className="dropdown-menu">
                {this.renderSpeedButton(0.05)}
                {this.renderSpeedButton(0.3)}
                {this.renderSpeedButton(1)}
                {this.renderSpeedButton(2)}
                {this.renderSpeedButton(50)}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>;
  }
};
