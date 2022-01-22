import authApi from "./../../api/auth";
import axios from "axios";

const actions = {
  login({ commit }, usuario) {
    return new Promise((resolve, reject) => {
      authApi.login(usuario)
        .then((res) => {
          commit("defineAuth", res);
          axios.defaults.headers.common["Authorization"] = res.Object.Token;
          resolve(res);
        })
        .catch((err) => {
          commit("removeAuth");
          reject(err);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      authApi.logout()
        .then((res) => {
          commit("removeAuth");
          resolve(res);
        })
        .catch((err) => {
          commit("removeAuth");
          reject(err);
        });
    })
  },
  atualizaToken({ commit }, refreshToken) {
    return new Promise((resolve, reject) => {
      authApi.atualizaToken(refreshToken)
        .then((res) => {
          commit("defineAuth", res);
          axios.defaults.headers.common["Authorization"] = res.Object.Token;
          resolve(res);
        })
        .catch((err) => {
          commit("removeAuth");
          reject(err);
        })
    });
  },
};

export default actions;