import React, {Component} from "react";
import PropTypes from 'prop-types';

class Loading extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <span className="loading"><i className="fas fa-crosshairs fa-spin" /> {this.props.label}</span>;
  }

}

Loading.defaultProps = {
  label: "Loading..."
};

Loading.propTypes = {
  label: PropTypes.string
};

export default Loading;
