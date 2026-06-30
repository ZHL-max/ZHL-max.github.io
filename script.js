const root = document.documentElement;
const progressBar = document.querySelector("#progress-bar");
const themeToggle = document.querySelector("#theme-toggle");
const siteNav = document.querySelector(".site-nav");
const categoryToggles = Array.from(document.querySelectorAll(".category-toggle"));

function safeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    // Storage can be unavailable in privacy-restricted contexts.
  }
}

function setTheme(theme) {
  root.dataset.theme = theme;

  if (!themeToggle) {
    return;
  }

  const dark = theme === "dark";
  themeToggle.textContent = dark ? "日间" : "夜间";
  themeToggle.setAttribute("aria-pressed", String(dark));
  safeSet("zhl-theme", theme);
}

function getInitialTheme() {
  const savedTheme = safeGet("zhl-theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return "light";
}

function updateProgress() {
  if (!progressBar) {
    return;
  }

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

function updateNav() {
  if (!siteNav) {
    return;
  }

  siteNav.classList.toggle("scrolled", window.scrollY > 24);
}

setTheme(getInitialTheme());

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });
}

categoryToggles.forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest(".category-group");
    if (!group) {
      return;
    }

    const expanded = !group.classList.contains("expanded");
    group.classList.toggle("expanded", expanded);
    button.setAttribute("aria-expanded", String(expanded));

    const icon = button.querySelector("span");
    if (icon) {
      icon.textContent = expanded ? "⌄" : "›";
    }
  });
});

window.addEventListener("scroll", () => {
  updateProgress();
  updateNav();
}, { passive: true });

window.addEventListener("resize", updateProgress);
updateProgress();
updateNav();
