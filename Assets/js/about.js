document.querySelectorAll(".card-item").forEach(container => {
  const image = container.querySelector(".card-image");
  window.addEventListener("load", () => {
    image.classList.add("start-spin");
    setTimeout(() => image.classList.remove("start-spin"), 1200);
  });
});
