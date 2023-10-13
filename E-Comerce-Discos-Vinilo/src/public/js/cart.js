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

const emptyCart = async () => {
  try {
    const response = await fetch(`/cart/65227efc9ddfa566df832c8e`, {
      method: "DELETE",
    });
    const result = await response.json();
    location.reload();
  } catch (error) {
    console.error("Error de red:", error);
  }
};

async function emptyCartCheck() {
  const cartContainerCards = await document.getElementById(
    "cartContainerCards"
  );
  if (!cartContainerCards.innerHTML.trim()) {
    cartContainerCards.innerHTML = `<p class='emptyCartmessage'> El carrito está vacío<br>:(</p>`
  }
}

emptyCartCheck();
