//
import { app } from "../../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { ProductsManagerMongo } from "../../src/dao/mongoManagers/ProductsManagerMongo.js";
import { userModel } from "../../src/dao/mongoManagers/modelsDB/users.model.js";
import { productModel } from "../../src/dao/mongoManagers/modelsDB/products.model.js";

//con esta función evaluamos con expresiones regulares de html si el texto recibido es efectivamente un html
function isHTML(textContent) {
  return /<!DOCTYPE html>|<html.*>|<\/html>|<head>|<\/head>|<body>|<\/body>/i.test(
    textContent
  );
}
const requester = supertest(app);

//Variables globales
let cookieSesion;
let mockProduct;
let mockUser;

//FUNCION GENERAL TESTING
describe("Pruebas app e-commerce FF", function () {
  before(async function () {
    await userModel.deleteMany({});
    await productModel.deleteMany({});
  });

  //SESIONES
  ///////////////////////////////////////////////////////////////////////////////////////
  describe("Sesiones", function () {
    mockUser = {
      first_name: "Juan Pablo",
      last_name: "Morgani",
      email: "morgani.jpg@gmail.com",
      age: 38,
      password: "123456",
    };

    it("El endpoint /api/session/new_user registra el usuario de manera correcta en la app.", async function () {
      const response = await requester
        .post("/api/session/new_user")
        .send(mockUser);
      //En la app no recibimos un json como respuesta sino que renderizamos una vista en el controlador si se logra registrar de manera exitosa el usuario, por lo que validamos de la siguiente manera. Corroboramos que exista en la respuesta en la propiedad text, un html que es la vista que se renderiza cuando el usuario se registra de manera correcta.
      expect(isHTML(response.text)).to.be.equal(true);
      expect(response.text).to.include(mockUser.first_name);
      expect(response.status).to.be.equal(200);
    });

    it("El endpoint /api/session/login loguea al usuario en la app. Al hacerlo de manera correcta, el controlador redirecciona a la vista del inicio con la sesión iniciada.", async function () {
      const response = await requester
        .post("/api/session/login")
        .send({ email: mockUser.email, password: mockUser.password });
      expect(response.header.location).to.be.equal("/products/inicio"); //Corroboramos que luego de que el usuario se loguea, se redirija a esta ruta, lo que quiere decir que salió todo bien.
      const cookie = response.header["set-cookie"][0];
      const cookieData = {
        name: cookie.split("=")[0],
        value: cookie.split("=")[1],
      };
      cookieSesion = cookieData;
      expect(cookieSesion.name).to.be.equal("authLoginFoo");
    });

    it("El endpoint /api/session/profile obtiene el perfil del usuario con información no sensible.", async function () {
      const response = await requester
        .get("/api/session/profile")
        .set("Cookie", [`${cookieSesion.name}=${cookieSesion.value}`]);
      expect(isHTML(response.text)).to.be.equal(true);
      expect(response.text).to.include(mockUser.email);
      expect(response.text).to.not.include(mockUser.password);
      expect(response.status).to.be.equal(200);
    });
  });

  //PRODUCTOS
  ///////////////////////////////////////////////////////////////////////////////////////
  describe("Productos", function () {
    before(async function () {
      this.productManager = new ProductsManagerMongo();
    });
    const newProduct = {
      title: "The Colour And The Shape",
      description:
        "The Colour and the Shape es el segundo álbum de la banda Foo Fighters. Fue lanzado al mercado el 20 de mayo de 1997 por Capitol a través del sello Roswell.",
      price: 16.99,
      thumbnail:
        "https://res.cloudinary.com/dqykftyy6/image/upload/v1694511123/ProyectoBackEnd/0884977570328_600_enkx1l.jpg",
      code: "foo130",
      stock: 15,
      category: "TopVentas",
      status: true,
    };

    it("Crear el producto en la base de datos", async function () {
      /* newProduct.owner = userConected._id; */
      mockProduct = await this.productManager.addProduct(newProduct);
      expect(mockProduct).to.have.property("_id");
    });

    it("El endpoint /item/:productId obtiene el producto según su Id.", async function () {
      const productFromDb = await this.productManager.getProductById(
        mockProduct._id.toString()
      );
      const response = await requester
        .get(`/item/${productFromDb[0]._id}`)
        .set("Cookie", [`${cookieSesion.name}=${cookieSesion.value}`]);
      expect(isHTML(response.text)).to.be.equal(true);
      expect(response.text).to.include(mockUser.first_name);
      expect(response.status).to.be.equal(200);
    });

    it("El endpoint /products/:category obtiene los producto según su la categoría del mismo. Si el parámetro `category` es `inicio` se traerán todos los productos", async function () {
      const response = await requester
        .get(`/products/inicio`)
        .set("Cookie", [`${cookieSesion.name}=${cookieSesion.value}`]);
      expect(isHTML(response.text)).to.be.equal(true);
      expect(response.text).to.include(mockProduct.title);
      expect(response.status).to.be.equal(200);

      const response2 = await requester
        .get(`/products/${mockProduct.category}`)
        .set("Cookie", [`${cookieSesion.name}=${cookieSesion.value}`]);
        expect(isHTML(response.text)).to.be.equal(true);
        expect(response2.text).to.include(mockProduct.title);
        expect(response2.status).to.be.equal(200);
    });
  });
});
