import React from "react";
import PropTypes from 'prop-types';

export default class CodeArea extends React.Component {

  constructor(props) {
    super(props);
    this.textArea = null;
    this.codeMirror = null;
    this.oldValue = this.props.defaultValue;
  }

  componentWillUnmount() {
    if(!this.codeMirror) {
      return;
    }
    this.codeMirror.setOption("mode", "text/x-csrc");
    this.codeMirror.getWrapperElement().parentNode.removeChild(this.codeMirror.getWrapperElement());
    this.codeMirror=null;
  }

  componentDidMount() {
    let orig = CodeMirror.hint.javascript;
    CodeMirror.hint.javascript = function(editor) {
      let hints = {
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
            ally: {
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
          },
          radio: {
            inbox: null
          }
        },
        tank: {
          init: null,
          loop: null
        },
        info: {
          id: null,
          team: {
            name: null,
            mates: null
          }
        }
      };

      let cursor = editor.getCursor();
      let curLine = editor.getLine(cursor.line).substring(0, cursor.ch);
      let lastCharacter = curLine.substr(curLine.length-1, 1);
      let pattern = /[A-Za-z.]/;
      if(!pattern.test(lastCharacter)) {
        return {
          from: CodeMirror.Pos(cursor.line, cursor.ch),
          to: CodeMirror.Pos(cursor.line, cursor.ch),
          list: []
        };
      }
      pattern = /([A-Za-z_.]*)(\[.+\])?\.[^.=]*$/;
      let phrase = pattern.exec(curLine);
      phrase = phrase ? phrase[1] : "";
      phrase = phrase.split(".");
      pattern = /([A-Za-z_]*)$/;
      let word = pattern.exec(curLine);
      word = word ? word[0] : "";
      let end = cursor.ch;
      let start = end - word.length;

      let inner = {
        from: CodeMirror.Pos(cursor.line, start),
        to: CodeMirror.Pos(cursor.line, end),
        list: []
      };

      let i;
      let hint = hints;
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
      viewportMargin: Infinity,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
    });
    this.codeMirror.on('change', () => {
      let newValue = this.codeMirror.getValue();
      if(this.oldValue != newValue) {
        this.props.onChange(newValue);
        this.oldValue = newValue;
      }
    });
    this.codeMirror.on('keyup', (cm, event) => {
      let ignoreKeys = [37, 38, 39, 40, 32, 13];
      if (ignoreKeys.indexOf(event.keyCode) == -1) {
        CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
      }
    });

    this.codeMirror.setSize("100%", "100%");
    this.textArea.codeMirror = this.codeMirror; // expose for testing purposes
    this.codeMirror.display.input.getField().classList.add('cm-display-input');  // expose for testing purposes
  }

  render() {
    return <textarea
      className="code-editor"
      ref={(txt) => this.textArea = txt}
      defaultValue={this.props.defaultValue}
      onChange={(e) => this.props.onChange(e.target.value)}
    />;

  }
}

CodeArea.defaultProps = {
  defaultValue: '',
  onChange: () => {}
};

CodeArea.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};
