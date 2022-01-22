<template>
  <div>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">{{ operacao }} Cliente</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <!-- Configurações -->
            <v-row>
              <v-col cols="12">
                <h3>Configurações</h3>
              </v-col>
              <v-col cols="12" xl="2" lg="3" md="4">
                <v-text-field
                  v-model="cliente.config.plataforma"
                  label="Plataforma de acesso"
                  prepend-icon=""
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" xl="2" lg="3" md="4">
                <v-text-field
                  v-model="cliente.config.acessoUsuario"
                  label="Usuário de acesso"
                  prepend-icon=""
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" xl="2" lg="3" md="4">
                <v-text-field
                  v-model="cliente.config.acessoSenha"
                  label="Senha de acesso"
                  prepend-icon="mdi-map-marker-left"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" xl="2" lg="3" md="4">
                <v-text-field
                  v-model="cliente.config.cnpj"
                  label="CNPJ"
                  prepend-icon=""
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancelar()">
            Cancelar
          </v-btn>
          <v-btn
            v-if="operacao === 'Criar'"
            color="blue darken-1"
            text
            @click="salvar()"
          >
            Cadastrar
          </v-btn>
          <v-btn
            v-if="operacao === 'Editar'"
            color="blue darken-1"
            text
            @click="atualizar()"
          >
            Atualizar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <h1>Clientes</h1>
    <v-text-field
      v-model="filtro"
      append-icon="mdi-magnify"
      label="Pesquise"
      class="mb-3"
      single-line
      hide-details
      @keyup="filtragem()"
    ></v-text-field>
    <v-data-table
      :headers="cabecalhos"
      :items="clientes"
      item-key="idCliente"
      class="elevation-1 mb-3"
      :loading="loading"
      :options.sync="options"
      :server-items-length="totalClientes"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn class="mx-2" @click="editar(item)" icon color="yellow darken-3">
          <v-icon>mdi-pen</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import _ from "lodash";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "AdminClientes",
  data: () => ({
    operacao: null,
    dialog: false,
    loading: false,
    filtro: "",
    options: {},
    cabecalhos: [
      { value: "nome", text: "Cliente" },
      { value: "email", text: "Email" },
      { value: "actions", text: "Ações" },
    ],
    cliente: {
      idCliente: null,
    },
  }),
  watch: {
    options: {
      async handler() {
        this.loading = true;
        await this.listaClientes({
          pagina: this.options.page,
          tamanho: this.options.itemsPerPage,
          ordenarPor: this.options.sortBy,
          desc: this.options.sortDesc,
          filtro: this.filtro,
        }).finally(() => (this.loading = false));
      },
      deep: true,
    },
    filtro: function () {
      this.loading = true;
    },
  },
  computed: {
    ...mapGetters({
      clientes: "cliente/clientes",
      totalClientes: "cliente/totalClientes",
    }),
  },
  methods: {
    ...mapMutations({
      mudaOverlay: "layout/mudaOverlay",
      mudaSucesso: "layout/mudaSucesso",
    }),
    ...mapActions({
      listaClientes: "cliente/listaClientes",
      atualizarCliente: "cliente/atualizarCliente",
    }),
    filtragem: _.debounce(async function () {
      await this.listaClientes({
        pagina: this.options.page,
        tamanho: this.options.itemsPerPage,
        ordenarPor: this.options.sortBy,
        desc: this.options.sortDesc,
        filtro: this.filtro,
      });
      this.loading = false;
    }, 1000),
    limpar() {
      this.cliente = {
        idCliente: null,
      };
      this.defineConfigSeNaoExiste();
    },
    defineConfigSeNaoExiste() {
      if (!this.cliente.config) {
        this.cliente.config = {
          plataforma: "GSLog",
          acessoUsuario: "",
          acessoSenha: "",
          cnpj: "",
        };
      }
    },
    async editar(cliente) {
      this.cliente.idCliente = cliente.idCliente;
      if (cliente.config) this.cliente.config = cliente.config;
      this.operacao = "Editar";
      this.dialog = true;
    },
    async atualizar() {
      this.mudaOverlay(true);
      await this.atualizarCliente(this.cliente)
        .then((res) => {
          this.limpar();
          this.listaClientes();
          this.mudaSucesso({ ativo: true, mensagem: res.Message });
        })
        .finally(() => {
          this.mudaOverlay(false);
          this.dialog = false;
        });
    },
    cancelar() {
      this.dialog = false;
      this.limpar();
    },
  },
  created() {
    this.limpar();
  },
};
</script>