/*
 * @Author: nigel
 * @Date: 2020-12-02 18:02:13
 * @LastEditTime: 2020-12-08 11:10:07
 */
const ora = require("ora");
const execa = require("execa");
const { defaultNpmRes } = require("../config");
const spinner = ora("Installation project dependencies...");

module.exports = async function installDependencies(projectPath) {
  try {
    spinner.start();
    await execa("npm", ["install", "--registry", defaultNpmRes], {
      stdio: "inherit",
      cwd: projectPath,
    });
    spinner.succeed();
  } catch ({ message = "Failed to install project dependencies" }) {
    spinner.fail();
  }
};
