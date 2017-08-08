module.exports = class Battlefield extends React.Component {

  render() {
    var style = {};
    if(!this.props.visible) {
      style.display = 'none';
    } else {
      style.display = 'block';
      style.maxWidth = '900px';
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
