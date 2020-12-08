/*
 * @Author: nigel
 * @Date: 2020-12-02 18:32:35
 * @LastEditTime: 2020-12-08 11:40:39
 */
const program = require("commander");

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

program.command("*").action(function (env) {
  console.log("Command error");
});
program.parse(process.argv);

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
