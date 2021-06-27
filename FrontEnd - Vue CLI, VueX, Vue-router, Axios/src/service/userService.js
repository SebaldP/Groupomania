const axios = require("axios");

export default {
  loginUser(bodyContent, callback, errorcallback) {
    return axios
      .post(`http://localhost:3000/api/user/login/`, {
        body: bodyContent,
      })
      .then((res) => {
        console.log(res.data);
        if (callback != null) {
          callback(res);
        }
      })
      .catch((err) => {
        console.log(err);
        if (errorcallback != null) {
          errorcallback(err);
        }
      });
  },
  resetPasswordUser(bodyContent, callback, errorcallback) {
    return axios
      .put(`http://localhost:3000/api/user/reset-password/`, {
        body: bodyContent,
      })
      .then((res) => {
        console.log(res.data);
        if (callback != null) {
          callback(res);
        }
      })
      .catch((err) => {
        console.log(err);
        if (errorcallback != null) {
          errorcallback(err);
        }
      });
  },
  getAllProfiles(bodyContent, callback, errorcallback) {
    return axios
      .get(`http://localhost:3000/api/user/profiles`, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        body: bodyContent,
      })
      .then((res) => {
        console.log(res.data);
        if (callback != null) {
          callback(res);
        }
      })
      .catch((err) => {
        console.log(err);
        if (errorcallback != null) {
          errorcallback(err);
        }
      });
  },
  getOneProfile(id, bodyContent, callback, errorcallback) {
    return axios
      .get(`http://localhost:3000/api/user/profile/${id}`, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        body: bodyContent,
      })
      .then((res) => {
        console.log(res.data);
        if (callback != null) {
          callback(res);
        }
      })
      .catch((err) => {
        console.log(err);
        if (errorcallback != null) {
          errorcallback(err);
        }
      });
  },
  getAllMessagesProfile(id, bodyContent, callback, errorcallback) {
    return axios
      .get(`http://localhost:3000/api/user/profile/${id}/messages`, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        body: bodyContent,
      })
      .then((res) => {
        console.log(res.data);
        if (callback != null) {
          callback(res);
        }
      })
      .catch((err) => {
        console.log(err);
        if (errorcallback != null) {
          errorcallback(err);
        }
      });
  },
  modifyProfile(id, bodyContent, callback, errorcallback) {
    return axios
      .put(`http://localhost:3000/api/user/profile/${id}`, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        body: bodyContent,
      })
      .then((res) => {
        console.log(res.data);
        if (callback != null) {
          callback(res);
        }
      })
      .catch((err) => {
        console.log(err);
        if (errorcallback != null) {
          errorcallback(err);
        }
      });
  },
};
