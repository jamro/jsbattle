module.exports = class LoadingScreen extends React.Component {

  render() {
    return <div>
      <button type="button" className="btn btn-lg" disabled="disabled">
        <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span> LOADING...
      </button>
    </div>;
  }
};
