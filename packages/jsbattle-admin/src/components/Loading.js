import React, {Component} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {
  faSpinner
} from '@fortawesome/free-solid-svg-icons';

class Loading extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <span className="loading"><FontAwesomeIcon icon={faSpinner} spin /> Loading...</span>;
  }

}

Loading.defaultProps = {

};

Loading.propTypes = {

};
export default Loading;
