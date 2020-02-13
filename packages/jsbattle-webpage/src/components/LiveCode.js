import React from "react";
import JsBattle from "jsbattle-engine";
import JsonCode from './JsonCode.js';
import Row from './Row.js';
import Loading from './Loading.js';
import CheatSheet from './CheatSheet.js';
import Col from './Col.js';
import CodeArea from './CodeArea.js';
import InfoBox from './InfoBox.js';
import JsBattleBattlefield from "jsbattle-react";
import PropTypes from 'prop-types';

class LiveCode extends React.Component {

  constructor(props) {
    super(props);

    this.battlefield = null;
    this.reloadTimeout = null;

    let aiDefList = (props.code && props.aiDefList.length >= 1) ? this.createAiDefList(props.aiDefList, props.code, props.count) : [];

    this.state = {
      aiDefList: aiDefList,
      tab: props.info ? 'info' : 'code',
      isFinished: false,
      loading: true,
      debug: {}
    };
  }

  componentDidUpdate(prevProps) {
    let oldAiDefList = JSON.stringify(prevProps.aiDefList.map((ai) => ai.toJSON()));
    let newAiDefList = JSON.stringify(this.props.aiDefList.map((ai) => ai.toJSON()));

    if(this.props.code != prevProps.code || oldAiDefList != newAiDefList) {
      console.log("Refreshing aiDefList");
      this.setState((state, props) => ({
        aiDefList: this.createAiDefList(props.aiDefList, props.code, props.count)
      }));
    }
  }

  createAiDefList(template, code, count) {
    if(!this.props.name || !code) {
      return [];
    }
    let aiList = [];
    for(let i = 0; i < count; i++) {
      let ai = JsBattle.createAiDefinition();
      ai.fromCode(this.props.name, code);
      aiList.push(ai);
    }
    return template.concat(aiList);
  }

  onCodeChanged(code) {
    if(this.reloadTimeout) {
      clearTimeout(this.reloadTimeout);
    }
    this.reloadTimeout = setTimeout(() => {
      this.props.onCodeChanged(code);
      this.setState({isFinished: false});
    }, 700);
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

  updateDebug(sim) {
    let result = sim.tankList.filter((t) => t.name == this.props.name);
    if(result.length < 1) {
      this.setState({debug: '{}'});
      return;
    }
    this.setState({debug: result[0].debugData});
  }

  handleBattleFinish(result) {
    console.log("battle finished");
    this.setState({isFinished: true});
    this.props.onFinish(result);
  }

  handleBattleError(error) {
    console.log("battle error: " + error);
    this.setState({error, loading: false});
  }

  handleBattleInit() {
    console.log("battle initialized");
    this.setState({error: null, loading: true});
  }

  handleBattleStart() {
    console.log("battle started");
    this.setState({loading: false});
  }

  restartBattle() {
    if(this.reloadTimeout) {
      clearTimeout(this.reloadTimeout);
    }
    this.setState({isFinished: false});
    if(this.battlefield) {
      console.log("Restarting the battle");
      this.battlefield.restart();
    } else {
      console.log("cannot restart battle. it does not exists");
    }
  }

  renderTabLink(id, icon, label) {
    return <li key={id} className={`nav-item tab-link-${id}`}>
      <a href="javascript:void(0)" className={'nav-link ' + (this.state.tab == id ? 'active' : '')} onClick={() => this.setState({tab: id})}>
        <i className={icon}></i> {label}
      </a>
    </li>;
  }

  render() {
    if(this.props.isLoading) {
      return <Loading />;
    }
    let winBox = null;
    if(this.state.isFinished) {
      winBox = <div className="battle-overlay">
          {this.props.children}
        </div>;
    }
    let errBox = null;
    if(this.state.error) {
      errBox = <div className="battle-overlay">
          <InfoBox message={this.state.error} level="danger"/>
        </div>;
    }

    let loadingBox = null;
    if(this.state.loading) {
      loadingBox = <div className="battle-overlay">
          <i className="fas fa-sync fa-spin"></i> Loading the battle...
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
        {this.parseDescription(this.props.info)}
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

    tabs.cheatsheet = <CheatSheet />;

    this.props.extraTabs.forEach((tab) => {
      tabs[tab.id] = tab.content;
    });


    let tabContent = tabs[this.state.tab];
    let battlefield = null;
    if(this.state.aiDefList.length) {
      battlefield = <JsBattleBattlefield
        ref={(b) => this.battlefield = b }
        debug={false}
        autoResize={true}
        aiDefList={this.state.aiDefList}
        rngSeed={this.props.rngSeed}
        timeLimit={this.props.timeLimit}
        teamMode={this.props.teamMode}
        speed={this.props.simSpeed}
        quality={this.props.simQuality}
        renderer="brody"
        modifier={this.props.modifier}
        onRender={(sim) => this.updateDebug(sim)}
        onFinish={(result) => this.handleBattleFinish(result)}
        onError={(error) => this.handleBattleError(error)}
        onInit={() => this.handleBattleInit()}
        onStart={() => this.handleBattleStart()}
      />;
    }

    let tabLinks = [];
    if(this.props.info) {
      tabLinks.push(this.renderTabLink('info', "fa fa-info-circle", "Info"));
    }
    tabLinks.push(this.renderTabLink('code', "fa fa-code", "Code"));
    tabLinks.push(this.renderTabLink('debug', "fa fa-bug", "Debug"));
    tabLinks.push(this.renderTabLink('cheatsheet', "fa fa-life-ring", "Cheat Sheet"));


    tabLinks = tabLinks.concat(this.props.extraTabs.map((tab) => (
      this.renderTabLink(tab.id, tab.icon, tab.label)
    )));


    return <div>
      <Row>
        <Col md={6}>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="#"><i className="fa fa-search"></i> Battle Preview</a>
            </li>
          </ul>
          {errBox}
          {loadingBox}
          {winBox}
          {battlefield}
        </Col>
        <Col md={6}>
          <ul className="nav nav-tabs live-code-right-tabs">
            {tabLinks}
          </ul>
          {tabContent}
        </Col>
      </Row>
    </div>;
  }
}

LiveCode.defaultProps = {
  list: [],
  extraTabs: [],
  simQuality: 'auto',
  name: 'player',
  count: 1,
  code: '',
  info: '',
  rngSeed: Math.random(),
  timeLimit: 0,
  teamMode: false,
  modifier: () => {},
  simSpeed: 1,
  isLoading: false,
  aiDefList: [],
  onFinish: () => {},
  onCodeChanged: () => {}
};

LiveCode.propTypes = {
  list: PropTypes.array,
  extraTabs: PropTypes.array,
  name: PropTypes.string,
  count: PropTypes.number,
  code: PropTypes.string,
  info: PropTypes.string,
  timeLimit: PropTypes.number,
  teamMode: PropTypes.bool,
  modifier: PropTypes.func,
  aiDefList: PropTypes.array,
  onFinish: PropTypes.func,
  onCodeChanged: PropTypes.func
};

export default LiveCode;
