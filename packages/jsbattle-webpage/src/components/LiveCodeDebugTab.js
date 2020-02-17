import React from "react";
import JsonCode from './JsonCode.js';
import PropTypes from 'prop-types';

class LiveCodeDebugTab extends React.Component {

  render() {
    return <div style={{fontSize: '0.8em'}}>
      <div className="card" style={{marginTop: '1em'}}>
        <div className="card-body debug-container" style={{padding: '1em'}}>
          <JsonCode
            data={this.props.data}
            highlight={this.props.highlight}
            varName="control.DEBUG"
          />
        </div>
      </div>
    </div>;
  }
}

LiveCodeDebugTab.defaultProps = {
  data: {},
  highlight: true,
};

LiveCodeDebugTab.propTypes = {
  highlight: PropTypes.bool,
};

export default LiveCodeDebugTab;
