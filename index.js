#! /usr/bin/env node
var clear = require("clear");
var chalk = require("chalk");
var figlet = require("figlet");

clear();
console.log(
  chalk.yellow(figlet.textSync("appthinning", { horizontalLayout: "full" }))
);
module.exports = require("./src/index");
