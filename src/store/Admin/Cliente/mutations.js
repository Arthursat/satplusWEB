const mutations = {
  defineClientes(state, payload) {
    state.clientes = payload.Object.Clientes;
    state.totalClientes = payload.Object.Quantidade;
  },
  removeClientes(state) {
    state.clientes = [];
  },
};

export default mutations;
