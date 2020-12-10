/*
 * @Author: nigel
 * @Date: 2020-12-02 18:02:13
 * @LastEditTime: 2020-12-10 18:24:59
 */
const fs = require("fs-extra");
const path = require("path");
const inquirer = require("inquirer");
const ora = require("ora");
const api = require("./utils/api.js");
const execa = require("execa");
const registry = require("../lib/utils/registry.js");
const { download } = require("./utils/download.js");
const compile = require("./utils/compile.js");
// const installDependencies = require('./utils/install.js')
const { githubUrl } = require("./config");
const CWD = process.cwd();
let targetDir = CWD;

/*
 * @name: getSDKtemplate
 * @msg: Read parameters for the SDK project
 * @param {*}
 * @return {object}
 */
async function getSDKtemplate(options = {}) {
  // if create github repository need input organization repository name
  let isGithub = options.github;
  const cfgData = registry.getConfigData();
  // currently only consider github organization repository
  const privateToken = isGithub && cfgData ? cfgData.githubToken : "";
  const orgsName = isGithub && cfgData ? cfgData.githubOrgsName : "";
  const gitApiUrl =
    isGithub && cfgData ? `${githubUrl}/orgs/${orgsName}/repos` : "";
  let description = await getInput(
    "Please enter a description of the warehouse"
  );
  let keywords =
    (await getInput("Please enter keywords (separated by spaces)"))
      .split(" ")
      .filter((e) => e) || [];
  let userName = await getGitUserName();
  return {
    description,
    keywords,
    gitAuthor: userName,
    privateToken,
    orgsName,
    gitApiUrl,
  };
}
/*
 * @name: getInput
 * @msg: Read the parameters entered by the user command line
 * @param {string} message
 * @return {string}
 */
async function getInput(message) {
  let { value } = await inquirer.prompt({
    type: "input",
    name: "value",
    message: message,
  });
  return value || "";
}

async function getList(message, choices) {
  let { value } = await inquirer.prompt({
    type: "list",
    name: "value",
    message: message,
    choices: choices,
  });
  return value;
}

/*
 * @name:createGitProject_SDK
 * @msg: Whether to automatically create a remote warehouse depends on whether to enter - G, - GIT.
 * Users can configure the corresponding interface request, which is not supported at present
 * @param {name:string,sdkParams:object,namespace_id:number}
 * @return {string}
 */
async function createGitProject_SDK({ name = "", sdkParams } = {}) {
  const spinner = ora(" Creating git repository...");
  spinner.start();
  const description = sdkParams.description;
  const privateToken = sdkParams.privateToken; // Authorization token
  const apiUrl = sdkParams.gitApiUrl;
  const orgsName = sdkParams.orgsName;
  sdkParams.repoUrl = sdkParams.gitApiUrl
    ? `https://github.com/${orgsName}/${name}.git`
    : "";

  return api
    .post(apiUrl, {
      name,
      description,
      privateToken,
    })
    .then((res) => {
      spinner.succeed(`Git warehouse created successfully!`);
      return res.name;
    })
    .catch((err) => {
      console.log(err);
      spinner.fail(`Failed to create git warehouse!`);
      return null;
    });
}

/*
 * @name: initSdkTemplate
 * @msg: Initialize the template related data, download the template,
 * compile the template according to the parameters, and initialize the warehouse
 * @param {string} name (Name of the folder where the current project is located)
 * @param {object} sdkParams
 * @param {object} repo
 */
async function initSdkTemplate(name, sdkParams, repo, options = {}) {
  sdkParams.projectName = name;
  const spinner = ora("Initializing project...");
  spinner.start();
  spinner.succeed();
  targetDir = path.resolve(CWD, name);
  await download(targetDir, `${repo.url}`);
  // await compile(targetDir, sdkParams);
  await initGitRes(name, sdkParams, options); // create gitlab res by gitlab api
  // await installDependencies(targetDir) // install project dependencies
}
/*
 * @name: initGitLabRes
 * @msg: Initialize git repository
 * @param {*}
 * @return {*}
 */
async function initGitRes(name, sdkParams, options) {
  // has --github option,currently just consider github
  if (!options.github) {
    return;
  }
  const GIT_SKD_PROJECT_NAME =
    (await createGitProject_SDK({ name, sdkParams })) || "";
  if (GIT_SKD_PROJECT_NAME) {
    sdkParams.repoUrl && gitOperate(sdkParams.repoUrl);
  }
}
/*
 * @name: gitOperate
 * @msg: auto git push to organization repository
 * @param {*}
 * @return {*}
 */
async function gitOperate(repoUrl) {
  try {
    await run("git init");
    await run("git add -A");
    await run("git", ["commit", "-m", "init"]);
    await run("git", ["branch", "-M", "main"]);
    await run("git", ["remote", "add", "origin", repoUrl]);
    await run("git", ["push", "-u", "origin", "main"]);
  } catch (err) {
    console.log(err);
  }
}
async function run(command, args) {
  if (!args) {
    [command, ...args] = command.split(/\s+/);
  }
  return execa(command, args, { cwd: targetDir });
}

async function getGitUserName() {
  try {
    const user = await execa("git", ["config", "user.email"]);
    let userArr = user.stdout.split("@");
    return userArr[0];
  } catch (error) {
    return "";
  }
}

module.exports = {
  getSDKtemplate,
  createGitProject_SDK,
  initSdkTemplate,
};
