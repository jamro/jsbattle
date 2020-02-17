import React from "react";
import Col from "./Col.js";
import PropTypes from 'prop-types';

export default class FullRow extends React.Component {

  render() {
    return <div className="row" style={this.props.style || {}}>
      <Col xs={12} sm={12} md={12} lg={12} >
        {this.props.children}
      </Col>
    </div>;
  }
}


FullRow.defaultProps = {
  style: {},
};

FullRow.propTypes = {
  style: PropTypes.object,
};
