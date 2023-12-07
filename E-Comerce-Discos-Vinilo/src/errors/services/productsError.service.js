//
export const newProductError = (productInfo) => {
  return `
// Todos los siguientes campos son obligatorios //    
title: Este campo debe ser de tipo string, has ingresado: ${productInfo.title},
description: Este campo debe ser de tipo string, has ingresado: ${productInfo.description},
price: Este campo debe ser tipo numérico, has ingresado: ${productInfo.price},
stock: Este campo debe ser tipo numérico, has ingresado: ${productInfo.stock},
category: Este campo debe ser de tipo string, has ingresado: ${productInfo.category},
code: Este campo debe ser tipo numérico, has ingresado: ${productInfo.code},
thumbnail: Este campo debe ser de tipo string, has ingresado: ${productInfo.thumbnail},
status: Este campo debe ser true o false, has ingresado: ${productInfo.status},
`;
};

export const getProductError = () => {
  return `
// Hubo un error al obtener los productos de la base de datos //
`;
};
