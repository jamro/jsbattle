import FullRow from "../../common/bootstrap/FullRow.js";
import Row from "../../common/bootstrap/Row.js";
import Col from "../../common/bootstrap/Col.js";
import JsonCode from "../../common/JsonCode.js";
import CodeArea from "../../common/editor/CodeArea.js";
import VerticalSplit from "../../common/VerticalSplit.js";
import JsBattleBattlefield from "jsbattle-react";

export default class ChallengeEditorScreen extends React.Component {

  constructor(props) {
    super(props);
    this.battlefield = null;
    this.reloadTimeout = null;
  }

  componentDidMount() {
    if(this.props.showInfo) {
      $('#challengeInfo').modal('show');
    }
  }

  onCodeChanged(code) {
    this.props.onCodeChanged(code);
    if(this.reloadTimeout) {
      clearTimeout(this.reloadTimeout);
    }
    this.reloadTimeout = setTimeout(() => {
      this.battlefield.restart();
    }, 700);
  }

  parseDescription(txt) {
    txt = txt.replace(/(\[.*\]\(.*\))/g, '<break-line>$1<break-line>');
    txt = txt.replace(/\n/g, '<break-line><br/><break-line>');
    txt = txt.split('<break-line>');
    txt = txt.map((line) => {
      let result;
      result = (/^\[(.*)\]\((.*)\)$/).exec(line);
      if(result) {
        return <a href={result[2]} target="_blank" rel="noopener noreferrer">{result[1]}</a>;
      }
      if(line == '<br/>') {
        return <br/>;
      }
      return line;
    });

    return txt;
  }

  render() {
    console.log(this.props.aiDefList);
    return <div>
      <FullRow>
        <button type="button" className="btn btn-secondary float-right close-challenge" onClick={() => this.props.onClose()}>
          <i className="fas fa-times" aria-hidden="true"></i> Close
        </button>
        <button className="btn btn-secondary float-right open-challenge-info" style={{marginRight: '5px'}}  data-toggle="modal" data-target="#challengeInfo">
          <i className="fas fa-info-circle"></i> Info
        </button>
        <button type="button" className="btn btn-primary float-right editor-fight" style={{marginRight: '5px'}} onClick={() => this.props.onStart()}>
          <i className="fas fa-play" aria-hidden="true"></i> Start the Battle
        </button>
        <div className="modal fade" id="challengeInfo" tabIndex="-1" role="dialog" aria-labelledby="challengeInfoLabel" aria-hidden="true">
          <div className="modal-dialog" role="document" style={{minWidth: '80%'}}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="challengeInfoLabel"><i className="fas fa-info-circle"></i> Level {this.props.level}: {this.props.name}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.parseDescription(this.props.description)}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary close-challenge-info" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </FullRow>
      <Row>
        <Col md={6}>
          <JsBattleBattlefield
            ref={(battlefield) => this.battlefield = battlefield }
            autoResize={true}
            aiDefList={this.props.aiDefList}
            rngSeed={this.props.rngSeed}
            timeLimit={this.props.timeLimit}
            speed={this.props.speed}
            quality={this.props.quality}
            renderer={this.props.renderer}
            modifier={this.props.modifier}
          />
        </Col>
        <Col md={6}>
          <CodeArea
            className="form-control"
            defaultValue={this.props.code}
            onChange={(code) => this.onCodeChanged(code)}
          />
        </Col>
      </Row>
    </div>;
  }
}
