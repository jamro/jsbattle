import FullRow from "../../common/bootstrap/FullRow.js";
import Row from "../../common/bootstrap/Row.js";
import Col from "../../common/bootstrap/Col.js";

export default class FileNameHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'normal',
      name: props.defaultName,
      error: ""
    };
    this.text = props.defaultName;
  }

  renderView() {
    return <h3 className={this.props.className} style={{width: '300px'}}>
      <strong class="tank-name-view">{this.state.name}</strong>.tank.js &nbsp;
      <a href="#" className="rename-button" onClick={() => this.setState({mode: 'edit'})}>
        <small><i className="fa fa-pencil" aria-hidden="true"></i></small>
      </a>
    </h3>;
  }

  onEdit() {
    let newValue = this.text;
    let oldValue = this.state.name;
    let error = null;
    if(this.props.onChange) {
      error = this.props.onChange(newValue, oldValue);
    }
    if(!error) {
      this.setState({name: newValue, error: "", mode: 'normal'});
    } else {
      this.setState({error: error});
    }
  }

  onChange(v) {
    this.text = v.target.value;
  }

  onInputCreated(input) {
    input.focus();
    input.select();
  }

  renderEdit() {
    let errorBox = <div className="input-group">
      <small>
        <span className="alert alert-danger" style={{padding: '5px', marginLeft: '10px'}}>
          <strong>Error: </strong>{this.state.error}
        </span>
      </small>
    </div>;
    if(!this.state.error) {
      errorBox = null;
    }

    return <div className={this.props.className} style={{width: '400px'}}>
      <h3>
        <div className="btn-toolbar">
          <div className="input-group">
            <input ref={(input) => input ? this.onInputCreated(input) : null} type="text" className="form-control ai-name-input" aria-label="..." defaultValue={this.state.name} onChange={(v) => this.onChange(v)}/>
            <div className="input-group-prepend">
              <button type="button" className="btn btn-primary button-name-confirm" onClick={() => this.onEdit()}>
                <i className="fa fa-check" aria-hidden="true"></i>
              </button>
            </div>
            <div className="input-group-append">
              <button type="button" className="btn btn-secondary button-name-cancel" onClick={() => this.setState({mode: 'normal', error: ''})}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </h3>
      {errorBox}
    </div>;
  }

  render() {
    switch (this.state.mode ) {
      case 'normal': return this.renderView();
      case 'edit':   return this.renderEdit();
      default:       return null;
    }
  }
}
