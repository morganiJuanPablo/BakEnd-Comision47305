//
export const newUserCreateError = (user) => {
  return `
    // Todos los campos son obligatorios //
    
    name: Este campo debe ser de tipo string, y se recibió ${user.name},
    lastname: Este campo debe ser de tipo string, y se recibió ${user.lastname},
    email: Este campo debe ser tipo string, y se recibió ${user.email},
    password: Este campo puede ser de tipo string o numérico.
    
    // Campos opcionales //
    age: Este campo debe ser tipo numerico, y se recibió ${user.age}
    `;
};

export const loginUserCreateError = (user) => {
  return `
    // Campos obligatorios //
    
    email: Este campo debe ser tipo string, y se recibió ${user.email},
    password: Este campo puede ser de tipo string o numérico.`;
};
