/*
 * @Author: nigel
 * @Date: 2020-12-02 18:02:13
 * @LastEditTime: 2020-12-08 11:24:32
 */
// use to create a remote warehouse by api
const axios = require("axios");
const { gitToken } = require("../config");
axios.interceptors.request.use(
  (config) => {
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
    return Promise.reject(error);
  }
);

module.exports = {
  api: axios,
  get(url) {
    return axios({
      url,
      headers: {
        "PRIVATE-TOKEN": gitToken,
      },
    });
  },
  post(url, params) {
    return axios({
      method: "post",
      url,
      data: params,
      headers: {
        "PRIVATE-TOKEN": gitToken,
      },
    });
  },
};
