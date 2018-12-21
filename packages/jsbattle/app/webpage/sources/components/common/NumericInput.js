export default class NumericInput extends React.Component {

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
    let min = this.props.min !== undefined ? this.props.min : Number.MIN_VALUE;
    let max = this.props.max !== undefined ? this.props.max : Number.MAX_VALUE;
    this.setState((prevState, props) => ({
      value: Math.max(min, Math.min(max, prevState.value+1))
    }));
  }

  decreaseValue() {
    let min = this.props.min !== undefined ? this.props.min : Number.MIN_VALUE;
    let max = this.props.max !== undefined ? this.props.max : Number.MAX_VALUE;
    this.setState((prevState, props) => ({
      value: Math.max(min, Math.min(max, prevState.value-1))
    }));
  }

  render() {
    let classNames = "numeric-input btn-toolbar " + this.props.className;
    let style = this.state.value ? {fontWeight: 'bold'} : {color: '#bbbbbb'};
    return <div className={classNames} style={{width: '150px'}}>
      <div className="input-group">
        <div className="input-group-prepend">
          <button type="button" className="minus btn btn-secondary" onClick={() => this.decreaseValue()}>-</button>
        </div>
        <input type="text" className="form-control text-center" aria-label="..." value={this.state.value} readOnly={true} style={style}/>
        <div className="input-group-append">
          <button type="button" className="plus btn btn-secondary" onClick={() => this.increaseValue()}>+</button>
        </div>
      </div>
    </div>;
  }
}
