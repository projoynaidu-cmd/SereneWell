// Dark mode persistence
const root = document.documentElement;
const modeToggle = document.getElementById("modeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");
const stored = localStorage.getItem("theme");

if (
  stored === "dark" ||
  (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  root.classList.add("dark");
  sunIcon.classList.remove("hidden");
  moonIcon.classList.add("hidden");
}

modeToggle.addEventListener("click", () => {
  root.classList.toggle("dark");
  const isDark = root.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  sunIcon.classList.toggle("hidden", !isDark);
  moonIcon.classList.toggle("hidden", isDark);
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");
menuBtn.addEventListener("click", () => {
  const isOpen =
    mobileNav.style.maxHeight && mobileNav.style.maxHeight !== "0px";
  mobileNav.style.maxHeight = isOpen ? "0px" : mobileNav.scrollHeight + "px";
});

// Navbar background on scroll
const navbar = document.getElementById("navbar");
const updateNav = () => {
  if (window.scrollY > 8) {
    navbar.className =
      "fixed top-0 inset-x-0 z-50 transition-all bg-white/90 dark:bg-gray-900/80 backdrop-blur border-b border-gray-100 dark:border-gray-800";
  } else {
    navbar.className = "fixed top-0 inset-x-0 z-50 transition-all";
  }
};
updateNav();
window.addEventListener("scroll", updateNav, { passive: true });

// Reveal on scroll
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    targetElement.scrollIntoView({ behavior: "smooth" });
  });
});