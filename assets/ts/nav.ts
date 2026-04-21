document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle-btn");
  const mobileNav = document.getElementById("mobile-nav");

  if (toggleBtn !== null && mobileNav !== null) {
    toggleBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });
  }
});
