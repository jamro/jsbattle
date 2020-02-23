import {Link} from 'react-router-dom';
import React from "react";
import PropTypes from 'prop-types';

export default class ScriptTableRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      light: 1,
      mode: 'normal'
    };
    this.fadeLoop = null;
    this.columns = 3;
    if(this.props.difficulty === undefined) {
      this.columns--;
    }
  }

  getBgColor() {
    let rStart = parseInt('5c', 16);
    let gStart = parseInt('b8', 16);
    let bStart = parseInt('5c', 16);

    let r  = Math.round(rStart + (1-this.state.light)*(255-rStart));
    let g  = Math.round(gStart + (1-this.state.light)*(255-gStart));
    let b  = Math.round(bStart + (1-this.state.light)*(255-bStart));

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
      this.setState((prevState) => ({
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
    this.props.onDelete(this.props.id);
    this.setState({mode: 'normal'});
  }

  renderDeleteButton() {
    return <button type="button" className="btn btn-danger tank-remove"  onClick={() => this.setState({mode: 'confirmDelete'})}>
      <i className="fas fa-trash" aria-hidden="true"></i>
    </button>;
  }

  renderEditButton() {
    return <Link type="button" className="btn btn-secondary tank-edit" to={this.props.link}>
      <i className="fas fa-pen" aria-hidden="true"></i>
    </Link>;
  }

  renderDifficulty(id, rank) {
    let difficultyStars = [];
    if(rank) {
      for(let i=0; i < rank; i++) {
        difficultyStars.push(<i key={id + "-" + i} className="fas fa-star" aria-hidden="true"></i>);
      }
    } else {
      difficultyStars = <span style={{color: '#999999'}}>unknown</span>;
    }
    return difficultyStars;
  }

  renderConfirmDelete() {
      return <tr>
        <td colSpan={this.columns} className="tank-remove-confirm">
          <button type="button" className="btn btn-danger tank-remove-confirm-yes" onClick={() => this.deleteRow()}>
            Yes, delete AI Script of {this.props.name} tank!
          </button>
          &nbsp;
          <button type="button" className="btn btn-secondary tank-remove-confirm-no" onClick={() => this.setState({mode: 'normal'})}>
            Nevermind
          </button>
        </td>
      </tr>;
  }

  renderRowContent() {

    let style = this.state.light ? {backgroundColor: this.getBgColor()} : null;

    let difficultyCell = null;
    if(this.props.difficulty !== undefined) {
      difficultyCell = <td className="text-center tank-difficulty">
        {this.renderDifficulty(this.props.name, this.props.difficulty)}
      </td>;
    }

    return <tr style={style}>
      <td className="tank-name">{this.props.name}</td>
      {difficultyCell}
      <td className="text-right tank-actions">
        <div className="btn-group" role="group" aria-label="...">
          {this.props.link ? this.renderEditButton() : null}
          {this.props.onDelete ? this.renderDeleteButton() : null}
        </div>
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

}

ScriptTableRow.defaultProps = {
  id: '',
  name: 'unknown',
  link: '',
  difficulty: undefined,
  onDelete: () => {},
};

ScriptTableRow.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  link: PropTypes.string,
  difficulty: PropTypes.number,
  onDelete: PropTypes.func,
};
