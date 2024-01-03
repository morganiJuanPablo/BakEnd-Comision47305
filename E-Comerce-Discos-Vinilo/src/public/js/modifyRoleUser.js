//
const getUserId = document.getElementById("getUserId");
const loaderBack = document.querySelector(".loaderBackground");
const userInfoContainer = document.getElementById("userInfoContainer");
const messageErrorContainer = document.getElementById("messageErrorContainer");

getUserId.addEventListener("submit", async function (e) {
  try {
    e.preventDefault();
    const userId = document.getElementById("userId").value;
    const response = await fetch(`/api/session/get_user_by_id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });
    const result = await response.json();
    const { status, email, role, message } = result;
    if (status === "success") {
      loaderBack.classList.add("off");
      messageErrorContainer.classList.add("off");

      userInfoContainer.innerHTML = `<h3 class="userInfoTitle">Usuario encontrado</h3>
      <h3 class="userEmail">${email}</h3>
      <p class="userInfoText">A continuación se podrá cambiar el rol a "Premium" o "Usuario</p>
      <p class="userInfo">Rol actual: <span>${role}</span></p>
      <button id="modifyUserRoleBtn"class="modifyUserRoleBtn">// Cambiar // </button>`;

      const modifyUserRoleBtn = document.getElementById("modifyUserRoleBtn");
      modifyUserRoleBtn.addEventListener("click", async () => {
        const swalWithBootstrapButtons = Swal.mixin({
          buttonsStyling: false,
        });
        swalWithBootstrapButtons
          .fire({
            title: `¿Estás seguro de actualizar el rol del usuario?`,
            icon: false,
            showCancelButton: true,
            confirmButtonText: "Si",
            cancelButtonText: "No",
            reverseButtons: false,
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              const responseRoleChanged = await fetch(
                `/api/session/modify_role_user`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ userId: userId }),
                }
              );
              const resultRoleChanged = await responseRoleChanged.json();
              Swal.fire({
                showConfirmButton: false,
                title: `Usuario actualizado con éxito.\nNuevo rol: ${resultRoleChanged.data}`,
                timer: 3500,
              });
              setTimeout(() => {
                location.reload();
              }, 3000);
            }
          });
      });
    }
    if (status === "error" || !status) {
      loaderBack.classList.add("off");
      messageErrorContainer.innerHTML = `<p class="messageError">${message}</p>`;
    }
  } catch (error) {
    console.log(error.message);
  }
});
