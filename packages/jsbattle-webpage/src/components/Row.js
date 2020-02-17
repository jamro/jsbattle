import React from "react";
import PropTypes from 'prop-types';

export default class Row extends React.Component {

  render() {
    return <div className="row" style={this.props.style || {}}>
        {this.props.children}
    </div>;
  }
}

Row.defaultProps = {
  style: {},
};

Row.propTypes = {
  style: PropTypes.object,
};
