export default class UbdDownload extends React.Component {

  getUBD() {
    return this.props.ubd;
  }

  render() {
    let ubdUri = 'data:text/plain;base64,' + btoa(this.getUBD());

    return <div className="card text-white bg-dark" style={{marginTop: '10px'}}>
      <div className="card-body">
        <h5 className="card-title">Ultimate Battle Descriptor</h5>
        <p className="card-text">UBD file contains all the information required to replay the battle later.</p>
        <a href={ubdUri} download="battle.ubd" className="btn btn-light" style={{width: "100%"}}>Download <strong>battle.ubd</strong> file</a>
      </div>
    </div>;
  }
}
