var FullRow = require('../../common/bootstrap/FullRow.js');
var Row = require('../../common/bootstrap/Row.js');
var Col = require('../../common/bootstrap/Col.js');
var NumericInput = require('../../common/NumericInput.js');

module.exports = class TankTableRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      light: 1,
      mode: 'normal'
    };
    this.fadeLoop = null;
  }

  getBgColor() {
    var rStart = parseInt('5c', 16);
    var gStart = parseInt('b8', 16);
    var bStart = parseInt('5c', 16);

    var r  = Math.round(rStart + (1-this.state.light)*(255-rStart));
    var g  = Math.round(gStart + (1-this.state.light)*(255-gStart));
    var b  = Math.round(bStart + (1-this.state.light)*(255-bStart));

    r = r.toString(16);
    if(r.length < 2) {
      r = '0' + r;
    }
    g = g.toString(16);
    if(g.length < 2) {
      g = '0' + g;
    }
    b = b.toString(16);
    if(b.length < 2) {
      b = '0' + b;
    }
    return '#' + r + g + b;
  }

  componentDidMount() {
    this.fadeLoop = setInterval(() => {
      this.setState((prevState, props) => ({
        light: Math.max(0, prevState.light - 0.05)
      }));
      if(this.state.light == 0) {
        clearInterval(this.fadeLoop);
      }
    }, 15);
  }

  componentWillUnmount() {
    clearInterval(this.fadeLoop);
  }

  deleteRow() {
    this.props.onDelete(this.props.name);
    this.setState({mode: 'normal'});
  }

  renderDeleteButton() {
    return <button type="button" className="btn btn-danger"  onClick={() => this.setState({mode: 'confirmDelete'})}>
      <i className="fa fa-trash" aria-hidden="true"></i>
    </button>;
  }

  renderEditButton() {
    return <button type="button" className="btn btn-default" onClick={() => this.props.onEdit(this.props.name)}>
      <i className="fa fa-pencil" aria-hidden="true"></i>
    </button>;
  }

  renderDifficulty(id, rank) {
    var difficultyStars = [];
    if(rank) {
      for(var i=0; i < rank; i++) {
        difficultyStars.push(<i key={id + "-" + i} className="fa fa-star" aria-hidden="true"></i>);
      }
    } else {
      difficultyStars = <span style={{color: '#999999'}}>unknown</span>;
    }
    return difficultyStars;
  }

  renderConfirmDelete() {
      return <tr>
        <td colSpan={4}>
          <button type="button" className="btn btn-danger" onClick={() => this.deleteRow()}>
            Yes, delete AI Script of {this.props.name} tank!
          </button>
          &nbsp;
          <button type="button" className="btn btn-default" onClick={() => this.setState({mode: 'normal'})}>
            Nevermind
          </button>
        </td>
      </tr>;
  }

  renderRowContent() {

    var style = this.state.light ? {backgroundColor: this.getBgColor()} : null;

    return <tr style={style}>
      <td>{this.props.name}</td>
      <td className="text-center">
        {this.renderDifficulty(this.props.name, this.props.difficulty)}
      </td>
      <td className="text-right">
        <div className="btn-group" role="group" aria-label="...">
          {this.props.onEdit ? this.renderEditButton() : null}
          {this.props.onDelete ? this.renderDeleteButton() : null}
        </div>
      </td>
      <td className="block-center">
        <NumericInput
          className="pull-right"
          defaultValue={this.props.count}
          onChange={(v) => this.props.onChange(v)}
          min={0}
          max={10}
        />
      </td>
    </tr>;
  }

  render() {
    switch(this.state.mode) {
      case 'normal': return this.renderRowContent();
      case 'confirmDelete': return this.renderConfirmDelete();
      default:
        console.warn('unsupported mode ' + this.state.mode);
        return null;
    }
  }

};
