//
export const userCreateError = (user) => {
  return `
    Todos los campos son obligatorios,
    Listado de campos obligatorios:
    name: Este campo debe ser de tipo string, y se recibió ${user.name},
    lastname: Este campo debe ser de tipo string, y se recibió ${user.lastname},
    email: Este campo debe ser tipo string, y se recibió ${user.email},
    password: Este campo puede ser de tipo string o numérico.
    Listado campos opcionales:
    age: Este campo debe ser tipo numerico, y se recibió ${user.age}
    `;
};
