//
const sortBtn = document.getElementById("sortBtn");
let sort;

sortBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(`http://localhost:8080/products/inicio`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({sort: true}),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
});
