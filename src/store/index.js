import Vue from "vue";
import Vuex from "vuex";

// Importação de módulos
import Layout from './Layout';
import Authentication from "./Authentication";
import Cliente from "./Admin/Cliente";
import Usuario from "./Admin/Usuario";
import Posicao from "./Usuario/Posicao";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth: Authentication,
    layout: Layout,
    cliente: Cliente,
    usuario: Usuario,
    usuarioPosicao: Posicao,
  },
});
