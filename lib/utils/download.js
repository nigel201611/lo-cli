/*
 * @Author: nigel
 * @Date: 2020-12-02 18:02:13
 * @LastEditTime: 2020-12-08 11:22:23
 */

const downloadGit = require("./download-git-repo.js");
const fs = require("fs-extra");
const ora = require("ora");
const { prompt } = require("enquirer");
// const { gitToken } = require('../config');
const CWD = process.cwd();
const spinner = ora("Initialize template...");

/*
 * @name: download
 * @msg: Download the corresponding framework template according to gitpath
 * @param {string} targetDir
 * @param {string} gitPath
 * @return {string}
 */
async function download(targetDir, gitPath) {
  try {
    spinner.start();
    await new Promise((resolve, reject) => {
      downloadGit(
        gitPath,
        targetDir,
        {
          clone: true, //if true,then use git clone,else use http
          // headers: { 'PRIVATE-TOKEN': gitToken } currently not consider private git repository
        },
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(targetDir);
          }
        }
      );
    });

    spinner.succeed();
  } catch ({ message = "Failed to initialize template" }) {
    spinner.fail(message);
    process.exit();
  }
}
/*
 * @name:targetDirOperate
 * @msg: Download the corresponding framework template to the current project path,
 * there may be source code, and the user can choose how to operate
 * currently not conside this
 * @param {string}projectName
 * @return {*}
 */
async function targetDirOperate(projectName) {
  const inCurrent = projectName === ".";
  const targetDir = path.resolve(CWD, projectName);
  if (!inCurrent && fs.existsSync(targetDir)) {
    const { action } = await prompt([
      {
        name: "action",
        type: "select",
        message: `${chalk.cyan(
          targetDir
        )} Directory already exists. Please select operation type:`,
        choices: [
          { message: "cover", name: "overwrite" },
          { message: "merge", name: "merge" },
          { message: "cancel", name: false },
        ],
      },
    ]);
    if (!action) return false;
    else if (action === "overwrite") {
      console.log(`\nRemoving ${chalk.cyan(targetDir)}...`);
      await fs.remove(targetDir);
    }
  }
}
module.exports = { download };
