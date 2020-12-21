/*
 * @Author: nigel
 * @Date: 2020-12-02 18:02:13
 * @LastEditTime: 2020-12-21 10:01:18
 */
const ora = require("ora");
const { getTemplate } = require("./template");
const { getSDKtemplate, initSdkTemplate } = require("./sdkTemplate");
module.exports = async (name, options) => {
  const spinner = ora();
  const repo = await getTemplate(); // Get template repo info,like url,name
  let sdkParams = await getSDKtemplate(options); // Get interaction parameters
  await initSdkTemplate(name, sdkParams || {}, repo, options);
  spinner.succeed("success, do what you want");
};
