import React from "react";
import PropTypes from 'prop-types';
import Row from './Row.js';
import Col from './Col.js';

export default class DuelResultScreen extends React.Component {

  render() {
    const winnerScore = (Math.round(this.props.winnerScore*10)/10).toFixed(1);
    const loserScore = (Math.round(this.props.loserScore*10)/10).toFixed(1);
    const header = this.props.showHeader ? <h3 className="result-title">Battle {this.props.hasWon ? "WON" : "LOST"}!</h3> : null;

    return <div className="text-center battle-result">
      {header}
      <Row style={{marginTop: '2em', marginBottom: '2em'}}>
        <Col md={6}>
          <h4><i className="fas fa-crown"></i> <span className="winner-label">{this.props.winnerName}</span></h4>
          <img className="winner-img" src={`img/tank_skin_${this.props.winnerSkin}.png`} alt={this.props.winnerSkin} style={{maxWidth: '10em', marginRight: '-15%'}}/>
          <div><span className="badge badge-light">Score: <span className="winner-score">{winnerScore}</span></span></div>
        </Col>
        <Col md={6}>
          <h4 className="loser-label">{this.props.loserName}</h4>
          <img className="loser-img" src={`img/tank_skin_${this.props.loserSkin}.png`} alt={this.props.loserSkin} style={{maxWidth: '10em', marginLeft: '-15%', transform: 'scaleX(-1)'}} />
          <div><span className="badge badge-light">Score: <span className="loser-score">{loserScore}</span></span></div>
        </Col>
      </Row>
    </div>;
  }
}


DuelResultScreen.defaultProps = {
  showHeader: true,
  hasWon: false,
  winnerName: 'unknown',
  loserName: 'unknown',
  winnerSkin: 'forest',
  loserSkin: 'forest',
  winnerScore: 0,
  loserScore: 0,
};

DuelResultScreen.propTypes = {
  showHeader: PropTypes.bool,
  hasWon: PropTypes.bool,
  winnerName: PropTypes.string,
  loserName: PropTypes.string,
  winnerSkin: PropTypes.string,
  loserSkin: PropTypes.string,
  winnerScore: PropTypes.number,
  loserScore: PropTypes.number,
};
