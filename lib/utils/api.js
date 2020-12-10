/*
 * @Author: nigel
 * @Date: 2020-12-02 18:02:13
 * @LastEditTime: 2020-12-09 18:55:58
 */
// use to create a remote warehouse by api
const axios = require("axios");
axios.interceptors.request.use(
  (config) => {
    //在这里统一处理不同仓库类型的头部认证，github,gitee,gitlib
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

module.exports = {
  api: axios,
  get(url) {
    return axios({ url });
  },
  post(url, params) {
    let privateToken = "";
    if (params.privateToken) {
      privateToken = params.privateToken;
      delete params.privateToken;
    }

    return axios({
      method: "post",
      url,
      data: params,
      headers: {
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        Authorization: `token ${privateToken}`,
      },
    });
  },
};
