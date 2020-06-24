#!/usr/bin/env node
const calculateScore = require('../../app/services/league/lib/calculateScore.js');
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const margin = 20;
const width = 1000 + 2*margin;
const height = 600;


function readScenario(filename) {
  console.log(`Reading ${filename}`);
  const scenario = require(path.resolve(__dirname, 'scenarios', filename));
  return {
    name: filename.replace(/\.scenario\.js$/, ''),
    ...scenario
  }
}

function runScenario(scenario) {
  console.log(`Running ${scenario.name}`);
  let result = [];
  let score = scenario.initScore;
  let fightsWin = 0;
  for(let i=0; i<width; i++) {
    result.push(score);
    let input = scenario.step(i);
    fightsWin += input.winner ? 1 : 0;
    score = calculateScore(score, input.winner, i, fightsWin);
  }
  return {
    name: scenario.name,
    data: result
  };
}

function drawScenario(scenario) {
  console.log(`Generating report of ${scenario.name}`);
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  context.fillStyle = '#fff';
  context.fillRect(0, 0, width, height);
  context.fillStyle = '#f00';
  for(let x=0; x<=(width-2*margin); x++) {
    let bar = Math.round((scenario.data[x]/10000)*(height-2*margin))
    context.fillRect(x+margin, height-bar-margin, 1, bar);
  }

  context.fillStyle = '#000';

  for(let y=0; y<=10; y++) {
    context.fillRect(margin, Math.round(margin + y*(height-2*margin)*0.1), width-2*margin, 1);
  }
  context.fillRect(Math.round(margin), margin, 1, height-2*margin);
  context.fillRect(Math.round(margin + 0.1*width-margin), margin, 1, height-2*margin);
  context.fillRect(Math.round(margin + 0.25*width-margin), margin, 1, height-2*margin);
  context.fillRect(Math.round(margin + 0.5*width-margin), margin, 1, height-2*margin);
  context.fillRect(Math.round(width-margin), margin, 1, height-2*margin);

  context.fillStyle = '#000'
  context.font = '13px Courier'
  context.fillText('Scenario: ' + scenario.name, margin, 16)
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.resolve(__dirname, 'reports', scenario.name + '.png'), buffer);
}


scenarios = fs
  .readdirSync(path.resolve(__dirname, 'scenarios'))
  .filter((f) => f.endsWith('.scenario.js'))
  .map((f) => readScenario(f))
  .map((s) => runScenario(s))
  .map((s) => drawScenario(s))
