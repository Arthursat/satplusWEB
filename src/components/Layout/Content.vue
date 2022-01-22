<template>
  <v-main>
    <v-container fluid>
      <router-view />
    </v-container>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-snackbar
      v-model="erro.ativo"
      color="red"
      :timeout="3000"
      class="text-center"
    >
      {{ erro.mensagem }}
      <template v-slot:action="{ attrs }">
        <v-btn @click="mudaErro({ ativo: false, mensagem: null })" icon>
          <v-icon v-bind="attrs">mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="sucesso.ativo"
      color="green"
      :timeout="3000"
      class="text-center"
    >
      {{ sucesso.mensagem }}
      <template v-slot:action="{ attrs }">
        <v-btn @click="mudaSucesso({ ativo: false, mensagem: null })" icon>
          <v-icon v-bind="attrs">mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-main>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Content",
  computed: {
    ...mapGetters({
      overlay: "layout/overlay",
      erro: "layout/erro",
      sucesso: "layout/sucesso",
    }),
  },
  methods: {
    ...mapMutations({
      mudaErro: "layout/mudaErro",
      mudaSucesso: "layout/mudaSucesso",
    }),
  },
};
</script>