const mutations = {
  defineUltimasPosicoesLog(state, payload) {
    state.ultimasPosicoesLog = payload.UltimasPosicoes;
  },
  removeUltimasPosicoesLog(state) {
    state.ultimasPosicoesLog = [];
  },
};

export default mutations;
