import posicaoApi from "./../../../api/posicao";

const actions = {
  async listaUltimasPosicoesLog({ commit }) {
    return await new Promise((resolve, reject) => {
      posicaoApi.listaUltimasPosicoesLog()
        .then((res) => {
          commit("defineUltimasPosicoesLog", res);
          resolve(res);
        })
        .catch((err) => {
          commit("removeUltimasPosicoesLog");
          reject(err);
        });
    });
  },
};

export default actions;