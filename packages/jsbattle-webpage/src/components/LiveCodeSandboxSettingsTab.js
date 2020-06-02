import React from "react";
import PropTypes from 'prop-types';
import Col from './Col.js';
import Row from './Row.js';

class LiveCodeSandboxSettingsTab extends React.Component {

  render() {
    let opponents = this.props.opponents.map((opponent, index) => <option key={opponent.id} value={index}>{opponent.label}</option>);

    let selectedIndex = this.props.opponents.findIndex((opponent) => (opponent.id == this.props.selectedOpponent.id && opponent.source == this.props.selectedOpponent.source));

    return <Row>
        <Col sm={12}>
          <div className="card" style={{marginTop: '1em'}}>
            <div className="card-body debug-container" style={{padding: '1em'}}>
              <form>
                <div className="form-group">
                  <label htmlFor="opponent"><i className="fas fa-crosshairs"></i> Opponent</label>
                  <select className="form-control" id="opponent" value={selectedIndex} onChange={(e) => this.props.onOpponentChange(this.props.opponents[e.target.value])}>
                    {opponents}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="opponent"><i className="fas fa-users-cog"></i> Mode</label>
                  <select className="form-control" id="mode" value={this.props.mode} onChange={(e) => this.props.onBattleModeChange(e.target.value == 'team')}>
                    <option value="duel">Duel</option>
                    <option value="team">Team Deathmatch</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="seed"><i className="fas fa-seedling"></i> RNG Seed</label>
                  <input type="text" className="form-control" id="seed" value={this.props.rngSeed} disabled />
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="lock" checked={this.props.isRngLocked} onChange={(e) => this.props.onRngLock(e.target.checked)} />
                    <label className="form-check-label" htmlFor="lock">
                      Lock RNG
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Col>
      </Row>;
  }
}

LiveCodeSandboxSettingsTab.defaultProps = {
  selectedOpponent: {},
  opponents: [],
  mode: 'duel',
  rngSeed: 0,
  isRngLocked: false,
  onBattleModeChange: () => {},
  onOpponentChange: () => {},
  onRngLock: () => {},
};

LiveCodeSandboxSettingsTab.propTypes = {
  opponents: PropTypes.array,
  selectedOpponent: PropTypes.object,
  rngSeed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isRngLocked: PropTypes.bool,
  mode: PropTypes.oneOf(['duel', 'team']),
  onBattleModeChange: PropTypes.func,
  onOpponentChange: PropTypes.func,
  onRngLock: PropTypes.func,
};

export default LiveCodeSandboxSettingsTab;
