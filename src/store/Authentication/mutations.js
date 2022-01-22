const mutations = {
  defineAuth(state, payload) {
    state.usuario = payload.Object.Usuario;
    localStorage.setItem("token", payload.Object.Token);
    localStorage.setItem("usuario", JSON.stringify(payload.Object.Usuario));
    if (payload.Object.RefreshToken) localStorage.setItem("refreshToken", payload.Object.RefreshToken.idRefreshToken);
  },
  removeAuth(state) {
    state.usuario = null;
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("refreshToken");
  },
  defineAtualizandoToken(state, payload) {
    state.atualizandoToken = payload;
  },
};

export default mutations;
