#!/usr/bin/env node
'use strict'

const fs = require('fs');
const path = require('path');
const plantuml = require('node-plantuml');

require('yargs') // eslint-disable-line
  .option('i', {
    alias: 'input-dir',
    demandOption: true,
    describe: 'path to folder with *.puml files'
  })
  .option('o', {
    alias: 'output-dir',
    demandOption: true,
    describe: 'path to output dir'
  })
  .command(
    'generate',
    'generate an UML diagrams from PlantUML sources',
    (yargs) => {

    },
    (argv) => {
      var inputFiles = fs.readdirSync(argv.inputDir);
      inputFiles.forEach((input) => {
        let inputPath = path.join(argv.inputDir, input);
        let outputPath = path.join(argv.outputDir, input.replace(/\.puml$/, '') + ".png");

        console.log(`Generating: ${inputPath} -> ${outputPath}...`);
        let generator = plantuml.generate(path.resolve(inputPath), {format: 'png'});
        let stream = fs.createWriteStream(path.resolve(outputPath));
        generator.out.pipe(stream);
        generator.out.on('end', () => {
          console.log(`File written: ${outputPath}`);
        });
      });
    }
  )
  .command("*", "", (argv) => {
    console.log("Nothing happened :( Run 'puml-batch.js --help' for more info\n");
  })
  .help()
  .version()
  .argv;
