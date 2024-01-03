//
const btnAddtoCart = document.getElementById("addToCartBtn");

function capturarValor() {
  const quantitySelected = document.getElementById("quantity").value;
  return quantitySelected;
}

btnAddtoCart.addEventListener("click", async () => {
  try {
    const response = await fetch(`/cart/${cartId}/product/${productId}`, {
      method: "POST",
      body: JSON.stringify({ quantity: capturarValor() }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    Swal.fire({
      showConfirmButton: false,
      title: `${result.message}`,
      timer: 3000,
    });
  } catch (error) {
    console.error("Error de red:", error);
  }
});
