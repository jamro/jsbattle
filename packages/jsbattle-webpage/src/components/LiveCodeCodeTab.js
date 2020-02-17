import React from "react";
import CodeArea from './CodeArea.js';
import PropTypes from 'prop-types';

class LiveCodeCodeTab extends React.Component {


  render() {
    return <div style={{marginTop: '0.7em'}}>
        <CodeArea
          className="form-control"
          defaultValue={this.props.defaultValue}
          onChange={(code) => this.props.onChange(code)}
        />
      </div>;
  }
}

LiveCodeCodeTab.defaultProps = {
  defaultValue: '',
  onChange: () => {},
};

LiveCodeCodeTab.propTypes = {
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

export default LiveCodeCodeTab;
