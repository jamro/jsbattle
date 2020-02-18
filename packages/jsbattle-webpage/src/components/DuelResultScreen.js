import React from "react";
import PropTypes from 'prop-types';
import Row from './Row.js';
import Col from './Col.js';

export default class DuelResultScreen extends React.Component {

  render() {
    return <div className="text-center battle-result">
      <h3>Battle {this.props.hasWon ? "WON" : "LOST"}!</h3>
      <Row style={{marginTop: '2em', marginBottom: '2em'}}>
        <Col md={6}>
          <h4><i className="fas fa-crown"></i> <span className="winner-label">{this.props.winnerName}</span></h4>
          <img src={`img/tank_skin_${this.props.winnerSkin}.png`} alt={this.props.winnerSkin} style={{maxWidth: '10em', marginRight: '-15%'}}/>
          <div><span className="badge badge-light">Score: {this.props.winnerScore.toFixed(1)}</span></div>
        </Col>
        <Col md={6}>
        <h4 className="loser-label">{this.props.loserName}</h4>
        <img src={`img/tank_skin_${this.props.loserSkin}.png`} alt={this.props.loserSkin} style={{maxWidth: '10em', marginLeft: '-15%', transform: 'scaleX(-1)'}} />
        <div><span className="badge badge-light">Score: {this.props.loserScore.toFixed(1)}</span></div>
        </Col>
      </Row>
    </div>;
  }
}


DuelResultScreen.defaultProps = {
  hasWon: false,
  winnerName: '',
  loserName: '',
  winnerSkin: '',
  loserSkin: '',
  winnerScore: '',
  loserScore: '',
};

DuelResultScreen.propTypes = {
  hasWon: PropTypes.bool,
  winnerName: PropTypes.string,
  loserName: PropTypes.string,
  winnerSkin: PropTypes.string,
  loserSkin: PropTypes.string,
  winnerScore: PropTypes.number,
  loserScore: PropTypes.number,
};
