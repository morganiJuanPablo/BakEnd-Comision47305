//
import { UsersManagerMongo } from "../../src/dao/mongoManagers/UsersManagerMongo.js";
import mongoose from "mongoose";
import { logger } from "../../src/helpers/logger.js";
import { userModel } from "../../src/dao/mongoManagers/modelsDB/users.model.js";
import { expect } from "chai";

try {
  await mongoose.connect(
    "mongodb+srv://morganijuanpablo:XgMe7LjudVbQGoKJ@juampidb.wigsasz.mongodb.net/ecomerceDBTest?retryWrites=true&w=majority"
  );
  logger.info("Conectado con la base de datos de prueba.");
} catch (error) {
  logger.error(error.message);
}

describe("Testing módulo users DAO", () => {
  //Utilizamos el método before para que se ejecute antes de que se lleven a cabo las pruebas. Este método se ejecuta sólo una vez. Acá vamos a instanciar un objeto de la clase de UsersMongo para poder hacer las pruebas necesarias.
  before(async function () {
    this.usersManager = new UsersManagerMongo();
  });

  //Utilizamos la siguiente función propia de mocha para poder eliminar todos los usuarios o productos que vayamos generando en las pruebas ya que nos dará error cada vez que ejecutemos al querer crear usuarios, por ejemplo con el mismo correo (Lo que no nos permite hacer en el entorno de producción lógicamente). Por eso traemos al user.model. Este método se ejecuta antes de cada prueba
  beforeEach(async function () {
    await userModel.deleteMany();
  });

  it("Obtener de manera correcta todos los usuarios en un arreglo", async function () {
    const result = await this.usersManager.getUsers();
    //Vamos a comparar el valor actual con el valor esperado
    expect(result).to.be.deep.equal([]);
  });
  it("Crear un usuario nuevo", async function () {
    const user = {
      first_name: "Juan Pablo",
      last_name: "Morgani",
      email: "morgani.jpg@gmail.com",
      age: 38,
      password: "123456",
      role: "Usuario",
      cart: "658c1a0d27225c9b73c639fe",
    };
    const result = await this.usersManager.createUser(user);
    //Vamos a comparar el valor actual con el valor esperado (dos formas diferentes)
    /* expect(result).to.be.includes(result._id); */
    expect(result).to.have.property("_id");
  });
});

//Hacemos supertests
