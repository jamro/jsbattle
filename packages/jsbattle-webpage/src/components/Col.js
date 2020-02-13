import React from "react";

export default class Col extends React.Component {

  render() {
    let classList = [];
    if(this.props.xs) classList.push(`col-xs-${this.props.xs}`);
    if(this.props.sm) classList.push(`col-sm-${this.props.sm}`);
    if(this.props.md) classList.push(`col-md-${this.props.md}`);
    if(this.props.lg) classList.push(`col-lg-${this.props.lg}`);
    if(this.props.extraClass) classList.push(this.props.extraClass);

    return <div className={classList.join(" ") + " " + this.props.className} style={this.props.style || {}}>
      {this.props.children}
    </div>;
  }
}
