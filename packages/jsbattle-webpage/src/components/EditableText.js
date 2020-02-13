import PropTypes from 'prop-types';
import React from "react";
import Loading from "./Loading.js";

class FocusedTextInput extends React.Component {

  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  componentDidMount() {
    this.input.current.focus();
    this.input.current.select();
  }

  render() {
    return <input
      ref={this.input}
      type="text"
      className="form-control form-control-sm ai-name-input"
      defaultValue={this.props.defaultValue}
      onChange={(e) => this.props.onChange(e)} />;
  }
}


export default class EditableText extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mode: 'normal',
      name: props.name
    };
  }

  renderView() {
    return <span style={{width: '300px'}}>
      <strong className="tank-name-view">{this.props.name}</strong> &nbsp;
      <a href="javascript:void(0)" className="rename-button" onClick={() => this.setState({mode: 'edit'})}>
        <small><i className="fas fa-pen" aria-hidden="true"></i></small>
      </a>
    </span>;
  }

  onEdit() {
    this.props.onChange(this.state.name, this.props.name);
    this.setState({mode: 'normal'});
  }

  onChange(e) {
    this.setState({name: e.target.value});
  }

  onInputCreated(input) {
    input.focus();
    input.select();
  }

  renderEdit() {
    return <span style={{display: 'inline-block', marginTop: '-0.25em'}}>
      <span className="input-group">
        <FocusedTextInput defaultValue={this.props.name} onChange={(e) => this.onChange(e)} />
        <span className="input-group-prepend">
          <button type="button" className="btn btn-primary btn-sm button-name-confirm" onClick={() => this.onEdit()}>
            <i className="fas fa-check" aria-hidden="true"></i>
          </button>
        </span>
        <span className="input-group-append">
          <button type="button" className="btn btn-secondary btn-sm button-name-cancel" onClick={() => this.setState({mode: 'normal'})}>
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </span>
      </span>
    </span>;
  }

  render() {
    if(this.props.loading) {
      return <Loading />;
    }
    switch (this.state.mode ) {
      case 'normal': return this.renderView();
      case 'edit':   return this.renderEdit();
      default:       return null;
    }
  }
}

EditableText.defaultProps = {
  name: '',
  onChange: () => {},
  loading: false
};

EditableText.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  loading: PropTypes.bool
};
