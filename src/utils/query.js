const formatQuery = (options) => {
  let formatedQuery = "/?";
  if (options) {
    if (options.apagados) formatedQuery += `apagados=${options.apagados}&`
    if (options.pagina) formatedQuery += `pagina=${options.pagina - 1}&`;
    if (options.tamanho) formatedQuery += `tamanho=${options.tamanho}&`;
    if (options.ordernarPor && options.ordenarPor[0]) formatedQuery += `ordenarPor=${options.ordenarPor[0]}&`;
    if (options.desc && options.desc[0]) formatedQuery += `desc=${options.desc[0]}&`;
    if (options.filtro) formatedQuery += `filtro=${options.filtro}`;
  }
  return formatedQuery;
};

export default formatQuery;