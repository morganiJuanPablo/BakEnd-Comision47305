//
const deleteProductCart = async (productId) => {
  try {
    const response = await fetch(
      `/cart/65227efc9ddfa566df832c8e/product/${productId}`,
      { method: "DELETE" }
    );
    const result = await response.json();
    location.reload();
  } catch (error) {
    console.error("Error de red:", error);
  }
};
