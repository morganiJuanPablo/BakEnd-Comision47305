//
const submitBtns = document.querySelectorAll(".submitBtns");
console.log(submitBtns)
const loaderBackground = document.querySelector(".loaderBackground");

submitBtns.forEach((b) => {
  b.addEventListener("click", () => {
    loaderBackground.classList.add("loaderBackgroundOn");
  });
});
window.addEventListener("unload", function () {
  loaderBackground.classList.remove("loaderBackgroundOn");
});