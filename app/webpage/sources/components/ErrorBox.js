module.exports = class ErrorBox extends React.Component {

  render() {
    if(!this.props.message) return null;
    return <div id="error" className="alert alert-danger" role="alert">
      <strong>
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>&nbsp;Oh snap!
      </strong>
      <span> {this.props.message}</span>
    </div>;
  }
};
