const axios = require("axios");

export default {
  getAllMessages(bodyContent, callback, errorcallback) {
    return axios
      .get(`http://localhost:3000/api/messages/`, {
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
  getOneMessage(id, bodyContent, callback, errorcallback) {
    return axios
      .get(`http://localhost:3000/api/messages/${id}`, {
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
  createMessage(bodyContent, callback, errorcallback) {
    return axios
      .post(`http://localhost:3000/api/messages/`, {
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
  modifyMessage(id, bodyContent, callback, errorcallback) {
    return axios
      .put(`http://localhost:3000/api/messages/${id}`, {
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
  deleteMessage(id, bodyContent, callback, errorcallback) {
    return axios
      .delete(`http://localhost:3000/api/messages/${id}`, {
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
