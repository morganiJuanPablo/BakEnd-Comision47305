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

const fileInput = document.getElementById("fileInput");

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

const array = [
  {
    title: "Dee Gees",
    description:
      "Hail Satin es un álbum bajo el nombre Dee Gees, conmemorando el Record Store Day.",
    price: 32.99,
    thumbnail:
      "https://res.cloudinary.com/dqykftyy6/image/upload/v1694511121/ProyectoBackEnd/wunk0syfoaqjb_600_jbl6jy.jpg",
    code: "foo132",
    stock: 18,
    category: "EdicionesEspeciales",
    status: true,
  },
  {
    title: "Geatest hits",
    description:
      "Recopilación esencial de sus éxitos más icónicos, que abarcan su impresionante carrera y demuestran su habilidad para crear himnos rockeros atemporales.",
    price: 12.99,
    thumbnail:
      "https://res.cloudinary.com/dqykftyy6/image/upload/v1694511122/ProyectoBackEnd/81YbEgRXarL._SL1500__v4y9aj.jpg",
    code: "foo150",
    stock: 36,
    category: "EdicionesEspeciales",
    status: true,
  },
  {
    title: "One By One",
    description:
      "Destaca por su intensidad y emotivas letras, reflejando una fase de la banda marcada por la introspección y la experimentación musical. Este disco sigue siendo un favorito de los fanáticos.",
    price: 21.55,
    stock: 41,
    category: "TopVentas",
    code: "Foo160",
    thumbnail:
      "https://res.cloudinary.com/dqykftyy6/image/upload/v1695136182/ProyectoBackEnd/0828765555524_600_us9bxe.jpg",
  },
  {
    title: "There Is Nothing Left To Lose",
    description:
      "Muestra la madurez y la evolución de la banda, con un enfoque en canciones melódicas y emotivas. Este disco representa un punto de inflexión en la carrera de Foo Fighters.",
    price: 21.99,
    stock: 7,
    category: "EdicionesEspeciales",
    code: "Foo162",
    thumbnail:
      "https://res.cloudinary.com/dqykftyy6/image/upload/v1695136554/0888880335630_600_f67ct1.jpg",
  },
  {
    title: "Echoes, Silence, Patience & Grace",
    description:
      "En este disco, the Foos alternan con toda naturalidad lo acústico con lo eléctrico, el delicado folk de guitarra de púa con el potente hard rock que viene definiendo al grupo.",
    price: 10.59,
    stock: 127,
    category: "10",
    code: "TopVentas",
    thumbnail:
      "https://res.cloudinary.com/dqykftyy6/image/upload/v1694511121/ProyectoBackEnd/71Hq8BJMGqL._UF894_1000_QL80__ineqof.jpg",
  },
  {
    title: "Sonic Highways",
    description:
      "El álbum en formato vinilo viene con nueve portadas diferentes en las que incluyen ocho variantes, cada una de ellas presentando las ciudades donde se grabó el álbum: Austin, Chicago, Los Angeles, Nashville, New Orleans, New York, Seattle, y Washington, D.C.",
    price: 26.99,
    thumbnail:
      "https://res.cloudinary.com/dqykftyy6/image/upload/v1694511121/ProyectoBackEnd/81Ebxjui1qL._SL1500__hqjqpl.jpg",
    code: "foo124",
    stock: "5",
    category: "EdicionesEspeciales",
    status: true,
  },
  {
    title: "Concrete and gold",
    description:
      "Foo Fighters es un grupo de rock estadounidense formada en la ciudad de Seattle en 1994 por el exbaterista de Nirvana, Dave Grohl. Este es su disco lanzamiento.",
    price: 28.99,
    thumbnail:
      "https://res.cloudinary.com/dqykftyy6/image/upload/v1694511122/ProyectoBackEnd/81T4_-KbjSL._SL1500__gy7xti.jpg",
    code: "foo151",
    stock: "4",
    category: "TopVentas",
    status: true,
  },
];

