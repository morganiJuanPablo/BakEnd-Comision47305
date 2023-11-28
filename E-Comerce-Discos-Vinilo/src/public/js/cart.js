//
const deleteProductCart = async (productId) => {
  try {
    const response = await fetch(`/cart/${cartId}/product/${productId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    location.reload();
  } catch (error) {
    console.error("Error de red:", error);
  }
};

const emptyCart = async () => {
  try {
    const response = await fetch(`/cart/${cartId}`, {
      method: "DELETE",
    });
    const result = await response.json();
    location.reload();
  } catch (error) {
    console.error("Error de red:", error);
  }
};

const btnEmptyCart = document.getElementById("btnEmptyCart");
const totalPriceContainer = document.getElementById("totalPriceContainer");
const cartContainerCards = document.getElementById("cartContainerCards");

async function emptyCartCheck() {
  if (!cartContainerCards.innerHTML.trim()) {
    cartContainerCards.innerHTML = `<p class='emptyCartmessage'> El carrito está vacío</p>`;
    btnEmptyCart.classList.add("btnEmptyCartDisabled");
    totalPriceContainer.classList.add("totalPriceDisabled");
  }
}

emptyCartCheck();

const purchaseAction = async () => {
  try {
    window.location.href = `http://localhost:8080/cart/${cartId}/purchase`
    const response = await fetch(`/cart/${cartId}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json();
    
  } catch (error) {
    console.error("Error de red:", error);
  }
};
