import axios from "axios";
import formatQuery from "./../utils/query";

const listaClientes = (options) => {
  return new Promise((resolve, reject) => {
    axios.get("/admin/clientes" + formatQuery(options))
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

const atualizarCliente = (cliente) => {
  return new Promise((resolve, reject) => {
    axios.put(`/admin/clientes/${cliente.idCliente}`, cliente)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => reject(err));
  });
};

export default {
  listaClientes,
  atualizarCliente,
};