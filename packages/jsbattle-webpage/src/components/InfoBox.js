import React from "react";
import PropTypes from 'prop-types';

export default class InfoBox extends React.Component {

  render() {
    let boxClass = `alert alert-${this.props.level}`;
    return <div className={boxClass} role="alert">
      <strong>
        <i className="fas fa-info-circle"></i>&nbsp;{this.props.title}
      </strong>
      <span> {this.props.message}{this.props.children}</span>
    </div>;
  }
}


InfoBox.defaultProps = {
  level: 'error',
  title: "Oh snap!",
  message: "Something went wrong",
};

InfoBox.propTypes = {
  level: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
};
