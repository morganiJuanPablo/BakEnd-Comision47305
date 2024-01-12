//
import { app } from "../../src/app.js";
import { expect } from "chai";
import supertest from "supertest";
import { ProductsManagerMongo } from "../../src/dao/mongoManagers/ProductsManagerMongo.js";
import { UsersManagerMongo } from "../../src/dao/mongoManagers/UsersManagerMongo.js";
import { userModel } from "../../src/dao/mongoManagers/modelsDB/users.model.js";
import { cartModel } from "../../src/dao/mongoManagers/modelsDB/carts.model.js";
import { productModel } from "../../src/dao/mongoManagers/modelsDB/products.model.js";
import { CartsManagerMongo } from "../../src/dao/mongoManagers/CartsManagerMongo.js";

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
let mockProductByAdmin;
let mockProduct;

//FUNCION GENERAL TESTING
describe("Pruebas app e-commerce FF", function () {
  before(async function () {
    this.productManager = new ProductsManagerMongo();
    this.usersManager = new UsersManagerMongo();
    this.cartsManager = new CartsManagerMongo();
  });
  after(async function () {
    //Eliminamos sólo los productos y usuarios mockeados para este test
    await userModel.deleteOne({ _id: mockUser._id });
    await userModel.deleteOne({ _id: mockUserAdmin._id });
    await productModel.deleteOne({ _id: mockProduct._id });
    await productModel.deleteOne({ _id: mockProductByAdmin._id });
    await cartModel.deleteOne({ _id: mockUser.cart });
    await cartModel.deleteOne({ _id: mockUser.cart });
  });

  //SESIONES
  ///////////////////////////////////////////////////////////////////////////////////////
  describe("Sesiones", function () {
    const newUser = {
      first_name: "Jocito",
      last_name: "Arouza",
      email: "jocitoarouza@gmail.com",
      age: 33,
      password: "123456",
    };

    const newUserAdmin = {
      first_name: "Administrador",
      last_name: "Foo",
      email: "administrador@ecommerceff.com",
      age: 18,
      password: "123456",
    };

    it("El endpoint /api/session/new_user registra el usuario de manera correcta en la app. Devuelve la vista login renderizada.", async function () {
      const response = await requester
        .post("/api/session/new_user")
        .send(newUser);
      mockUser = await this.usersManager.getUser(newUser.email);
      //En la app no recibimos un json como respuesta sino que renderizamos una vista en el controlador si se logra registrar de manera exitosa el usuario, por lo que validamos de la siguiente manera. Corroboramos que exista en la respuesta en la propiedad text, un html que es la vista que se renderiza cuando el usuario se registra de manera correcta.
      expect(response.status).to.be.equal(200);
      expect(isHTML(response.text)).to.be.equal(true);
      expect(response.text).to.include(mockUser.first_name);
      expect(mockUser._id).to.be.exist;
      expect(mockUser.cart).to.be.exist;
      expect(mockUser.role).to.be.exist;
      expect(mockUser.role).to.be.equal("Usuario");

      const response2 = await requester
        .post("/api/session/new_user")
        .send(newUserAdmin);
      mockUserAdmin = await this.usersManager.getUser(newUserAdmin.email);
      //En la app no recibimos un json como respuesta sino que renderizamos una vista en el controlador si se logra registrar de manera exitosa el usuario, por lo que validamos de la siguiente manera. Corroboramos que exista en la respuesta en la propiedad text, un html que es la vista que se renderiza cuando el usuario se registra de manera correcta.
      expect(response2.status).to.be.equal(200);
      expect(isHTML(response2.text)).to.be.equal(true);
      expect(response2.text).to.include(mockUserAdmin.first_name);
      expect(mockUser._id).to.be.exist;
      expect(mockUserAdmin.role).to.be.exist;
      expect(mockUserAdmin.role).to.be.equal("Administrador");
    });

    it("El endpoint /api/session/login loguea al usuario en la app. Al hacerlo de manera correcta, el controlador redirecciona a la vista del inicio con la sesión iniciada.", async function () {
      const response = await requester
        .post("/api/session/login")
        .send({ email: newUser.email, password: newUser.password });
      const cookie = response.header["set-cookie"][0];
      const cookieData = {
        name: cookie.split("=")[0],
        value: cookie.split("=")[1],
      };
      cookieSesion = cookieData;
      expect(response.header.location).to.be.equal("/products/inicio"); //Corroboramos que luego de que el usuario se loguea, se redirija a esta ruta, lo que quiere decir que salió todo bien.
      expect(cookieSesion.name).to.be.equal("authLoginFoo");

      const response2 = await requester
        .post("/api/session/login")
        .send({ email: newUserAdmin.email, password: newUserAdmin.password });
      const cookieAdmin = response2.header["set-cookie"][0];
      const cookieAdminData = {
        name: cookieAdmin.split("=")[0],
        value: cookieAdmin.split("=")[1],
      };
      cookieSesionAdmin = cookieAdminData;
      expect(response2.header.location).to.be.equal("/products/inicio"); //Corroboramos que luego de que el usuario se loguea, se redirija a esta ruta, lo que quiere decir que salió todo bien.
      expect(cookieSesionAdmin.name).to.be.equal("authLoginFoo");
    });

    it("El endpoint /api/session/profile obtiene el perfil del usuario con información no sensible. Devuelve una vista renderizada.", async function () {
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
    const newProductByAdmin = {
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

    const newProductByPremium = {
      title: "Geatest hits",
      description:
        "Recopilación esencial de sus éxitos más icónicos, que abarcan su impresionante carrera y demuestran su habilidad para crear himnos rockeros atemporales.",
      price: 14.99,
      thumbnail:
        "https://res.cloudinary.com/dqykftyy6/image/upload/v1694511122/ProyectoBackEnd/81YbEgRXarL._SL1500__v4y9aj.jpg",
      code: "foo131",
      stock: 17,
      category: "EdicionesEspeciales",
      status: false,
    };

    it("Crear un producto en la base de datos", async function () {
      //El administrador crea un producto
      newProductByAdmin.owner = mockUserAdmin._id;
      mockProductByAdmin = await this.productManager.addProduct(
        newProductByAdmin
      );
      expect(mockProductByAdmin).to.have.property("_id");
      expect(mockUserAdmin.role).to.be.not.equal("Usuario");

      //El usuario premium crea un producto
      //Cambiamos el rol del usuario para que pueda generar un producto ya que 'Usuario' no puede crearlos, sólo pueden 'Premium' y 'Administrador'. Si el rol es 'Usuario' la prueba no pasa.
      mockUser.role = "Premium";
      newProductByPremium.owner = mockUser._id;
      mockProduct = await this.productManager.addProduct(newProductByPremium);
      expect(mockProduct).to.have.property("_id");
      expect(mockUser.role).to.be.not.equal("Usuario");
    });

    it("Actualizar un producto de la base de datos", async function () {
      newProductByPremium.price = 25.99;
      newProductByPremium.stock = 8;
      await this.productManager.updateProductById(
        mockProduct._id.toString(),
        newProductByPremium
      );
      const productUpdated = await this.productManager.getProductById(
        mockProduct._id.toString()
      );
      expect(productUpdated[0].stock).to.be.equal(8);
      expect(productUpdated[0].price).to.be.equal(25.99);
    });

    it("El endpoint /item/:productId obtiene el producto según su Id. Devuelve una vista renderizada.", async function () {
      const productId = mockProduct._id;
      const response = await requester
        .get(`/item/${productId}`)
        .set("Cookie", [`${cookieSesion.name}=${cookieSesion.value}`]);
      expect(isHTML(response.text)).to.be.equal(true);
      expect(response.text).to.include(mockProduct.title);
      expect(response.status).to.be.equal(200);
    });

    it("El endpoint /products/:category obtiene los productos según la categoría a la que pertenece. Si el parámetro `category` es `inicio` se traerán todos los productos. Devuelve una vista renderizada.", async function () {
      const response = await requester
        .get(`/products/inicio`)
        .set("Cookie", [`${cookieSesion.name}=${cookieSesion.value}`]);
      expect(isHTML(response.text)).to.be.equal(true);
      //Chequeamos que estén renderizándose todos los productos. Con diferentes categorías.
      expect(response.text).to.include(mockProduct.title);
      expect(response.text).to.include(mockProductByAdmin.title);
      expect(response.status).to.be.equal(200);

      const category = mockProduct.category;
      const response2 = await requester
        .get(`/products/${category}`)
        .set("Cookie", [`${cookieSesion.name}=${cookieSesion.value}`]);
      expect(isHTML(response.text)).to.be.equal(true);
      expect(response2.text).to.include(mockProduct.title);
      expect(response2.status).to.be.equal(200);
    });

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
    let userCart;

    it("El endpoint /cart/:cartId obtiene el carrito según su Id. Devuelve una vista renderizada.", async function () {
      const cartId = mockUser.cart.toString();
      const userCart = await this.cartsManager.getCartById(cartId);

      const response = await requester
        .get(`/cart/${cartId}`)
        .set("Cookie", [`${cookieSesion.name}=${cookieSesion.value}`]);

      expect(Array.isArray(userCart.products)).to.be.equal(true);
      expect(isHTML(response.text)).to.be.equal(true);
      expect(response.status).to.be.equal(200);
    });

    it("El endpoint /cart/:cartId/product/:productId agrega un producto, según su Id, al carrito asignado al usuario conectado.", async function () {
      //Un usuario premium intenta añadir al carrito un producto añadido por él mismo.
      const cartId = mockUser.cart.toString();
      const productId = mockProduct._id.toString();
      const response = await requester
        .post(`/cart/${cartId}/product/${productId}`)
        .set("Cookie", [`${cookieSesion.name}=${cookieSesion.value}`]);
      expect(response.body.status).to.be.equal("error");
      expect(response.body.message).to.be.equal(
        "No puedes añadir al carrito productos que has creado."
      );

      //El administrador intenta añadir al carrito un producto. Pasamos en la petición su cookie.
      const productAdminId = mockProductByAdmin._id.toString();
      const response2 = await requester
        .post(`/cart/${cartId}/product/${productId}`)
        .set("Cookie", [
          `${cookieSesionAdmin.name}=${cookieSesionAdmin.value}`,
        ]);
      expect(response2.body.status).to.be.equal("error");
      expect(response2.body.message).to.be.equal(
        "El administrador no puede añadir productos al carrito."
      );

      //Un usuario premium intenta añadir al carrito un producto creado por otro usuario, en este caso el producto creado por el administrador.
      const response3 = await requester
        .post(`/cart/${cartId}/product/${productAdminId}`)
        .set("Cookie", [`${cookieSesion.name}=${cookieSesion.value}`]);
      userCart = await this.cartsManager.getCartById(cartId);
      expect(response3.body.status).to.be.equal("success");
      expect(response3.body.message).to.be.equal(
        "¡Producto agregado al carrito!"
      );
      expect(userCart.products).to.not.be.empty;
    });

    it("El endpoint /cart/:cartId/product/:productId elimina un producto, según su Id, del carrito asignado al usuario conectado.", async function () {
      const cartId = mockUser.cart.toString();
      const productInCart = userCart.products[0].productId;
      //El usuario conectado si es "Premium" o "Usuario" puede eliminar productos del carrito.
      const response = await requester
        .delete(`/cart/${cartId}/product/${productInCart._id}`)
        .set("Cookie", [`${cookieSesion.name}=${cookieSesion.value}`]);
      expect(response.body.status).to.be.equal("success");
      expect(response.body.message).to.be.equal(
        "Producto eliminado del carrito"
      );
      expect(userCart.products[0]).to.not.deep.include({
        _id: productInCart._id,
      });
    });
  });
});
