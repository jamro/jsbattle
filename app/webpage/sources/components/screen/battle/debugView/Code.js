module.exports = class Code extends React.Component {
  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    if(!this.props.highlight) return;
    var node = ReactDOM.findDOMNode(this);
    hljs.highlightBlock(node);
  }

  render() {
    var classes = "hljs " + this.props.className;
    return <pre className={classes}>{this.props.children}</pre>;
  }
};
