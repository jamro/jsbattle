export default class UbdUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ubdErrorMessage: null
    };
  }

  onUbdLoad(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    let self = this;
    reader.onload = function (e) {
      let content = e.target.result;
      let descriptor = JsBattle.createUBD();
      try {
        content = content.split("base64,")[1];
        content = atob(content);
        descriptor.decode(content);
      } catch (err) {
        console.log(err);
        self.setState({
          ubdErrorMessage: "Error! Cannot parse *.UBD file!",
          rngSeed: Math.random()
        });
        return;
      }
      self.setState({
        ubdErrorMessage: null
      });
      self.props.onStart(
        descriptor.getAiList(),
        {
          teamMode: descriptor.getTeamMode(),
          rngSeed: descriptor.getRngSeed()
        }
      );
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  render() {
    let ubdError = <div className="alert alert-danger" role="alert" style={{marginTop: "5px"}}>
      <i class="fa fa-exclamation-circle" aria-hidden="true"></i> {this.state.ubdErrorMessage}
    </div>;

    if(!this.state.ubdErrorMessage) {
      ubdError = null;
    }

    return <div className="card text-white bg-dark" style={{marginTop: '10px'}}>
      <div className="card-body">
        <h5 className="card-title">Ultimate Battle Descriptor</h5>
        <p className="card-text">
          UBD files contain all the information required to replay a battle. If you have an *.UBD file,
          load it here to re-watch the competition.
          <input
            onChange={(e) => this.onUbdLoad(e)}
            className="btn btn-light"
            style={{marginTop: "20px", width: "100%"}}
            type="file" id="ubdUpload"
            name="ubdFile"
            accept=".ubd"
          />
          {ubdError}
        </p>
      </div>
    </div>;
  }
}
