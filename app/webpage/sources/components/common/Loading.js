module.exports = class Loading extends React.Component {

  render() {
    return <div className="text-center" style={{margin: '30px'}}>
      <button className="btn btn-primary btn-lg"><i className="fa fa-circle-o-notch fa-spin"></i> Loading</button>
    </div>;
  }
};
