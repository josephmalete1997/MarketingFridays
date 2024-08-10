const menu = document.querySelector(".mobile-menu img");
const closeMenu = document.querySelector(".close-menu");

menu.addEventListener("click", () => {
  document.querySelector("header").style.display = "flex";
  document.querySelector(".mobile-menu").style.display = "none";
  document.body.style.overflowY = "hidden";
});

closeMenu.addEventListener("click", () => {
  document.querySelector("header").style.display = "none";
  document.querySelector(".mobile-menu").style.display = "flex";
  document.body.style.overflowY = "auto";
});
