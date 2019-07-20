#! /usr/bin/env node
var clear = require("clear")
var chalk = require("chalk")
var figlet = require("figlet")
var cmd = require("./src/index")
var appthinning = require("./src/appthinning")

clear()
console.log(
  chalk.yellow(figlet.textSync("appthinning", { horizontalLayout: "full" }))
)
module.exports = {
  cmd,
  appthinning
}
module.exports.default = cmd