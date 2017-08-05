module.exports = class SpeedButton extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    var classes = "btn btn-default" + (this.props.selected ? " btn-warning" : "");
    return <button type="button" className={classes} onClick={this.props.onClick}>
      {this.props.label}
    </button>;
  }
};
