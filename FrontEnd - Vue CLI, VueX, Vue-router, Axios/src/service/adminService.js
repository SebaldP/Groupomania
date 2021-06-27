const axios = require("axios");

export default {
  createUser(bodyContent, callback, errorcallback) {
    return axios
      .post("http://localhost:3000/api/admin/user", {
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
  deleteUser(registration, bodyContent, callback, errorcallback) {
    return axios
      .delete(`http://localhost:3000/api/admin/user/${registration}`, {
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
