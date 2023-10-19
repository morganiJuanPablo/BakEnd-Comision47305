//
const socketClient = io();

const messageInput = document.getElementById("chatSection--inputText");
const btnSubmit = document.getElementById("chatSection--submitBtn");
const welcomeMessage = document.getElementById("welcome-message");
const messagesContainer = document.getElementById(
  "chatSection--messagesSection"
);

//Conexión del usuario
/* Swal.fire({
  title: "Ingresa tu nombre de usuario",
  input: "text",
  inputValidator: (value) => {
    return !value && "Debes ingresar tu usuario";
  },
  allowOutsideClick: false,
  allowEscapeKey: false,
}).then((inputValue) => {
  user = inputValue.value;
  welcomeMessage.innerHTML = ``;
}); */

//Evento submit del mensaje
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const userMessage = { message: messageInput.value, user };
  socketClient.emit("messageChat", userMessage);
  messageInput.value = "";
});

//Mensajes para ser pintados en el front
socketClient.on("historyChat", (historyChat) => {
  let chatElems = "";
  historyChat.forEach((mess) => {
    chatElems += `
    <div class="messageUserContainer">
    <p class="messageUser">${mess.user} dijo:</p>
    <p class="message">${mess.message}</p>
    </div>`;
  });
  messagesContainer.innerHTML = chatElems;
});
