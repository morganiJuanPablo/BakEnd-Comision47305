//
import { UsersManagerMongo } from "../src/dao/mongoManagers/UsersManagerMongo.js";
import mongoose from "mongoose";
import Assert from "assert";
import { logger } from "../src/helpers/logger.js";
import { userModel } from "../src/dao/mongoManagers/modelsDB/users.model.js";

const assert = Assert.strict;

try {
  await mongoose.connect(
    "mongodb+srv://morganijuanpablo:XgMe7LjudVbQGoKJ@juampidb.wigsasz.mongodb.net/ecomerceDBTest?retryWrites=true&w=majority"
  );
  logger.info("Conectado con la base de datos de prueba.");
} catch (error) {
  logger.error(error.message);
}

describe("Testing módulo users DAO", () => {
  //Utilizamos la siguiente función propia de mocha para poder eliminar todos los usuarios o productos que vayamos generando en las pruebas ya que nos dará error cada vez que ejecutemos al querer crear usuarios por ejemplo con el mismo correo (Lo que no nos permite hacer en el entorno de producción lógicamente). Por eso tramos al user.model
  beforeEach(async function () {
    await userModel.deleteMany();
  });

  it("Obtener de manera correcta todos los usuarios", async function () {
    const usersManager = new UsersManagerMongo();
    const result = await usersManager.getUsers();
    //Vamos a comparar el valor actual con el valor esperado
    assert.strictEqual(Array.isArray(result), true);
  });
  it("Crear un usuario nuevo", async function () {
    const usersManager = new UsersManagerMongo();
    const user = {
      first_name: "Juan Pablo",
      last_name: "Morgani",
      email: "morgani.jpg@gmail.com",
      age: 38,
      password: "123456",
      role: "Usuario",
      cart: "658c1a0d27225c9b73c639fe",
    };
    const result = await usersManager.createUser(user);
    //Vamos a comparar el valor actual con el valor esperado
    assert.ok(result._id); //ok valida si una propiedad existe dentro de un objeto. En este caso chequeamos si existe _id, eso querrá decir que al existir mongo creó el usuario de manera correcta.
  });
});
