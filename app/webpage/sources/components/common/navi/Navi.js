export default class Navi extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      speed: props.speed ? props.speed : 1,
      quality: props.quality ? props.quality : 1
    };
  }

  speedToName(speed) {
    let label;
    if(speed < 0.1) label = "Super Slow";
    else if(speed < 1) label = "Slow";
    else if(speed == 1) label = "Normal";
    else if(speed < 3) label = "Fast";
    else label = "Super Fast";
    return label;
  }

  qualityToName(q) {
    if(q == 'auto') return 'Auto';
    let label;
    if(q < 0.33) label = "Low";
    else if(q < 0.66) label = "Normal";
    else label = "High";
    return label;
  }

  renderSpeedButton(speed) {
    let label = this.speedToName(speed);
    return <a href="#" className="dropdown-item" onClick={() => this.setSpeed(speed)}>{label}</a>;
  }

  renderQualityButton(q) {
    let label = this.qualityToName(q);
    return <a href="#" className="dropdown-item" onClick={() => this.setQuality(q)}>{label}</a>;
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
    return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-controls="bs-example-navbar-collapse-1" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="http://jsbattle.jamro.net"><strong>JsBattle</strong> <small style={{color: '#666666', fontSize: '10px'}}>%%GULP_INJECT_VERSION%%</small></a>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><a className="nav-link" href="https://github.com/jamro/jsbattle" target="_blank"><i className="fa fa-github-alt" aria-hidden="true"></i> GitHub</a></li>
            <li className="nav-item"><a className="nav-link" href="./docs" target="_blank"><i className="fa fa-file-text-o" aria-hidden="true"></i> Docs</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown">
              <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Quality: {this.qualityToName(this.state.quality)} <span className="caret"></span></a>
              <div className="nav-item dropdown-menu">
                {this.renderQualityButton('auto')}
                <li role="separator" className="dropdown-divider"></li>
                {this.renderQualityButton(0.0)}
                {this.renderQualityButton(0.5)}
                {this.renderQualityButton(1.0)}
              </div>
            </li>
            <li className="nav-item dropdown">
              <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Speed: {this.speedToName(this.state.speed)} <span className="caret"></span></a>
              <div className="dropdown-menu">
                {this.renderSpeedButton(0.05)}
                {this.renderSpeedButton(0.3)}
                {this.renderSpeedButton(1)}
                {this.renderSpeedButton(2)}
                {this.renderSpeedButton(50)}
              </div>
            </li>
          </ul>
        </div>
    </nav>;
  }
}
