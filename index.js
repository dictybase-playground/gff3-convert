#!/usr/bin/env node

const yargs = require("yargs")

yargs // eslint-disable-line
  .commandDir("cmds")
  .demandCommand()
  .help().argv
