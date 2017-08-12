module.exports = class CodeArea extends React.Component {

  constructor(props) {
    super(props);
    this.textArea = null;
    this.codeMirror = null;
  }

  componentDidMount() {

    var orig = CodeMirror.hint.javascript;
    CodeMirror.hint.javascript = function(editor) {
      var hints = {
        settings: {
          SKIN: null
        },
        control: {
          THROTTLE: null,
          BOOST: null,
          TURN: null,
          RADAR_TURN: null,
          GUN_TURN: null,
          SHOOT: null,
          DEBUG: null
        },
        state: {
          x: null,
          y: null,
          angle: null,
          energy: null,
          boost: null,
          collisions: {
            enemy: null,
            wall: null
          },
          radar: {
            angle: null,
            targetingAlarm: null,
            wallDistance: null,
            enemy: {
              id: null,
              x: null,
              y: null,
              angle: null,
              speed: null,
              energy: null
            },
            bullets: {
                id: null,
                x: null,
                y: null,
                angle: null,
                speed: null,
                damage: null
              }
          },
          gun: {
            angle: null,
            reloading: null
          }
        },
        tank: {
          init: null,
          loop: null
        }
      }

      var cursor = editor.getCursor();
      var curLine = editor.getLine(cursor.line).substring(0, cursor.ch);
      var pattern = /([A-Za-z\_\.]*)(\[.+\])?\.[^\.\=]*$/
      var phrase = pattern.exec(curLine);
      phrase = phrase ? phrase[1] : "";
      phrase = phrase.split(".")
      pattern = /([A-Za-z\_]*)$/
      var word = pattern.exec(curLine);
      word = word ? word[0] : "";
      var end = cursor.ch;
      var start = end - word.length;

      var inner = {
        from: CodeMirror.Pos(cursor.line, start),
        to: CodeMirror.Pos(cursor.line, end),
        list: []
      };

      var i;
      var hint = hints;
      for(i=0; i < phrase.length; i++) {
        hint = hint[phrase[i]];
        if(!hint) break;
      }

      if(hint) {
        for(i in hint) {
          if(word == '' || i.substring(0, word.length) == word) {
            inner.list.push(i);
          }
        }

      }

      return (inner.list.length == 0) ? orig(editor) : inner;
    };

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
    this.codeMirror.on('keyup', (cm, event) => {
      var ignoreKeys = [13, 27, 32, 37, 38, 39, 40, 17, 18, 91, 16, 20, 93];
      if (!cm.state.completionActive && ignoreKeys.indexOf(event.keyCode) == -1) {
        CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
      }
    })

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
