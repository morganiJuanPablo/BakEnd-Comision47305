//
import { app } from "../../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { userModel } from "../../src/dao/mongoManagers/modelsDB/users.model.js";

//con esta función evaluamos con expresiones regulares de html si el texto recibido es efectivamente un html
function isHTML(textContent) {
  return /<!DOCTYPE html>|<html.*>|<\/html>|<head>|<\/head>|<body>|<\/body>/i.test(
    textContent
  );
}
const requester = supertest(app);

describe("Pruebas app e-commerce FF", function () {
  describe("Sesiones", function () {
    const mockUser = {
      first_name: "Juan Pablo",
      last_name: "Morgani",
      email: "morgani.jpg@gmail.com",
      age: 38,
      password: "123456",
    };
    before(async function () {
      this.cookie;
      await userModel.deleteMany({});
    });

    it("Endpoint para registrar el usuario de manera correcta en la app. /api/session/new_user", async function () {
      const response = await requester
        .post("/api/session/new_user")
        .send(mockUser);
      //En la app no recibimos un json como respuesta sino que renderizamos una vista en el controlador si se logra registrar de manera exitosa el usuario, por lo que validamos de la siguiente manera. Corroboramos que exista en la respuesta en la propiedad text, un html que es la vista que se renderiza cuando el usuario se registra de manera correcta.
      expect(isHTML(response.text)).to.be.equal(true);
      expect(response.text).to.include(mockUser.first_name);
      expect(response.status).to.be.equal(200);
    });
  });
});
