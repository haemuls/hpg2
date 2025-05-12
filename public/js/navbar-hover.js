document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      link.classList.add("hover-underline");
    });

    link.addEventListener("mouseleave", () => {
      link.classList.remove("hover-underline");
    });
  });
});