module.exports = class NumericInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue ? props.defaultValue : 0
    };
  }

  componentDidUpdate(prevProps, prevState)  {
    if(prevState.value != this.state.value && this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  increaseValue() {
    var min = this.props.min !== undefined ? this.props.min : Number.MIN_VALUE;
    var max = this.props.max !== undefined ? this.props.max : Number.MAX_VALUE;
    this.setState((prevState, props) => ({
      value: Math.max(min, Math.min(max, prevState.value+1))
    }));
  }

  decreaseValue() {
    var min = this.props.min !== undefined ? this.props.min : Number.MIN_VALUE;
    var max = this.props.max !== undefined ? this.props.max : Number.MAX_VALUE;
    this.setState((prevState, props) => ({
      value: Math.max(min, Math.min(max, prevState.value-1))
    }));
  }

  render() {
    var classNames = "input-group " + this.props.className;
    var style = this.state.value ? {fontWeight: 'bold'} : {color: '#bbbbbb'};
    return <div className={classNames} style={{width: '150px'}}>
      <div className="input-group-btn">
        <button type="button" className="btn btn-default" onClick={() => this.decreaseValue()}>-</button>
      </div>
      <input type="text" className="form-control text-center" aria-label="..." value={this.state.value} readOnly={true} style={style}/>
      <div className="input-group-btn">
        <button type="button" className="btn btn-default" onClick={() => this.increaseValue()}>+</button>
      </div>
    </div>;
  }
};
