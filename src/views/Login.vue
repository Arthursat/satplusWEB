<template>
  <div class="mx-auto">
    <div
      class="
        pa-8
        mx-auto
        rounded
        d-flex
        flex-column
        justify-center
        align-center
      "
    >
      <v-snackbar
        v-model="erro.ativo"
        color="red"
        :timeout="3000"
        class="text-center"
      >
        {{ this.erro.mensagem }}
        <template v-slot:action="{ attrs }">
          <v-icon v-bind="attrs" @click="erro.ativo = false">mdi-times</v-icon>
        </template>
      </v-snackbar>
      <img class="ma-2" src="./../assets/logo.png" width="200px" />
      <v-form @submit.prevent="login()" class="d-flex flex-column">
        <v-text-field
          v-model="usuario.email"
          label="Email"
          :rules="[rules.required]"
          class="ma-1"
          required
          autofocus
        ></v-text-field>
        <v-text-field
          v-model="usuario.senha"
          label="Senha"
          :rules="[rules.required]"
          :type="mostrarSenha ? 'text' : 'password'"
          class="ma-1"
          required
          :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="mostrarSenha = !mostrarSenha"
        ></v-text-field>
        <v-btn class="mt-3 red white--text" type="submit" text>Acessar</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  name: "Login",

  data: () => ({
    mostrarSenha: false,
    erro: {
      ativo: false,
      mensagem: null,
    },
    usuario: {
      email: "starsat@starsat.net.br",
      senha: "starsat",
    },
    rules: {
      required: (v) => !!v || "Precisa preencher este campo!",
    },
  }),
  methods: {
    ...mapMutations({
      mudaOverlay: "layout/mudaOverlay",
    }),
    ...mapActions({
      authLogin: "auth/login",
    }),
    login: function () {
      this.mudaOverlay(true);
      let email = this.usuario.email;
      let senha = this.usuario.senha;
      this.authLogin({ email, senha })
        .then((res) => {
          if (res.Object.Usuario.admin == 1) {
            this.$router.push({ path: "/admin/clientes" });
          } else {
            this.$router.push({ path: "/ultimas_posicoes" });
          }
        })
        .finally(() => this.mudaOverlay(false));
    },
  },
};
</script>
