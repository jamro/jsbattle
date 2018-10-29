export default class Loading extends React.Component {

  render() {
    return <div className="text-center" style={{margin: '30px 30px 300px 30px'}}>
      <button className="btn btn-primary btn-lg loading"><i className="fas fa-sync fa-spin"></i> Loading</button>
    </div>;
  }
}
