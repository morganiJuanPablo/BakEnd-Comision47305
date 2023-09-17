const socketClient = io();

const cardProductAdmin = document.getElementById("cardProductAdmin");

socketClient.on("products", async (dataProducts) => {
  await dataProducts.forEach((p) => {
    const { thumbnail, title, description, category, price, code, stock, Id } =
      p;
    cardProductAdmin.innerHTML += ` <div class="cardProductAdmin"><img
    class="imgCardProductDetail"
    src=${thumbnail}
    alt=""
    />
    <div class="productInfo">
    <h1 class="title">${title}</h1>
    <p class="description">${description}</p>
    <p class="price"><span class="titlesInfo">Precio: </span>${price}€</p>
    <p class="code"><span class="titlesInfo">Código: </span>${code}</p>
    <p class="stock"><span class="titlesInfo">Stock: </span>${stock}</p>
    <p class="category"><span class="titlesInfo">Categoría:
      </span>${category}</p>
    <p class="id"><span class="titlesInfo">Id:
      </span>${Id}</p>
    </div>
    </div>`;
  });
});

//Hacemos el btn de carga de archivo EN POST más bonito que el por defecto
document.addEventListener("DOMContentLoaded", function () {
  const customUploadButton = document.getElementById("customUploadButton");
  const fileInput = document.getElementById("fileInput");
  const fileSelectedMessage = document.getElementById("fileSelectedMessage");

  customUploadButton.addEventListener("click", function () {
    fileInput.click();
  });
  fileInput.addEventListener("change", function () {
    const selectedFile = this.files[0];
    if (selectedFile) {
      fileSelectedMessage.textContent = "Archivo seleccionado";
    } else {
      fileSelectedMessage.textContent = "";
    }
  });
});
//Hacemos el btn de carga de archivo EN UPDATE más bonito que el por defecto
document.addEventListener("DOMContentLoaded", function () {
  const customUploadButton = document.getElementById("customUploadButton2");
  const fileInput = document.getElementById("fileInput2");
  const fileSelectedMessage = document.getElementById("fileSelectedMessage2");

  customUploadButton.addEventListener("click", function () {
    fileInput.click();
  });
  fileInput.addEventListener("change", function () {
    const selectedFile = this.files[0];
    if (selectedFile) {
      fileSelectedMessage.textContent = "Archivo seleccionado";
    } else {
      fileSelectedMessage.textContent = "";
    }
  });
});
