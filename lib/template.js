/*
 * @Author: nigel
 * @Date: 2020-12-02 18:02:13
 * @LastEditTime: 2020-12-08 16:47:05
 */
const inquirer = require("inquirer");
const api = require("./utils/api.js");
const registry = require("../lib/utils/registry.js");
async function getTemplate(isCreate = true) {
  // Interface request update template is not supported at the moment
  // let list = await api.get('your url')
  // Read user configured locli.json or locli.rc , including the technology stack template repository URL and other configuration
  // No user configured locli.json , default read data.json
  // let list = require("../data.json");
  const list = registry.getAllRegistry();
  let types = list.map((item) => `${item.name}`);
  let message = isCreate
    ? "Please select a preset template"
    : "Failed to get the currently used template. Please re select a template";
  let { type } = await inquirer.prompt({
    type: "list",
    name: "type",
    message,
    choices: types,
  });
  let repo = list[types.indexOf(type)];
  return repo;
}

module.exports = {
  getTemplate,
};
