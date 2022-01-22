import axios from "axios";
import store from "./../store";

axios.defaults.baseURL = "http://localhost:3020/api";
// axios.defaults.withCredentials = true;
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Content-Type"] = "application/json";

let token = localStorage.getItem("token");
let usuario = localStorage.getItem("usuario");

if (token) axios.defaults.headers.common["Authorization"];
if (usuario) store.state.auth.usuario = JSON.parse(usuario);

if (!axios.defaults.headers.common["Authorization"]) {
  if (localStorage.getItem("refreshToken")) {
    store.dispatch("auth/atualizaToken", { refreshToken: localStorage.getItem("refreshToken") })
      .then((res) => axios.defaults.headers.common["Authorization"] = res.Object.Token);
  }
}

axios.interceptors.request.use(async function (config) {
  if (!axios.defaults.headers.common["Authorization"]) {
    if (localStorage.getItem("refreshToken")) {
      await store.dispatch("auth/atualizaToken", { refreshToken: localStorage.getItem("refreshToken") })
        .then((res) => axios.defaults.headers.common["Authorization"] = res.Object.Token);
    }
  }
  return config;
}, function (error) {
  console.log("error interceptor request", error);
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  if (error.response && error.response.data) {
    let err = error.response.data;
    store.commit("layout/mudaErro", { ativo: true, mensagem: err.Message });
    return Promise.reject(error);
    // if (error.response.status === 401) {
    //   if (!store.state.auth.atualizandoToken) {
    //     store.commit("auth/defineAtualizandoToken", true);
    //     await store.dispatch("auth/atualizaToken", { refreshToken: localStorage.getItem("refreshToken") })
    //       .then((res) => {
    //         store.commit("auth/defineAtualizandoToken", false);
    //         error.config.headers['Authorization'] = res.Object.Token;
    //         return axios.request(error.config);
    //       });
    //   }
    // } else {
    //   let err = error.response.data;
    //   store.commit("layout/mudaErro", { ativo: true, mensagem: err.Message });
    //   return Promise.reject(error);
    // }
  } else {
    store.commit("layout/mudaErro", { ativo: true, mensagem: error.message });
    return Promise.reject(error);
  }
})

export default axios;