module.exports = class DebugView extends React.Component {

  constructor(props) {
    super(props);
    this._unlockChangesLoop = null;
    this._preventChanges = false;
  }

  componentDidMount() {
    this.unlockChanges();
  }

  componentWillUnmount() {
    if(this._unlockChangesLoop) {
      clearTimeout(this._unlockChangesLoop);
      this._unlockChangesLoop = null;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.refreshTime && nextProps.refreshTime != this.props.refreshTime) {
      return true;
    }

    if(nextState && nextState.forceChange) {
      nextState.forceChange = false;
      return true;
    }
    if(this._preventChanges) {
      return false;
    } else {
      this._preventChanges = true;
      return true;
    }
  }

  unlockChanges() {
    if(this._unlockChangesLoop) {
      clearTimeout(this._unlockChangesLoop);
    }
    this._preventChanges=false;
    var self = this;
    this._unlockChangesLoop = setTimeout(() => {
      self.unlockChanges();
    }, this.props.refreshTime ? this.props.refreshTime : 100);
  }
};
