/*
 * @Author: nigel
 * @Date: 2020-12-02 18:02:13
 * @LastEditTime: 2020-12-08 16:55:19
 */

/*Template framework code base related settings*/

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
  return fs.existsSync(loiniFilePath)
    ? JSON.parse(fs.readFileSync(loiniFilePath, "utf-8"))
    : [];
}
/*
 * @name: getAllRegistry
 * @msg: Get all warehouse addresses
 * @param {*}
 * @return {array}
 */
function getAllRegistry() {
  // return Array.prototype.concat.call(
  //   [],
  //   defaultRegistries,
  //   getCustomRegistry()
  // );
  const customRegistry = getCustomRegistry();
  return [...defaultRegistries, ...customRegistry];
}

/*
 * @name: setCustomRegistry
 * @msg: Write user-defined warehouse address
 * @param { array } config
 *  @param { function } callback
 * @return {*}
 */
function setCustomRegistry(config, callback) {
  // echo(ini.stringify(config), ">", loiniFilePath, callback);
  fs.writeFile(loiniFilePath, JSON.stringify(config), callback);
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
    console.log("===================Success=========================");
    console.log(
      "The warehouse address is set successfully. You can use the following statement to initialize the project"
    );
    console.log("lo create " + name);
    console.log("===================================================");
  });
}

module.exports = {
  getAllRegistry,
  setCustomRegistry,
  addRegistry,
};
