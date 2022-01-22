import axios from "axios";

const login = (data) => {
  return new Promise((resolve, reject) => {
    axios.post("/auth/login", data)
      .then((res) => {
        axios.defaults.headers.common["Authorization"] = res.data.Object.Token;
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

const logout = () => {
  return new Promise((resolve, reject) => {
    axios.post("/auth/logout")
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

const atualizaToken = (data) => {
  return new Promise((resolve, reject) => {
    axios.post("/auth/token", data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
}

export default {
  login,
  logout,
  atualizaToken,
};