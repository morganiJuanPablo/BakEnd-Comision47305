const fs = require("fs").promises;

class ProductManager {
  constructor() {
    this.products = [];
    this.filePath = "products.json";
    this.loadProductsFromFile();
  }

  async loadProductsFromFile() {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  async saveProductsToFile() {
    await fs.writeFile(
      this.filePath,
      JSON.stringify(this.products, null, 2),
      "utf-8"
    );
  }

  async addProduct(product) {
    try {
      await this.loadProductsFromFile();

      const newId =
        this.products.length > 0
          ? this.products[this.products.length - 1].Id + 1
          : 1;
      product.Id = newId;

      this.products.push(product);
      await this.saveProductsToFile();
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  }

  async getProducts() {
    try {
      await this.loadProductsFromFile();
      console.log(this.products);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  }

  async getProductById(Id) {
    try {
      await this.loadProductsFromFile();
      const IdExist = this.products.find((elem) => elem.Id === Id);
      if (IdExist) {
        console.log(IdExist);
      } else {
        console.log("Error: producto no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener producto por Id:", error);
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      await this.loadProductsFromFile();
      const index = this.products.findIndex((product) => product.Id === id);
      if (index !== -1) {
        this.products[index] = {
          ...this.products[index],
          ...updatedFields,
          Id: id,
        };
        await this.saveProductsToFile();
        console.log("Producto actualizado con éxito.");
      } else {
        console.log("Producto no encontrado.");
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  }

  async deleteProduct(id) {
    try {
      await this.loadProductsFromFile();
      const index = this.products.findIndex((product) => product.Id === id);
      if (index !== -1) {
        this.products.splice(index, 1);
        await this.saveProductsToFile();
        console.log("Producto eliminado con éxito.");
      } else {
        console.log("Producto no encontrado.");
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  }
}

///IR DESCOMENTANDO SEGUN LAS PRUEBAS QUE SE QUIERAN HACER

///Instanciamos los productos
const products = new ProductManager();

//Obtenemos el arreglo vacío

/* products.getProducts(); */

//Intento fallido de agregar un producto ya que no todos los campos están llenos

/* products.addProducts(
  "Disco Foo Fighters",
  "Gira Argentina 2015",
  1500,
  "",
  "abc123",
  25
);  */

//Agregamos el producto

/* products.addProducts(
  "Disco Foo Fighters",
  "Gira Argentina 2015",
  1500,
  "Imagen",
  "abc123",
  25
); */

//Aquí se verá ya el arreglo con el producto agregado
/* products.getProducts();  */

//Queriendo agregar otro producto con el mismo "code" saldrá error en consola
/* products.addProducts(
  "Disco Red Hot Chilli Peppers",
  "Gira Argentina 2010",
  1600,
  "Imagen",
  "abc123",
  45
); */

//Agregamos varios productos para que se reflejen los Id asignados

/* products.addProducts(
  "Disco Foo Fighters",
  "Gira Argentina 2015",
  1500,
  "Imagen",
  "abc121",
  25
);
products.addProducts(
  "Disco Red Hot Chilli Peppers",
  "Gira Argentina 2010",
  1600,
  "Imagen",
  "abc122",
  45
);
products.addProducts(
  "Disco REM",
  "Gira Argentina 2005",
  1900,
  "Imagen",
  "abc123",
  48
); */

//Aquí obtenemos el arreglo con los tres productos
/* products.getProducts(); */

//Búsqueda de productos según Id
/* products.getProductById(2) //Según lo anterior nos devuelve el producto con Id 2 */
/* products.getProductById(12) // Aún no hemos agregado el Id 12 por lo que diremos por consola que no existe */
