export default class Code extends React.Component {
  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    if(!this.props.highlight) return;
    let node = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
    hljs.highlightBlock(node);
  }

  render() {
    let classes = "hljs " + this.props.className;
    return <pre className={classes}>{this.props.children}</pre>;
  }
}
