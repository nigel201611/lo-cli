/*
 * @Author: nigel
 * @Date: 2020-12-02 18:02:13
 * @LastEditTime: 2020-12-07 18:56:03
 */
const execa = require("execa");
const ora = require("ora");
const { getTemplate } = require("./template");
const { getSDKtemplate, initSdkTemplate } = require("./sdkTemplate");
module.exports = async (name, options) => {
  const spinner = ora();
  const repo = await getTemplate();
  let sdkParams = await getSDKtemplate(); // 获取交互参数
  await initSdkTemplate(name, sdkParams || {}, repo);
  spinner.succeed("success, do what you want");
};
