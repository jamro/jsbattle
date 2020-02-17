import React from "react";
import PropTypes from 'prop-types';

export default class Col extends React.Component {

  render() {
    let classList = [];
    if(this.props.xs) classList.push(`col-xs-${this.props.xs}`);
    if(this.props.sm) classList.push(`col-sm-${this.props.sm}`);
    if(this.props.md) classList.push(`col-md-${this.props.md}`);
    if(this.props.lg) classList.push(`col-lg-${this.props.lg}`);

    return <div className={classList.join(" ") + " " + this.props.className} style={this.props.style || {}}>
      {this.props.children}
    </div>;
  }
}

Col.defaultProps = {
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  className: '',
  style: {},
};

Col.propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};
