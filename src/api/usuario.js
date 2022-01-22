import axios from "axios";
import formatQuery from "./../utils/query";

const listaUsuarios = (options) => {
  return new Promise((resolve, reject) => {
    axios.get("/admin/usuarios" + formatQuery(options))
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => reject(err));
  });
};

const salvarUsuario = (usuario) => {
  return new Promise((resolve, reject) => {
    axios.post("/admin/usuarios", usuario)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => reject(err));
  });
};

const atualizarUsuario = (usuario) => {
  return new Promise((resolve, reject) => {
    axios.put(`/admin/usuarios/${usuario.idUsuario}`, usuario)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => reject(err));
  });
};

const apagarUsuario = (idUsuario) => {
  return new Promise((resolve, reject) => {
    axios.delete(`/admin/usuarios/${idUsuario}`)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => reject(err));
  });
};

export default {
  listaUsuarios,
  salvarUsuario,
  atualizarUsuario,
  apagarUsuario,
};