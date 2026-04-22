document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle-btn");
  const hamburger = document.getElementById("hamburger");
  const xMark = document.getElementById("x-mark");
  const mobileNav = document.getElementById("mobile-nav");

  if (
    toggleBtn !== null &&
    hamburger !== null &&
    xMark !== null &&
    mobileNav !== null
  ) {
    toggleBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
      hamburger.classList.toggle("hidden");
      xMark.classList.toggle("hidden");
    });
  }
});
