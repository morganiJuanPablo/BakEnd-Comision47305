////Desafío entregable Clase 02

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProducts(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("Error: Todos los campos son obligatorios");
      return;
    } else {
      let newId;
      if (this.products.length === 0) {
        newId = 1;
      } else {
        newId = this.products[this.products.length - 1].Id + 1;
      }
      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        Id: newId,
      };
      const codeExist = this.products.find((elem) => elem.code === code);
      if (codeExist) {
        return console.log("El producto con el código ingresado ya existe");
      } else {
        this.products.push(newProduct);
      }
    }
  }

  getProducts() {
    return console.log(this.products);
  }

  getProductById(Id) {
    const IdExist = this.products.find((elem) => elem.Id === Id);
    if (IdExist) {
      return console.log(IdExist);
    } else {
      return console.log("Error: producto no encontrado");
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
); */

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
