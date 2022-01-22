const mutations = {
  defineUsuarios(state, payload) {
    state.usuarios = payload.Object.Usuarios;
    state.totalUsuarios = payload.Object.Quantidade;
  },
  removeUsuarios(state) {
    state.usuarios = [];
  },
  removeUsuario(state) {
    state.usuario = {};
  },
};

export default mutations;
