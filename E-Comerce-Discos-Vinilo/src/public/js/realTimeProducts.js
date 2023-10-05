//
const socketClient = io();

const cardProductAdmin = document.getElementById("cardProductAdmin");

//Recibimos los productos
socketClient.on("arrayProducts", (dataProducts) => {
  let productsElms = "";
  dataProducts.forEach((p) => {
    const {
      thumbnail,
      title,
      description,
      category,
      price,
      code,
      stock,
      _id,
      status,
    } = p;
    productsElms += ` <div class="cardProductAdmin">
    <div class="imgAndDeleteBtn">
    <img
    class="imgCardProductDetail"
    src=${thumbnail}
    alt="Vinyl Cover"
    />
    <button class="trashBtn" onclick= deleteProduct('${_id}') ><img src="https://res.cloudinary.com/dqykftyy6/image/upload/v1695040127/TrashIcon-01_hgtcmn.png" alt="Eliminar producto"></button>
    </div>
    <div class="productInfo">
    <h1 class="title">${title}</h1>
    <p class="description">${description}</p>
    <p class="price"><span class="titlesInfo">Precio: </span>${price}€</p>
    <p class="code"><span class="titlesInfo">Código: </span>${code}</p>
    <p class="stock"><span class="titlesInfo">Stock: </span>${stock}</p>
    <p class="category"><span class="titlesInfo">Categoría:
      </span>${category}</p>
      <p class="status"><span class="titlesInfo">Status:
        </span>'${status}'</p>
    <p class="id"><span class="titlesInfo">Id:
      </span>'${_id}'</p>      
    </div>
    </div>`;
  });
  cardProductAdmin.innerHTML = productsElms;
});

//Formulario para crear producto
const createProductsForm = document.getElementById("createProductsForm");
const inputStatus = document.getElementById("inputStatus");
let isChecked = false;

inputStatus.addEventListener("change", () => {
  isChecked = inputStatus.checked;
});

const fileInput = document.getElementById("thumbnail");

fileInput.addEventListener("change", function () {
  const selectedFile = this.files[0];
  if (selectedFile) {
    fileSelectedMessage.textContent = "Archivo seleccionado";
  } else {
    fileSelectedMessage.textContent = "";
  }
});

createProductsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(createProductsForm);
  const productJson = {};
  for (const [key, value] of formData.entries()) {
    //Key se refiere a name del input, value a lo que ingresamos y hacemos un for of para ir capturando los valores en cada input de una sola vez
    productJson[key] = value;
  }
  productJson.price = +productJson.price;
  productJson.stock = +productJson.stock;
  productJson["status"] = isChecked;
  if (productJson.thumbnail) {
    Swal.fire({
      imageUrl: `${productJson.thumbnail}`,
      showConfirmButton: false,
      text: `¡Producto creado con éxito!`,
    });
  }
  socketClient.emit("productJson", productJson);
  createProductsForm.reset();
});

//Formulario para actualizar producto
const updateProductsForm = document.getElementById("updateProductsForm");
updateProductsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const updateData = new FormData(updateProductsForm);
  const productUpdatedJson = {};
  for (const [key, value] of updateData.entries()) {
    if (value != "" && value != null) {
      productUpdatedJson[key] = value;
    }
    parseFloat(productUpdatedJson.price);
    parseInt(productUpdatedJson.stock);
  }
  Swal.fire({
    position: "center",
    icon: false,
    title: `El producto con Id: "${productUpdatedJson.Id}" fue actualizado con éxito`,
    showConfirmButton: false,
  });
  socketClient.emit("productUpdatedJson", productUpdatedJson);
  updateProductsForm.reset();
});

//Delete products By Id
const deleteProduct = (productId) => {
  const swalWithBootstrapButtons = Swal.mixin({
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: `¿Estás seguro de eliminar el producto con Id: "${productId}"?`,
      icon: false,
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
      reverseButtons: false,
    })
    .then((result) => {
      if (result.isConfirmed) {
        socketClient.emit("deleteProductById", productId);
      }
    });
};
