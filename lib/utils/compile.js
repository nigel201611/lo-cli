/*
 * @Author: nigel
 * @Date: 2020-12-02 18:02:13
 * @LastEditTime: 2020-12-08 11:01:14
 */
const ora = require("ora");
const kopy = require("kopy");

const spinner = ora("Start compiling templates...");

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
    spinner.succeed("Template compiled successfully");
  } catch ({ message = "Template compilation failed" }) {
    spinner.fail(message);
    process.exit();
  }
};
