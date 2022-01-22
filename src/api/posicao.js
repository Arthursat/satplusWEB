import axios from "axios";

const listaUltimasPosicoesLog = () => {
  return new Promise((resolve, reject) => {
    axios.get("/usuario/ultimas_posicoes_log")
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => reject(err));
  });
};

export default {
  listaUltimasPosicoesLog,
};