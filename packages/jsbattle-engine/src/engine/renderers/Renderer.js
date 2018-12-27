'use strict';
/**
 * Renders simulation of the battle. The object must be passed to
 * constructor of Simulation object
 * @see Simulation
 */
class Renderer {

  constructor() {

  }

  /**
   * Renders the battlefield. Called only at the beginning. Used usually to render
   * background of the Simulation
   * @param {Battlefield} - battlefield object
   */
  initBatlefield(battlefield) {

  }

  /**
   * @return value from 0 to 1 that represents the current quality of the renderer. This parameter is controlled by Simulation object
   * @see Simulation.setRendererQuality()
   */
  get quality() {
    return 1;
  }

  set quality(v) {

  }

  /**
   * Called before rendering of each frame
   */
  preRender() {

  }

  /**
   * Called after rendering of each frame
   */
  postRender() {

  }

  /**
   * Render a tank
   * @param {Tank} tank - a tank to be rendered
   * @param {Array} events - list of events related to the tank that occurred since the last call of this method
   */
  renderTank(tank, events) {

  }

  /**
   * Renders clock of the battle
   * @param {Number} msElapsed - time that has elapsed (in milliseconds)
   * @param {Number} msLimit - maximum battle duration (in milliseconds)
   */
  renderClock(msElapsed, msLimit) {

  }

  /**
   * Renders statistics of all tanks. Called once per frame
   * @param {Array} tankList - list of all tanks that are involved in the battle
   */
  renderTankStats(tankList) {

  }

  /**
   * Render a bullet
   * @param {Bullet} bullet - a bullet to be rendered
   * @param {Array} events - list of events related to the bullet that occurred since the last call of this method
   */
  renderBullet(bullet, events) {

  }
  /**
   * Sets speed of the simulation. Could be used to time-scale animations so they match simulation speed
   * @pram {Number} multiplier - simulation speed multiplier
   */
  setSpeed(v) {

  }

  stop() {

  }
}
export default Renderer;
