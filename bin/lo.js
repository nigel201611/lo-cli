#!/usr/bin/env node
/*
 * @Author: nigel
 * @Date: 2020-12-02 18:32:35
 * @LastEditTime: 2020-12-08 16:39:27
 */
const fs = require("fs");
const program = require("commander");
const registry = require("../lib/utils/registry.js");

program
  .version(require("../package").version)
  .description("frontend cli version")
  .usage("<command> [options]");

program
  .command("create <project-name>")
  .description("init project")
  .option("-g, --git [path] ", "Do you want to create git repository")
  .action(async (name, cmd) => {
    const options = cleanArgs(cmd);
    require("../lib/create")(name, options);
  });

program
  .command("add <name> <url>")
  .description(
    "Add/modify the template address, add < name > < URL >, for example, lo add reactjs gitee:nigel2018/nri_demo_webpack4"
  )
  .action(registry.addRegistry);

program
  .command("ls")
  .description("View all warehouse configurations")
  .action(list);

program.command("*").action(function (env) {
  console.log("Command error");
});
program.parse(process.argv);

/*
 * @name: list
 * @msg: View all warehouse configurations
 * @param {*}
 * @return {*}
 */
function list() {
  const allRegistry = registry.getAllRegistry();
  console.log("\r");
  for (let i = 0, len = allRegistry.length; i < len; i++) {
    console.log("    " + i + "---" + JSON.stringify(allRegistry[i]));
  }
  console.log("\r");
}

/*
 * @name:camelize
 * @msg: Capitalize words
 * @param {string}
 * @return {string}
 */
function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}
/*
 * @name:cleanArgs
 * @msg: Normalizes option parameters for command line input
 * @param {object}
 * @return {object}
 */
function cleanArgs(cmd) {
  const args = {};
  cmd.options.forEach((o) => {
    const key = camelize(o.long.replace(/^--/, ""));
    if (typeof cmd[key] !== "function" && typeof cmd[key] !== "undefined") {
      args[key] = cmd[key];
    }
  });
  return args;
}
