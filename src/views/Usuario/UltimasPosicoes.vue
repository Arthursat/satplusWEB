<template>
  <div>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="d-flex align-center">
          <span class="headline">Mapa</span>
          <v-text-field v-model="filtroMapa"></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-container>
            <Mapa
              :coordenadas="[
                [0, 0],
                [-18, -42],
                [-19, -53],
                [0, 1],
                [1, 0],
              ]"
            />
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <div class="d-flex align-center">
      <h1 class="mx-2">Últimas Posições</h1>
      <!-- <v-btn @click="dialog = true" color="purple darken-2" icon
        ><v-icon>mdi-map</v-icon></v-btn> -->
    </div>
    <v-text-field
      v-model="filtro"
      append-icon="mdi-magnify"
      label="Pesquise"
      class="mb-3"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="cabecalhos"
      :items="ultimasPosicoesLog"
      :search="filtro"
      item-key="Id_Posicao"
      class="elevation-1 mb-3"
      :loading="loading"
    >
      <template v-slot:[`item.DataGPS`]="{ item }">
        {{ format(addHours(new Date(item.DataGPS), 3), "dd/MM/yyyy HH:mm:ss") }}
      </template>
      <template v-slot:[`item.Ignicao`]="{ item }">
        <v-icon :color="item.Ignicao ? 'green darken-2' : 'red darken-2'"
          >mdi-key</v-icon
        >
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { format, addHours } from "date-fns";
import Mapa from "./../../components/UI/Mapa.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "UsuarioUltimasPosicoes",
  components: {
    Mapa,
  },
  data: () => ({
    format,
    addHours,
    dialog: false,
    loading: false,
    filtro: "",
    filtroMapa: "",
    cabecalhos: [
      { value: "Ignicao", text: "Ligado" },
      { value: "Placa", text: "Placa" },
      { value: "Velocidade", text: "Velocidade" },
      { value: "DataGPS", text: "Data" },
      { value: "DescricaoEvento", text: "Evento" },
      { value: "Localizacao", text: "Localização" },
    ],
  }),
  computed: {
    ...mapGetters({
      ultimasPosicoesLog: "usuarioPosicao/ultimasPosicoesLog",
    }),
  },
  methods: {
    ...mapActions({
      listaUltimasPosicoesLog: "usuarioPosicao/listaUltimasPosicoesLog",
    }),
    verNoMapa() {
      this.dialog = true;
    },
    verTodosNoMapa() {},
  },
  created() {
    this.listaUltimasPosicoesLog();
  },
};
</script>