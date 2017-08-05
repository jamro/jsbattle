module.exports = class WinnerScreen extends React.Component {

  render() {
    return <div className="sim-finish">
          <h3>
            <small>{this.props.message}</small><br/> <strong>{this.props.winner ? this.props.winner.fullName : ""}</strong>!
          </h3>
          <button type="button" className="btn btn-primary btn-lg" onClick={this.props.onRestart}>
            <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span> RESTART
          </button>
        </div>;
  }
};
