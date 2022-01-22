import usuarioApi from "./../../../api/usuario";

const actions = {
  listaUsuarios({ commit }, query) {
    return new Promise((resolve, reject) => {
      usuarioApi.listaUsuarios(query)
        .then((res) => {
          commit("defineUsuarios", res);
          resolve(res);
        })
        .catch((err) => {
          commit("removeUsuarios");
          reject(err);
        });
    });
  },
  salvarUsuario(context, usuario) {
    return new Promise((resolve, reject) => {
      usuarioApi.salvarUsuario(usuario)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  atualizarUsuario(context, usuario) {
    return new Promise((resolve, reject) => {
      usuarioApi.atualizarUsuario(usuario)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  apagarUsuario(context, usuario) {
    return new Promise((resolve, reject) => {
      usuarioApi.apagarUsuario(usuario)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default actions;