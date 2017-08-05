module.exports = class Row extends React.Component {

  render() {
    return <div className="row">
        <div className="col-md-12">
          {this.props.children}
        </div>
      </div>;
  }
};
