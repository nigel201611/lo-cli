/*
 * @Author: nigel
 * @Date: 2020-12-02 18:02:13
 * @LastEditTime: 2020-12-07 18:55:38
 */
const ora = require("ora");
const kopy = require("kopy");

const spinner = ora("📄  开始编译模板...");

module.exports = async (target, answers = {}) => {
  try {
    spinner.start();
    let data = {
      gitAuthor: "",
      projectName: "",
      gitRemote: "",
    };
    await kopy(target, target, {
      data: {
        ...data,
        ...answers,
      },
      template: require("jstransformer-handlebars"),
    });
    spinner.succeed("模板编译成功");
  } catch ({ message = "模板编译失败" }) {
    spinner.fail(message);
    process.exit();
  }
};
