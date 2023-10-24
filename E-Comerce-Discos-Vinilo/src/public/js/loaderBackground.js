//
const submitBtns = document.querySelectorAll(".submitBtns");
const loaderBackground = document.querySelector(".loaderBackground");

submitBtns.forEach((b) => {
  b.addEventListener("click", (e) => {
    loaderBackground.classList.add("loaderBackgroundOn");
  });
});
window.addEventListener("unload", function () {
  loaderBackground.classList.remove("loaderBackgroundOn");
});
