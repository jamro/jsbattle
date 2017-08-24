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
      <strong>{this.state.name}</strong>.tank.js &nbsp;
      <a href="#" onClick={() => this.setState({mode: 'edit'})}>
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
        <span className="form-inline">
          <div className="input-group">
            <input ref={(input) => input ? this.onInputCreated(input) : null} type="text" className="form-control" aria-label="..." defaultValue={this.state.name} onChange={(v) => this.onChange(v)}/>
            <div className="input-group-btn">
              <button type="button" className="btn btn-default" onClick={() => this.onEdit()}>
                <i className="fa fa-check" aria-hidden="true"></i>
              </button>
              <button type="button" className="btn btn-default" onClick={() => this.setState({mode: 'normal', error: ''})}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </span>
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
