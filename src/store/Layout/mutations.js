const mutations = {
  mudaDrawer(state, payload) {
    state.drawer = payload;
  },
  mudaOverlay(state, payload) {
    state.overlay = payload;
  },
  mudaErro(state, payload) {
    state.erro = {
      ativo: payload.ativo,
      mensagem: payload.mensagem,
    };
  },
  mudaSucesso(state, payload) {
    state.sucesso = {
      ativo: payload.ativo,
      mensagem: payload.mensagem,
    };
  },
};

export default mutations;
