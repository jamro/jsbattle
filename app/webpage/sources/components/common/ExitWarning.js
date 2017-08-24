export default class ExitWarning extends React.Component {

  componentDidMount() {
    window.addEventListener("beforeunload", this.warn.bind(this));
  }

  warn(e) {
    if(this.props.disabled) {
      return null;
    }
    let confirmationMessage = 'It looks like you have been editing something. If you leave before saving, your changes will be lost.';
    confirmationMessage = this.props.message ? this.props.message : confirmationMessage;

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.warn);
  }

  render() {
    return null;
  }
}
