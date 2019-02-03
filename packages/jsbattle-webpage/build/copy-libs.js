#!/usr/bin/env node

const cpx = require("cpx");
const fs = require('fs');
const path = require('path');

let rawdata = fs.readFileSync(__dirname + "/libs.json");
let libsdata = JSON.parse(rawdata);

console.log(`Copying ${libsdata.length} file sets...`);

libsdata.forEach((cmd) => {
  console.log(`  ${cmd.from} -> ${cmd.to}`);
  let from = path.resolve(__dirname + "/../" + cmd.from);
  let to = path.resolve(__dirname + "/../" + cmd.to);
  cpx.copySync(from, to);
});
console.log("Done");
