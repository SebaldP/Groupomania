const axios = require("axios");

export default {
  getAllReport(bodyContent, callback, errorcallback) {
    return axios
      .get("http://localhost:3000/api/reports", {
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
  createReport(bodyContent, callback, errorcallback) {
    return axios
      .post("http://localhost:3000/api/report", {
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
  deleteReport(id, bodyContent, callback, errorcallback) {
    return axios
      .delete(`http://localhost:3000/api/admin/user/${id}`, {
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
