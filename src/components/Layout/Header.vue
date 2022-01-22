<template>
  <v-app-bar app src="@/assets/banner.png" dark clipped-left>
    <v-app-bar-nav-icon
      @click.stop="mudaDrawer(!$store.state.layout.drawer)"
      color="red"
    ></v-app-bar-nav-icon>
    <v-toolbar-title
      ><img v-bind:src="logomarca" v-bind:width="100" alt="logo"
    /></v-toolbar-title>
    <v-spacer></v-spacer>
    <div class="black--text">{{ nomeUsuario }}</div>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import logomarcaAgro from "./../../assets/logoClientes/logoAgro.png";
import logomarcaLog from "./../../assets/logoClientes/logoLog.png";
import logomarcaJT from "./../../assets/logoClientes/logoJT.png";
import logomarca from "./../../assets/logo.png";

export default {
  name: "Header",
  computed: {
    ...mapGetters({
      usuario: "auth/usuario",
    }),
    nomeUsuario() {
      if (this.usuario) return this.usuario.nome;
      return "";
    },
    logomarca() {
      switch (this.$route.path) {
        case "/informativo":
          return logomarcaAgro;
        case "/logistica":
          return logomarcaLog;
        case "/jornadamotorista":
          return logomarcaJT;
        default:
          return logomarca;
      }
    },
  },
  methods: {
    ...mapMutations({
      mudaDrawer: "layout/mudaDrawer",
    }),
  },
};
</script>