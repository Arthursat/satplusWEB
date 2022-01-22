const state = () => ({
  drawer: false,
  overlay: false,
  erro: {
    ativo: false,
    mensagem: null,
  },
  sucesso: {
    ativo: false,
    mensagem: null,
  },
});

export default state;