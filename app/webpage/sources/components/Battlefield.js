module.exports = class Battlefield extends React.Component {

  render() {
    var style = {};
    if(!this.props.visible) {
      style.display = 'none';
    }
    return <canvas
      ref={(c) => this.canvas = c }
      className="battlefield"
      width={this.props.width}
      height={this.props.height}
      style={style}
    >
    </canvas>;
  }
};
