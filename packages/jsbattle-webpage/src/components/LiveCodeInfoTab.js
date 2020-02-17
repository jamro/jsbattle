import React from "react";
import PropTypes from 'prop-types';

class LiveCodeInfoTab extends React.Component {

  parseDescription(txt) {
    txt = txt.replace(/(!?\[.*\]\(.*\))/g, '<break-line>$1<break-line>');
    txt = txt.replace(/\n/g, '<break-line><br/><break-line>');
    txt = txt.split('<break-line>');
    txt = txt.map((line, index) => {
      let result;
      result = (/^!\[(.*)\]\((.*)\)$/).exec(line);
      if(result) {
        return <img key={index} src={result[2]} alt={result[1]} />;
      }
      result = (/^\[(.*)\]\((.*)\)$/).exec(line);
      if(result) {
        return <a  key={index} href={result[2]} target="_blank" rel="noopener noreferrer">{result[1]}</a>;
      }
      if(line == '<br/>') {
        return <br key={index}/>;
      }
      return line;
    });

    return txt;
  }

  render() {
    return <div style={{marginTop: '0.7em'}}>
        <p style={{paddingTop: '1em'}}>
          <button className="btn btn-primary start-coding-button"  onClick={(e) => this.props.onSkip(e)}>
            <i className="fa fa-code"></i> Start Coding
          </button>
        </p>
        {this.parseDescription(this.props.info)}
      </div>;
  }
}

LiveCodeInfoTab.defaultProps = {
  info: '',
  onSkip: () => {},
};

LiveCodeInfoTab.propTypes = {
  info: PropTypes.string,
  onSkip: PropTypes.func,
};

export default LiveCodeInfoTab;
