export default class BattleShareLink extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.clipboard = new ClipboardJS('.btn');
  }

  getUBD() {
    return this.props.ubd;
  }

  getShareLink() {
    return this.props.shareLink;
  }

  downloadShareLink() {
    this.setState({loading: true});
    this.props.onShare(() => {
      this.setState({loading: false});
    });
  }

  handleFocus(event) {
    event.target.select();
  }

  render() {

    let shareControl;
    if(this.state.loading) {
      shareControl = <button className="btn btn-light disabled" style={{width: "100%"}} disabled>Loading...</button>;
    } else {
      if(this.getShareLink()) {
        shareControl = <div className="input-group mb-2 mr-sm-2">
            <input id="battle-share-link" type="text" className="form-control col-10" value={this.getShareLink()} readonly="readonly" onFocus={this.handleFocus} onClick={this.handleFocus} />
            <div className="input-group-append">
              <button className="btn btn-dark text-white" data-clipboard-target="#battle-share-link"><i className="fas fa-paste" aria-hidden="true"></i></button>
            </div>
          </div>;
      } else {
        shareControl = <button id="battle-share-button" className="btn btn-light" style={{width: "100%"}} onClick={() => this.downloadShareLink()}>
            <i className="fas fa-share" aria-hidden="true"></i> Get Battle share link
          </button>;
      }

    }

    return <div className="card text-white bg-info" style={{marginTop: '10px'}}>
      <div className="card-body">
        <h5 className="card-title">Share the battle</h5>
        <p className="card-text">Get a shareable link and show the battle to your friends.</p>
        {shareControl}
      </div>
    </div>;
  }
}
