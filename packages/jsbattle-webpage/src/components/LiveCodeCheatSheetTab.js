import React from "react";
import JsonCode from './JsonCode.js';
import Row from './Row.js';
import Col from './Col.js';
import cheatsheet from '../lib/cheatsheet.js';

class LiveCodeCheatSheetTab extends React.Component {

  render() {
    return <div style={{fontSize: '0.8em'}}>
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
  }
}

LiveCodeCheatSheetTab.defaultProps = {

};

LiveCodeCheatSheetTab.propTypes = {

};

export default LiveCodeCheatSheetTab;
