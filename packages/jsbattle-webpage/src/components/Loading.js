import React, {Component} from "react";

class Loading extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return <span className="loading"><i className="fas fa-crosshairs fa-spin" /> Loading...</span>;
  }

}

Loading.defaultProps = {

};

Loading.propTypes = {

};
export default Loading;
