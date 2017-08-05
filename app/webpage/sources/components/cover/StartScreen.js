module.exports = class StartScreen extends React.Component {

  render() {
    return <div>
      <button  type="button" className="btn btn-primary btn-lg" onClick={this.props.onStart}>
        <span className="glyphicon glyphicon-play" aria-hidden="true"></span> START
      </button>
    </div>;
  }
};
