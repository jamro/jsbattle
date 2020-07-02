
import React, {Component} from "react";
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import {
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import {
  faCircle
} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


class SmartTable extends Component {

  constructor(props) {
    super(props);
    this.formatter = {};
    this.formatter.date = (value) => {
      return new Date(value).toLocaleDateString();
    };
    this.formatter.time = (value) => {
      return new Date(value).toLocaleTimeString();
    };
    this.formatter.datetime = (value) => {
      return new Date(value).toLocaleString();
    };
    this.formatter.check = (value) => {
      return value ? <FontAwesomeIcon icon={faCheckCircle} /> : <FontAwesomeIcon icon={faCircle} />;
    };
    this.formatter.urlLink = (value) => {
      return <a href={value} rel="noopener noreferrer" target="_blank">{value}</a>;
    };
    this.formatter.number = (value) => {
      return Number(value).toLocaleString();
    };
    this.formatter.scale = (value) => {
      let scaleClass = 'bg-info';
      if(value > 0.7) {
        scaleClass = 'bg-warning';
      }
      if(value > 0.9) {
        scaleClass = 'bg-danger';
      }
      return <div className="progress">
        <div className={"progress-bar " + scaleClass} role="progressbar" style={{width: Math.round(value*100) + "%"}} aria-valuenow={Math.round(value*100)} aria-valuemin="0" aria-valuemax="100"></div>
      </div>;
    };
    this.formatter.duration = (dt) => {
      dt = Math.round(dt/1000);
      dt = Math.round(dt);
      let s = dt % 60;
      dt = (dt - s)/60;
      let m = dt % 60;
      dt = (dt - m)/60;
      let h = dt % 24;
      dt = (dt - h)/24;
      let d = dt;

      let dUnit = d > 1 ? 'days' : 'day';
      let hUnit = h > 1 ? 'hours' : 'hour';
      let mUnit = 'min';
      let sUnit = 'sec';

      let data = [d, h, m, s];
      let units = [dUnit, hUnit, mUnit, sUnit];
      while(data[0] == 0) {
        data.shift();
        units.shift();
      }
      while(data.length > 2) {
        data.pop();
        units.pop();
      }
      let output = [];
      for(let i=0; i < data.length; i++) {
        output[i] = data[i] + units[i];
      }

      return output.join(' ');
    };

  }

  applyFormatter(format, value, row, col) {
    if(typeof format == 'function') {
      return format(value, row, col);
    }
    if(typeof format == 'string' && this.formatter[format]) {
      return this.formatter[format](value, row, col);
    }
    return value;
  }

  formatField(value, row, col) {
    if(Array.isArray(col.format)) {
      for(let i=0; i < col.format.length; i++) {
        value = this.applyFormatter(col.format[i], value, row, col);
      }
      return value;
    }
    return this.applyFormatter(col.format, value, row, col);
  }

  openPage(pageNumber) {
    pageNumber = Math.max(pageNumber, 1);
    pageNumber = Math.min(pageNumber, this.props.data.totalPages);
    this.props.onPageRequest(pageNumber);
  }

  render() {
    let data = this.props.data || {};
    data.rows = data.rows || [];
    data.total = data.total || 0;
    data.page = data.page || 1;
    data.pageSize = data.pageSize || 10;
    data.totalPages = data.totalPages || 1;

    let header = this.props.columns.map((col, index) => (
      <th key={index}>{col.name}</th>
    ));

    let rows = data.rows.map((row, rowIndex) => {
      let cells = this.props.columns.map((col, cellIndex) => (
        <td key={'row_' + rowIndex + '_cell_' + cellIndex} style={col.style || {}}>
          {this.formatField(row[col.field], row, col)}
        </td>
      ));
      return <tr key={'row_' + rowIndex}>{cells}</tr>;
    });

    let pageButtons = [];
    let range = 4;
    let prevPage = 0;
    for(let i=1; i <= data.totalPages; i++) {
      let inRange = (Math.abs(data.page - i) <= range);
      if(!inRange && i != 1 && i < data.totalPages) {
        continue;
      }
      if(prevPage+1 < i) {
        pageButtons.push(<Pagination.Ellipsis key={'ellipsis_' + i} />);
      }
      if(i == data.page) {
        pageButtons.push(<Pagination.Item key={i} className={'page-' + i} active onClick={() => this.openPage(i)}>{i}</Pagination.Item>);
      } else {
        pageButtons.push(<Pagination.Item key={i} className={'page-' + i} onClick={() => this.openPage(i)}>{i}</Pagination.Item>);
      }
      prevPage = i;
    }

    let pagination = <Pagination className="justify-content-center">
      <Pagination.Prev className="page-prev" onClick={() => this.openPage(Number(data.page)-1)}/>
      {pageButtons}
      <Pagination.Next className="page-next" onClick={() => this.openPage(Number(data.page)+1)}/>
    </Pagination>;
    if(pageButtons.length <= 1) {
      pagination = null;
    }

    return (
        <div>
          <Table striped bordered size="sm" className="smart-table">
            <thead>
              <tr>
                {header}
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>
          <div className="text-xs-center">
            {pagination}
          </div>
      </div>
    );
  }
}

SmartTable.defaultProps = {
  data: {},
  columns: [
    {
      name: 'Column A',
      field: 'col1'
    },
    {
      name: 'Column B',
      field: 'col2'
    }
  ],
  onPageRequest: () => {}
};

SmartTable.propTypes = {
  data: PropTypes.object,
  columns: PropTypes.array,
  onPageRequest: PropTypes.func
};
export default SmartTable;
