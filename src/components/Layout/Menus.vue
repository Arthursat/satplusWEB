<template>
  <v-navigation-drawer app clipped v-model="drawer">
    <v-list dense>
      <template v-for="menu in menus">
        <v-list-item
          link
          :to="menu.rota"
          v-if="acesso(menu.acesso)"
          :key="menu.nome"
        >
          <v-list-item-action>
            <v-icon>{{ menu.icone }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ menu.nome }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list-item link v-if="estaAutenticado" to="#" @click="logout">
        <v-list-item-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Sair</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link v-else to="/login">
        <v-list-item-action>
          <v-icon>mdi-login</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Acessar</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Navigation",
  data: () => ({
    admin: [
      {
        nome: "Clientes",
        icone: "mdi-account-group",
        rota: "/admin/clientes",
      },
      {
        nome: "Usuários",
        icone: "mdi-account-group-outline",
        rota: "/admin/usuarios",
      },
    ],
    moderador: [
      {
        nome: "Usuários",
        icone: "mdi-account-group-outline",
        rota: "/moderador/usuarios",
      },
    ],
    autenticado: [
      {
        nome: "Veículos",
        icone: "mdi-car-multiple",
        rota: "/veiculos",
        acesso: "veiculos",
      },
      {
        nome: "Últimas Posições",
        icone: "mdi-map-marker-left",
        rota: "/ultimas_posicoes",
        acesso: "ultimasPosicoes",
      },
      {
        nome: "BDV",
        icone: "mdi-traffic-light",
        rota: "/bdv",
        acesso: "bdv",
      },
      {
        nome: "Jornada de Trabalho",
        icone: "mdi-clipboard-text-multiple",
        rota: "/jornada",
        acesso: "jornada",
      },
      {
        nome: "Entregas",
        icone: "mdi-truck-delivery",
        rota: "/entregas",
        acesso: "entregas",
      },
      {
        nome: "Starsat Log",
        icone: "mdi-transit-connection-variant",
        rota: "/starsat_log",
        acesso: "starsatLog",
      },
      {
        nome: "StarsatAgro",
        icone: "mdi-tractor-variant",
        rota: "/starsat_agro",
        acesso: "starsatAgro",
      },
    ],
  }),
  computed: {
    ...mapGetters({
      usuario: "auth/usuario",
    }),
    estaAutenticado() {
      if (this.usuario) return true;
      return false;
    },
    drawer: {
      get: function () {
        return this.$store.state.layout.drawer;
      },
      set: function (newValue) {
        return this.mudaDrawer(newValue);
      },
    },
    menus() {
      if (this.usuario) {
        if (this.usuario.admin === true) {
          return this.admin;
        } else if (this.usuario.moderador === true) {
          return this.moderador;
        } else {
          return this.autenticado;
        }
      } else {
        return [];
      }
    },
  },
  methods: {
    ...mapMutations({
      mudaDrawer: "layout/mudaDrawer",
    }),
    ...mapActions({
      authLogout: "auth/logout",
    }),
    acesso(item) {
      if (this.usuario) {
        if (this.usuario.admin === true || this.usuario.moderador === true) {
          return true;
        } else {
          if (this.usuario.config) {
            if (this.usuario.config.menu) {
              if (this.usuario.config.menu[item]) {
                if (this.usuario.config.menu[item].acesso) return true;
              }
            }
          }
        }
      }
      return false;
    },
    logout: function () {
      this.authLogout().finally(() => {
        this.$router.push({ path: "/login" });
        window.location.href = "http://starsat.net.br/";
      });
    },
  },
};
</script>