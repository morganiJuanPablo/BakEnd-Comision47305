//
import { UsersManagerMongo } from "../../src/dao/mongoManagers/UsersManagerMongo.js";
import mongoose from "mongoose";
import { logger } from "../../src/helpers/logger.js";
import { expect } from "chai";
import { roleClient } from "../../src/utils.js";
import { generalConfig } from "../../src/config/generalConfig.js";
import { generateToken } from "../../src/utils.js";
import jwt from "jsonwebtoken";

try {
  await mongoose.connect(
    "mongodb+srv://morganijuanpablo:XgMe7LjudVbQGoKJ@juampidb.wigsasz.mongodb.net/ecomerceDBTest?retryWrites=true&w=majority"
  );
  logger.info("Conectado con la base de datos de prueba.");
} catch (error) {
  logger.error(error.message);
}

describe("Testing funciones referidas a las sesiones y la entidad de los usuarios.", () => {
  before(async function () {
    this.usersManager = new UsersManagerMongo();
  });

  let user; //Probamos los métodos del manager de usuarios creando una variable 'user'

  it("Obtener de manera correcta todos los usuarios en un arreglo.", async function () {
    const result = await this.usersManager.getUsers();
    expect(result).to.be.deep.equal([]);
  });

  it("Crear un usuario nuevo. Deberíamos obtener un objeto.", async function () {
    const newUser = {
      first_name: "Juan Pablo",
      last_name: "Morgani",
      email: "morgani.jpg@gmail.com",
      age: 38,
      password: "123456",
      role: "Usuario",
      cart: "658c1a0d27225c9b73c639fe",
    };
    user = await this.usersManager.createUser(newUser);
    expect(user).to.have.property("_id");
    expect(user).to.be.an("object");
  });

  it("Obtenemos un usuario mediante su Id. Deberíamos obtener un objeto.", async function () {
    const userFromDb = await this.usersManager.getUserById(user._id);
    expect(userFromDb).to.have.property("_id");
    expect(userFromDb).to.be.an("object");
  });

  it("Obtenemos un usuario mediante su email. Deberíamos obtener un objeto.", async function () {
    const userFromDb = await this.usersManager.getUser(user.email);
    expect(userFromDb).to.have.property("_id");
    expect(userFromDb).to.be.an("object");
  });

  it("Actualizamos un usuario modificando su edad. Deberíamos obtener un objeto.", async function () {
    user.age = 40;
    const newUserFromDb = await this.usersManager.updateUser(user._id, user);
    expect(newUserFromDb).to.have.property("_id");
    expect(newUserFromDb).to.be.an("object");
    expect(newUserFromDb.age).to.be.equal(40);
  });

  it("Eliminamos un usuario através de su Id. Chequeamos luego no debería existir en la base de datos.", async function () {
    await this.usersManager.deleteUser(user._id);
    const userFromDb = await this.usersManager.getUserById(user._id);
    expect(userFromDb).to.be.not.exist;
  });

  it("Función para obtener el rol del usuario según el dominio del correo con el que se registra.", async function () {
    const result = roleClient(
      `username${generalConfig.managers.domainManagers}`
    );
    expect(result).to.be.equal("Administrador");
  });

  it("Función para generar un token a partir de un objeto (Usuario). Se debe probar que, de las propiedades del usuario NO devuelva las propiedades last_name y password", async function () {
    const token = generateToken(user);
    const result = jwt.verify(token, generalConfig.tokenJWT.tokenJWTkey);
    expect(result).to.not.have.property("password");
    expect(result).to.not.have.property("last_name");
  });
});
