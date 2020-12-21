/*
 * @Author: nigel
 * @Date: 2020-12-02 18:02:13
 * @LastEditTime: 2020-12-21 10:26:47
 */

/*Template framework code base related settings*/
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const defaultRegistries = require("../../data.json");
const CWD = process.cwd();
const loiniFilePath = path.join(CWD, "lo.json"); //user customize lo.json confiuration file

/*
 * @name: getCustomRegistry
 * @msg: Get user-defined warehouse address
 * @param {*}
 * @return {array}
 */
function getCustomRegistry() {
  let customRegistryRepo = [];
  if (fs.existsSync(loiniFilePath)) {
    customRegistryRepo = JSON.parse(fs.readFileSync(loiniFilePath, "utf-8"))[
      "registryRepository"
    ];
  }
  return customRegistryRepo || [];
}
// let customRegistry = getCustomRegistry();
/*
 * @name: getConfigData
 * @msg: Get user-defined configuration file data
 * @param {*}
 * @return {object}
 */
function getConfigData() {
  return fs.existsSync(loiniFilePath)
    ? JSON.parse(fs.readFileSync(loiniFilePath, "utf-8"))
    : null;
}
/*
 * @name: getAllRegistry
 * @msg: Get all warehouse addresses
 * @param {*}
 * @return {array}
 */
function getAllRegistry() {
  const customRegistry = getCustomRegistry();
  return [...defaultRegistries, ...customRegistry];
}

/*
 * @name: setCustomRegistry
 * @msg: Write user-defined warehouse address
 * @param { array } config
 * @param { function } callback
 * @return {*}
 */
function setCustomRegistry(config, callback) {
  // echo(ini.stringify(config), ">", loiniFilePath, callback);
  // get previous repo registry config,merge them
  const userConfig = getConfigData();
  userConfig.registryRepository = config;
  fs.writeFile(loiniFilePath, JSON.stringify(userConfig), callback);
}

/*
 * @name:addRegistry
 * @msg:New framework template warehouse,
 * add template repository into customize lo.json file,prevent influence default data.json file
 * @param {string} name
 * @param {string} url
 * @return {*}
 */
function addRegistry(name, url) {
  name = name.replace(/[\s]/g, "");
  const customRegistry = getCustomRegistry();
  customRegistry.push({ name, url });
  setCustomRegistry(customRegistry, function () {
    console.log(
      chalk.green(
        "The warehouse address is set successfully. You can use the following statement to initialize the project"
      )
    );
    console.log(chalk.blue("lo create " + name));
  });
}

module.exports = {
  getAllRegistry,
  setCustomRegistry,
  addRegistry,
  getConfigData,
};
