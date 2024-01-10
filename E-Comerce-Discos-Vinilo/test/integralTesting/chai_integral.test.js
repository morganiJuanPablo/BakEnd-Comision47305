//
import { app } from "../../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { ProductsManagerMongo } from "../../src/dao/mongoManagers/ProductsManagerMongo.js";
import { UsersManagerMongo } from "../../src/dao/mongoManagers/UsersManagerMongo.js";
import { userModel } from "../../src/dao/mongoManagers/modelsDB/users.model.js";
import { cartModel } from "../../src/dao/mongoManagers/modelsDB/carts.model.js";
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
let cookieSesionAdmin;
let mockUser;
let mockUserAdmin;
let mockProduct;

//FUNCION GENERAL TESTING
describe("Pruebas app e-commerce FF", function () {
  before(async function () {
    await userModel.deleteMany({});
    await productModel.deleteMany({});
    await cartModel.deleteMany({});
    this.productManager = new ProductsManagerMongo();
    this.UsersManager = new UsersManagerMongo();
  });

  //SESIONES
  ///////////////////////////////////////////////////////////////////////////////////////
  describe("Sesiones", function () {
    mockUser = {
      first_name: "Jocito",
      last_name: "Arouza",
      email: "jocitoarouza@gmail.com",
      age: 33,
      password: "123456",
    };

    mockUserAdmin = {
      first_name: "Administrador",
      last_name: "Foo",
      email: "administrador@ecommerceff.com",
      age: 18,
      password: "123456",
    };

    it("El endpoint /api/session/new_user registra el usuario de manera correcta en la app. Devuelve la vista login renderizada.", async function () {
      const response = await requester
        .post("/api/session/new_user")
        .send(mockUser);
      const userFromDb = await this.UsersManager.getUser(mockUser.email);
      expect(userFromDb.role).to.be.exist;
      expect(userFromDb.role).to.be.equal("Usuario");
      expect(userFromDb.cart).to.be.exist;
      //En la app no recibimos un json como respuesta sino que renderizamos una vista en el controlador si se logra registrar de manera exitosa el usuario, por lo que validamos de la siguiente manera. Corroboramos que exista en la respuesta en la propiedad text, un html que es la vista que se renderiza cuando el usuario se registra de manera correcta.
      expect(isHTML(response.text)).to.be.equal(true);
      expect(response.text).to.include(mockUser.first_name);
      expect(response.status).to.be.equal(200);

      const response2 = await requester
        .post("/api/session/new_user")
        .send(mockUserAdmin);
      const userAdminFromDb = await this.UsersManager.getUser(
        mockUserAdmin.email
      );
      expect(userAdminFromDb.role).to.be.exist;
      expect(userAdminFromDb.role).to.be.equal("Administrador");
      //En la app no recibimos un json como respuesta sino que renderizamos una vista en el controlador si se logra registrar de manera exitosa el usuario, por lo que validamos de la siguiente manera. Corroboramos que exista en la respuesta en la propiedad text, un html que es la vista que se renderiza cuando el usuario se registra de manera correcta.
      expect(isHTML(response2.text)).to.be.equal(true);
      expect(response2.text).to.include(mockUserAdmin.first_name);
      expect(response2.status).to.be.equal(200);
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

      const response2 = await requester
        .post("/api/session/login")
        .send({ email: mockUserAdmin.email, password: mockUserAdmin.password });
      expect(response2.header.location).to.be.equal("/products/inicio"); //Corroboramos que luego de que el usuario se loguea, se redirija a esta ruta, lo que quiere decir que salió todo bien.
      const cookieAdmin = response2.header["set-cookie"][0];
      const cookieAdminData = {
        name: cookieAdmin.split("=")[0],
        value: cookieAdmin.split("=")[1],
      };
      cookieSesionAdmin = cookieAdminData;
      expect(cookieSesionAdmin.name).to.be.equal("authLoginFoo");
    });

    it("El endpoint /api/session/profile obtiene el perfil del usuario con información no sensible.Devuelve una vista renderizada.", async function () {
      const response = await requester
        .get("/api/session/profile")
        .set("Cookie", [`${cookieSesion.name}=${cookieSesion.value}`]);
      expect(isHTML(response.text)).to.be.equal(true);
      expect(response.text).to.include(mockUser.email);
      expect(response.text).to.not.include(mockUser.password);
      expect(response.status).to.be.equal(200);

      const response2 = await requester
        .get("/api/session/profile")
        .set("Cookie", [
          `${cookieSesionAdmin.name}=${cookieSesionAdmin.value}`,
        ]);
      expect(isHTML(response2.text)).to.be.equal(true);
      expect(response2.text).to.include(mockUserAdmin.email);
      expect(response2.text).to.not.include(mockUserAdmin.password);
      expect(response2.status).to.be.equal(200);
    });
  });

  //PRODUCTOS
  ///////////////////////////////////////////////////////////////////////////////////////
  describe("Productos", function () {
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

    /*     it("Crear el producto en la base de datos", async function () {
      const userFromDb = await this.UsersManager.getUser(mockUser.email);
      newProduct.owner = userFromDb._id;
      mockProduct = await this.productManager.addProduct(newProduct);
      //Cambiamos el rol del usuario para que pueda generar un producto ya que 'Usuario' no puede crear productos, sólo pueden 'Premium' y 'Administrador'
      userFromDb.role = "Administrador";
      expect(mockProduct).to.have.property("_id");
      expect(userFromDb.role).to.be.not.equal("Usuario");
    }); */

    /*     it("Actualizar el producto de la base de datos", async function () {
      newProduct.price = 25.99;
      newProduct.stock = 8;
      await this.productManager.updateProductById(
        mockProduct._id.toString(),
        newProduct
      );
      const productFromDb = await this.productManager.getProductById(
        mockProduct._id.toString()
      );
      expect(productFromDb[0].stock).to.be.equal(8);
      expect(productFromDb[0].price).to.be.equal(25.99);
    }); */

    /*     it("El endpoint /item/:productId obtiene el producto según su Id. Devuelve una vista renderizada.", async function () {
      const productFromDb = await this.productManager.getProductById(
        mockProduct._id.toString()
      );
      const response = await requester
        .get(`/item/${productFromDb[0]._id}`)
        .set("Cookie", [`${cookieSesion.name}=${cookieSesion.value}`]);
      expect(isHTML(response.text)).to.be.equal(true);
      expect(response.text).to.include(mockUser.first_name);
      expect(response.status).to.be.equal(200);
    }); */

    /*     it("El endpoint /products/:category obtiene los productos según la categoría a la que pertenece. Si el parámetro `category` es `inicio` se traerán todos los productos. Devuelve una vista renderizada.", async function () {
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
    }); */

    /*     it("Eliminar el producto de la base de datos", async function () {
      await this.productManager.deleteProductById(mockProduct._id.toString());
      const productFromDb = await this.productManager.getProductById(
        mockProduct._id.toString()
      );
      expect(productFromDb).to.have.not.property("_id");
    }); */
  });

  //CARRITOS
  ///////////////////////////////////////////////////////////////////////////////////////
  describe("Carritos", async function () {
    /*     it("El endpoint /cart/:cartId obtiene el carrito según su Id. Devuelve una vista renderizada.", async function () {
      const userFromDb = await this.UsersManager.getUser(mockUser.email);
      const cartId = userFromDb.cart.toString();
      const response = await requester
        .get(`/cart/${cartId}`)
        .set("Cookie", [`${cookieSesion.name}=${cookieSesion.value}`]);
      expect(isHTML(response.text)).to.be.equal(true);
      expect(response.status).to.be.equal(200);
    }); */
    /*     it("El endpoint /cart/:cartId/product/:productId agrega un producto según su Id al carrito asignado al usuario conectado.", async function () {
      const userFromDb = await this.UsersManager.getUser(mockUser.email);
      const productFromDb = await this.productManager.getProductById(
        mockProduct._id.toString()
      );
      const cartId = userFromDb.cart;
      const productId = productFromDb[0]._id;
      const response = await requester
        .post(`/cart/${cartId}/product/${productId}`)
        .set("Cookie", [`${cookieSesion.name}=${cookieSesion.value}`]);
      console.log(response);
    }); */
  });
});
