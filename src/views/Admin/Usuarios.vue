<template>
  <div>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          <span class="headline">{{ operacao }} Usuário</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" xl="3" lg="3" md="4">
                <v-text-field
                  label="Nome"
                  v-model="usuario.nome"
                  prepend-icon="mdi-account"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" xl="3" lg="3" md="4">
                <v-text-field
                  label="Email"
                  v-model="usuario.email"
                  prepend-icon="mdi-email"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" xl="3" lg="3" md="4">
                <v-text-field
                  label="Usuário"
                  v-model="usuario.usuario"
                  prepend-icon="mdi-human"
                  required
                ></v-text-field>
              </v-col>
              <v-col v-if="!usuario.admin" cols="12" xl="12" lg="12" md="8">
                <v-autocomplete
                  label="Cliente dono do usuário"
                  v-model="usuario.idCliente"
                  :loading="clientesLoading"
                  :search-input.sync="filtroCliente"
                  :items="clientes"
                  no-data-text="Nenhum cliente encontrado"
                  item-text="nome"
                  item-value="idCliente"
                  prepend-icon="mdi-account-group"
                  no-filter
                  @keyup="filtragemClientes()"
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  label="Admin do BI"
                  v-model="usuario.admin"
                ></v-checkbox>
              </v-col>
              <!-- <v-col cols="12">
                <v-checkbox
                  label="Admin do Cliente"
                  v-model="usuario.moderador"
                ></v-checkbox>
              </v-col> -->
            </v-row>
            <!-- Acessos -->
            <v-row v-if="!usuario.admin">
              <v-col cols="12">
                <h3>Acessos</h3>
              </v-col>
              <v-col cols="12" xl="2" lg="3" md="4">
                <v-checkbox
                  v-model="usuario.config.menu.veiculos.acesso"
                  label="Veículos"
                  prepend-icon="mdi-car-multiple"
                >
                </v-checkbox>
              </v-col>
              <v-col cols="12" xl="2" lg="3" md="4">
                <v-checkbox
                  v-model="usuario.config.menu.ultimasPosicoes.acesso"
                  label="Últimas Posições"
                  prepend-icon="mdi-map-marker-left"
                >
                </v-checkbox>
              </v-col>
              <v-col cols="12" xl="2" lg="3" md="4">
                <v-checkbox
                  v-model="usuario.config.menu.bdv.acesso"
                  label="BDV"
                  prepend-icon="mdi-traffic-light"
                >
                </v-checkbox>
              </v-col>
              <v-col cols="12" xl="2" lg="3" md="4">
                <v-checkbox
                  v-model="usuario.config.menu.jornada.acesso"
                  label="Jornada de Trabalho"
                  prepend-icon="mdi-clipboard-text-multiple"
                >
                </v-checkbox>
              </v-col>
              <v-col cols="12" xl="2" lg="3" md="4">
                <v-checkbox
                  v-model="usuario.config.menu.entregas.acesso"
                  label="Entregas"
                  prepend-icon="mdi-truck-delivery"
                >
                </v-checkbox>
              </v-col>
              <v-col cols="12" xl="2" lg="3" md="4">
                <v-checkbox
                  v-model="usuario.config.menu.starsatLog.acesso"
                  label="Logística"
                  prepend-icon="mdi-transit-connection-variant"
                >
                </v-checkbox>
              </v-col>
              <v-col cols="12" xl="2" lg="3" md="4">
                <v-checkbox
                  v-model="usuario.config.menu.starsatAgro.acesso"
                  label="Agronegócio"
                  prepend-icon="mdi-tractor-variant"
                >
                </v-checkbox>
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
    <div class="d-flex align-center">
      <h1 class="mr-2">Usuários</h1>
      <v-btn class="mx-1" icon color="green darken-2" @click="criar()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-switch
        v-model="apagados"
        @change="verApagados()"
        color="red darken-2"
        label="Apagados"
      ></v-switch>
    </div>
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
      :items="usuarios"
      item-key="idUsuario"
      class="elevation-1 mb-3"
      :loading="loading"
      :options.sync="options"
      :server-items-length="totalUsuarios"
    >
      <template v-slot:[`item.nome`]="{ item }">
        <v-icon v-show="item.admin" color="yellow darken-3">mdi-crown</v-icon>
        {{ item.nome }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          :disabled="item.admin"
          v-if="!apagados"
          class="mx-2"
          @click="editar(item)"
          icon
          color="yellow darken-3"
        >
          <v-icon>mdi-pen</v-icon>
        </v-btn>
        <v-btn
          :disabled="item.admin"
          v-if="!apagados"
          class="mx-2"
          @click="apagar(item.idUsuario)"
          icon
          color="red darken-3"
        >
          <v-icon>mdi-trash-can</v-icon>
        </v-btn>
        <v-btn v-if="apagados" class="mx-2" icon color="blue darken-3">
          <v-icon>mdi-delete-restore</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import _ from "lodash";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "AdminUsuarios",
  data: () => ({
    operacao: null,
    dialog: false,
    loading: false,
    apagados: false,
    filtro: "",
    options: {},
    cabecalhos: [
      { value: "nome", text: "Nome" },
      { value: "email", text: "Email" },
      { value: "usuario", text: "Usuário" },
      { value: "Cliente.nome", text: "Cliente" },
      { value: "actions", text: "Ações", align: "center" },
    ],
    usuario: null,
    clientesLoading: false,
    filtroCliente: "",
  }),
  watch: {
    options: {
      async handler() {
        this.loading = true;
        await this.listaUsuarios({
          apagados: this.apagados,
          pagina: this.options.page,
          tamanho: this.options.itemsPerPage,
          ordenarPor: this.options.sortBy,
          desc: this.options.sortDesc,
          filtro: this.filtro,
        })
          .catch(() => (this.loading = false))
          .finally(() => (this.loading = false));
      },
    },
    filtro: function () {
      this.loading = true;
    },
  },
  computed: {
    ...mapGetters({
      usuarios: "usuario/usuarios",
      totalUsuarios: "usuario/totalUsuarios",
      clientes: "cliente/clientes",
    }),
  },
  methods: {
    ...mapMutations({
      mudaOverlay: "layout/mudaOverlay",
      mudaSucesso: "layout/mudaSucesso",
    }),
    ...mapActions({
      listaUsuarios: "usuario/listaUsuarios",
      salvarUsuario: "usuario/salvarUsuario",
      atualizarUsuario: "usuario/atualizarUsuario",
      apagarUsuario: "usuario/apagarUsuario",
      listaClientes: "cliente/listaClientes",
    }),
    limpar() {
      this.usuario = {
        idUsuario: null,
        nome: null,
        email: null,
        usuario: null,
        admin: false,
        moderador: false,
        config: {},
        idCliente: null,
      };
      this.defineMenuSeNaoExiste();
    },
    defineMenuSeNaoExiste() {
      if (!this.usuario.config.menu) {
        this.usuario.config = {
          menu: {
            veiculos: { acesso: false },
            ultimasPosicoes: { acesso: false },
            bdv: { acesso: false },
            jornada: { acesso: false },
            entregas: { acesso: false },
            starsatLog: { acesso: false },
            starsatAgro: { acesso: false },
          },
        };
      }
    },
    async verApagados() {
      this.mudaOverlay(true);
      await this.listaUsuarios({
        apagados: this.apagados,
        pagina: this.options.page,
        tamanho: this.options.itemsPerPage,
        ordenarPor: this.options.sortBy,
        desc: this.options.sortDesc,
        filtro: this.filtro,
      }).finally(() => this.mudaOverlay(false));
    },
    filtragem: _.debounce(async function () {
      await this.listaUsuarios({
        apagados: this.apagados,
        pagina: this.options.page,
        tamanho: this.options.itemsPerPage,
        ordenarPor: this.options.sortBy,
        desc: this.options.sortDesc,
        filtro: this.filtro,
      });
      this.loading = false;
    }, 1000),
    filtragemClientes: _.debounce(async function () {
      await this.listaClientes({
        filtro: this.filtroCliente,
        tamanho: 100,
      });
      this.loading = false;
    }, 1000),
    criar() {
      this.operacao = "Criar";
      this.dialog = true;
    },
    async salvar() {
      this.mudaOverlay(true);
      await this.salvarUsuario(this.usuario)
        .then((res) => {
          this.limpar();
          this.listaUsuarios();
          this.mudaSucesso({ ativo: true, mensagem: res.Message });
        })
        .finally(() => {
          this.mudaOverlay(false);
          this.dialog = false;
        });
    },
    async editar(usuario) {
      this.usuario.idUsuario = usuario.idUsuario;
      this.usuario.nome = usuario.nome;
      this.usuario.email = usuario.email;
      this.usuario.usuario = usuario.usuario;
      this.usuario.admin = usuario.admin;
      this.usuario.moderador = usuario.moderador;
      this.usuario.config = usuario.config;
      this.usuario.idCliente = usuario.idCliente;
      this.operacao = "Editar";
      if (!this.usuario.idCliente) {
        this.dialog = true;
      } else {
        await this.listaClientes({
          filtro: this.usuario.idCliente,
          tamanho: 100,
        }).finally(() => (this.dialog = true));
      }
    },
    async atualizar() {
      this.mudaOverlay(true);
      await this.atualizarUsuario(this.usuario)
        .then((res) => {
          this.limpar();
          this.listaUsuarios();
          this.mudaSucesso({ ativo: true, mensagem: res.Message });
        })
        .finally(() => {
          this.mudaOverlay(false);
          this.dialog = false;
        });
    },
    async apagar(idUsuario) {
      this.mudaOverlay(true);
      await this.apagarUsuario(idUsuario)
        .then((res) => {
          this.limpar();
          this.listaUsuarios();
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