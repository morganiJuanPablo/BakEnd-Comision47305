//
const addToCart = async (productId) => {
  try {
    const response = await fetch(
      `/cart/65227efc9ddfa566df832c8e/product/${productId}`,
      { method: "POST" }
    );
    const result = await response.json();
    Swal.fire({
      showConfirmButton: false,
      title: `¡Producto agregado con éxito!`,
      timer: 2000,
    });
  } catch (error) {
    console.error("Error de red:", error);
  }
};
