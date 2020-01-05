import FullRow from "../../common/bootstrap/FullRow.js";
import Row from "../../common/bootstrap/Row.js";
import Col from "../../common/bootstrap/Col.js";
import JsonCode from "../../common/JsonCode.js";
import CodeArea from "../../common/editor/CodeArea.js";
import JsBattleBattlefield from "jsbattle-react";
import JsBattle from "jsbattle-engine";
import InfoBox from "../../common/InfoBox.js";
import cheatsheet from '../../../lib/cheatsheet.js';

export default class ChallengeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      aiDefList: this.createAiDefList(props.aiDefList, this.props.code),
      tab: 'info',
      hasWon: false,
      debug: {}
    };
    this.battlefield = null;
    this.reloadTimeout = null;
  }

  createAiDefList(template, code) {
    let ai = JsBattle.createAiDefinition();
    ai.fromCode('player', code);
    return template.concat([ai]);
  }

  componentDidMount() {
    if(this.props.showInfo) {
      $('#challengeInfo').modal('show');
    }
  }

  onCodeChanged(code) {
    console.log("Challenge code changed");
    this.props.onCodeChanged(code);
    if(this.reloadTimeout) {
      clearTimeout(this.reloadTimeout);
    }
    this.reloadTimeout = setTimeout(() => {
      this.setState({
        aiDefList: this.createAiDefList(this.props.aiDefList, code)
      });
      console.log("Restarting battle of the challenge");
    }, 1000);
  }

  parseDescription(txt) {
    txt = txt.replace(/(!?\[.*\]\(.*\))/g, '<break-line>$1<break-line>');
    txt = txt.replace(/\n/g, '<break-line><br/><break-line>');
    txt = txt.split('<break-line>');
    txt = txt.map((line) => {
      let result;
      result = (/^!\[(.*)\]\((.*)\)$/).exec(line);
      if(result) {
        return <img src={result[2]} alt={result[1]} />;
      }
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

  handleBattleFinish(result) {
    console.log("Challenge battle finished");
    let tanksLeft = result.tankList.filter((t) => t.energy > 0);
    let playerWon = result.tankWinner.name.toLowerCase() == 'player';
    if(tanksLeft.length != 1 || !playerWon) {
      console.log("Challenge battle lost");
      console.log("Restarting battle of the challenge");
      return this.battlefield.restart();
    }
    this.setState({hasWon: true});
    this.props.onComplete();
  }

  updateDebug(sim) {
    let result = sim.tankList.filter((t) => t.name == 'player');
    if(result.length < 1) {
      this.setState({debug: '{}'});
      return;
    }
    this.setState({debug: result[0].debugData});
  }

  restartBattle() {
    if(this.reloadTimeout) {
      clearTimeout(this.reloadTimeout);
    }
    this.setState({hasWon: false});
    console.log("Restarting battle of the challenge");
    this.battlefield.restart();
  }

  render() {
    let winBox = null;
    if(this.state.hasWon) {
      winBox = <div className="battle-overlay">
          <div className="jumbotron text-center">
            <h4 className="congrats-msg result-msg"><i className="fas fa-trophy d-none d-lg-inline d-xl-inline"></i> Challenge Completed!</h4>
            <p className="d-none d-lg-block d-xl-block">Good job! You did it! Now try something more difficult - the next challenge is waiting for you.</p>
            <button onClick={() => this.props.onNextChallenge()} className="btn btn-primary btn-lg next-challenge" href="#" role="button">
              Next Challenge
              &nbsp;
              <i className="fas fa-play"></i>
            </button>
          </div>
        </div>;
    }
    let errBox = null;
    if(this.state.error) {
      errBox = <div className="battle-overlay">
          <InfoBox message={this.state.error} level="danger"/>
        </div>;
    }
    let tabs = {};

    tabs.code = <div style={{marginTop: '0.7em'}}>
        <CodeArea
          className="form-control"
          defaultValue={this.props.code}
          onChange={(code) => this.onCodeChanged(code)}
        />
      </div>;

    tabs.info = <div style={{marginTop: '0.7em'}}>
        <p style={{paddingTop: '1em'}}>
          <button className="btn btn-primary start-coding-button"  onClick={() => this.setState({tab: 'code'})}>
            <i className="fa fa-code"></i> Start Coding
          </button>
        </p>
        {this.parseDescription(this.props.description)}
      </div>;

    tabs.debug = <div style={{fontSize: '0.8em'}}>
      <div className="card" style={{marginTop: '1em'}}>
        <div className="card-body debug-container" style={{padding: '1em'}}>
          <JsonCode
            data={this.state.debug}
            highlight={true}
            varName="control.DEBUG"
          />
        </div>
      </div>
    </div>;


    tabs.cheatsheet = <div style={{fontSize: '0.8em'}}>
      <Row>
        <Col sm={6}>
          <div className="card" style={{marginTop: '1em'}}>
            <div className="card-body debug-container" style={{padding: '1em'}}>
              <JsonCode
                data={cheatsheet.settings}
                highlight={true}
                varName="settings"
              />
            </div>
          </div>
          <div className="card" style={{marginTop: '1em'}}>
            <div className="card-body debug-container" style={{padding: '1em'}}>
              <JsonCode
                data={cheatsheet.info}
                highlight={true}
                varName="info"
              />
            </div>
          </div>
          <div className="card" style={{marginTop: '1em'}}>
            <div className="card-body debug-container" style={{padding: '1em'}}>
              <JsonCode
                data={cheatsheet.control}
                highlight={true}
                varName="control"
              />
            </div>
          </div>
        </Col>
        <Col sm={6}>
          <div className="card" style={{marginTop: '1em'}}>
            <div className="card-body debug-container" style={{padding: '1em'}}>
              <JsonCode
                data={cheatsheet.state}
                highlight={true}
                varName="state"
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>;

    let tabContent = tabs[this.state.tab];
    return <div>
      <FullRow>
        <nav className="breadcrumb-container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#" onClick={() => this.props.onClose()}>Challenges</a></li>
            <li className="breadcrumb-item active" aria-current="page">Level {this.props.level}: {this.props.name}</li>
          </ol>
          <button type="button" className="btn btn-sm btn-primary restart-challenge-battle" onClick={() => this.restartBattle()}>
            <i className="fas fa-sync" aria-hidden="true"></i> Restart the Battle
          </button>
        </nav>

      </FullRow>
      <Row>
        <Col md={6}>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="#"><i className="fa fa-search"></i> Battle Preview</a>
            </li>
          </ul>
          {errBox}
          {winBox}
          <JsBattleBattlefield
            ref={(battlefield) => this.battlefield = battlefield }
            autoResize={true}
            aiDefList={this.state.aiDefList}
            rngSeed={this.props.rngSeed}
            timeLimit={this.props.timeLimit}
            speed={this.props.speed}
            quality={this.props.quality}
            renderer={this.props.renderer}
            modifier={this.props.modifier}
            onRender={(sim) => this.updateDebug(sim)}
            onFinish={(result) => this.handleBattleFinish(result)}
            onError={(error) => this.setState({error})}
            onInit={() => this.setState({error: null})}
          />
        </Col>
        <Col md={6}>
          <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className={'nav-link ' + (this.state.tab == 'info' ? 'active' : '')} href="#" onClick={() => this.setState({tab: 'info'})}>
              <i className="fa fa-info-circle"></i> Info
            </a>
          </li>
            <li className="nav-item">
              <a className={'nav-link ' + (this.state.tab == 'code' ? 'active' : '')} href="#" onClick={() => this.setState({tab: 'code'})}>
                <i className="fa fa-code"></i> Code
              </a>
            </li>
            <li className="nav-item">
              <a className={'nav-link ' + (this.state.tab == 'debug' ? 'active' : '')} href="#" onClick={() => this.setState({tab: 'debug'})}>
                <i className="fa fa-bug"></i> Debug
              </a>
            </li>
            <li className="nav-item">
              <a className={'nav-link ' + (this.state.tab == 'cheatsheet' ? 'active' : '')} href="#" onClick={() => this.setState({tab: 'cheatsheet'})}>
                <i className="fas fa-life-ring"></i> Cheat Sheet
              </a>
            </li>
          </ul>
          {tabContent}
        </Col>
      </Row>
    </div>;
  }
}
