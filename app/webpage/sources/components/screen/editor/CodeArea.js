module.exports = class CodeArea extends React.Component {

  constructor(props) {
    super(props);
    this.textArea = null;
    this.codeMirror = null;
  }

  componentDidMount() {
    this.codeMirror = CodeMirror.fromTextArea(this.textArea, {
      lineNumbers: true,
      mode: "javascript",
      theme: 'ambiance',
      tabSize: 2,
      viewportMargin: Infinity
    });
    this.codeMirror.on('change', (e) => {
      this.props.onChange(this.codeMirror.getValue());
    });
    this.codeMirror.setSize("100%", "100%");
  }

  render() {
    return <textarea
      ref={(txt) => this.textArea = txt}
      defaultValue={this.props.defaultValue}
      onChange={(e) => this.props.onChange(e.target.value)}
      style={{height: 'auto'}}
    />;

  }
};
