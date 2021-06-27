const axios = require("axios");

export default {
  getAllComments(idMessages, bodyContent, callback, errorcallback) {
    return axios
      .get(`http://localhost:3000/api/messages/${idMessages}/comments`, {
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
  createComment(idMessages, bodyContent, callback, errorcallback) {
    return axios
      .post(`http://localhost:3000/api/messages/${idMessages}/comment`, {
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
  modifyComment(idMessages, id, bodyContent, callback, errorcallback) {
    return axios
      .put(`http://localhost:3000/api/messages/${idMessages}/comment/${id}`, {
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
  deleteComment(idMessages, id, bodyContent, callback, errorcallback) {
    return axios
      .delete(
        `http://localhost:3000/api/messages/${idMessages}/comment/${id}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
          body: bodyContent,
        }
      )
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
