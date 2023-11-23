//
const btnAddtoCart = document.getElementById("addToCartBtn");

btnAddtoCart.addEventListener("click", async () => {
  try {
    if (roleClient !== "administrador") {
      const response = await fetch(`/cart/${cartId}/product/${productId}`, {
        method: "POST",
      });
      const result = await response.json();
      Swal.fire({
        showConfirmButton: false,
        title: `¡Producto agregado con éxito!`,
        timer: 2000,
      });
    } else {
      Swal.fire({
        showConfirmButton: false,
        title: `¡El administrador no puede añadir productos al carrito!`,
        timer: 3000,
      });
    }
  } catch (error) {
    console.error("Error de red:", error);
  }
});
