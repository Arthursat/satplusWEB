import clienteApi from "../../../api/cliente";

const actions = {
  listaClientes({ commit }, query) {
    return new Promise((resolve, reject) => {
      clienteApi.listaClientes(query)
        .then((res) => {
          commit("defineClientes", res);
          resolve(res);
        })
        .catch((err) => {
          commit("removeClientes");
          reject(err);
        });
    });
  },
  atualizarCliente(context, cliente) {
    return new Promise((resolve, reject) => {
      clienteApi.atualizarCliente(cliente)
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