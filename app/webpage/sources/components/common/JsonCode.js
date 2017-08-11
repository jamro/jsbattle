module.exports = class JsonCode extends React.Component {


  formatJSON(data, indent, path) {
    var i, txt, lineBreak, newIndent;
    if(!indent) indent = <span></span>;
    if(!path) path = "";
    if(typeof data == 'string') {
      return <span className="hljs-string">"{data}"</span>;
    }
    if(typeof data == 'number') {
      data = data.toFixed(4);
      while(data.length > 2 && data.charAt(data.length - 1) == '0' && data.charAt(data.length - 2) != '.') {
        data = data.substring(0, data.length - 1);
      }
      data = (data == '-0.0') ? '0' : data;
      return <span className="hljs-number">{data}</span>;
    }
    if(typeof data == 'boolean') {
      return <span className="hljs-literal">{data ? "true" : "false"}</span>;
    }
    if(typeof data == 'undefined') {
      return <span className="hljs-literal">undefined</span>;
    }
    if(data === null) {
      return <span className="hljs-literal">null</span>;
    }
    if(typeof data == 'object' && Array.isArray(data)) {
      txt = [];
      newIndent = <span>{indent}&nbsp;&nbsp;</span>;
      lineBreak = null;
      for(i in data) {
        lineBreak = <br/>;
        txt.push(<span key={path+">"+i}>
          {newIndent}{this.formatJSON(data[i], newIndent, path+">"+i)}<br/>
        </span>);
      }
      return <span>{"["}{lineBreak}
        {txt}
      {lineBreak ? indent : null}{"]"}</span>;
    }
    if(typeof data == 'object') {
      txt = [];
      lineBreak = null;
      newIndent = <span>{indent}&nbsp;&nbsp;</span>;
      for(i in data) {
        lineBreak = <br/>;
        txt.push(<span key={path+">"+i}>
          {newIndent}<span className="hljs-attr">{i}</span>: {this.formatJSON(data[i], newIndent, path+">"+i)}<br/>
        </span>);
      }
      return <span>{"{"}{lineBreak}
        {txt}
      {lineBreak ? indent : null}{"}"}</span>;
    }
    return <span>{String(data)}</span>;
  }

  render() {
    var classes = "hljs " + this.props.className;
    var output = '';
    if(this.props.highlight) {
      output = this.formatJSON(this.props.data);
    } else {
      output = JSON.stringify(this.props.data, null, 2);
    }
    var prefix = "";
    if(this.props.varName) {
      prefix = this.props.varName + " = ";
    }
    return <pre className={classes}>{prefix}{output}</pre>;
  }
};
