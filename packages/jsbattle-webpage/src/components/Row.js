import React from "react";

export default class Row extends React.Component {

  render() {
    return <div className="row" style={this.props.style || {}}>
        {this.props.children}
    </div>;
  }
}
