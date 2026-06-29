const root = document.documentElement;
const progressBar = document.querySelector("#progress-bar");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");
const themeToggle = document.querySelector("#theme-toggle");
const typingText = document.querySelector("#typing-text");
const searchInput = document.querySelector("#post-search");
const filters = Array.from(document.querySelectorAll(".filter"));
const cards = Array.from(document.querySelectorAll(".post-card"));
const emptyState = document.querySelector("#empty-state");
const navLinks = Array.from(document.querySelectorAll(".nav-menu a"));

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
  const dark = theme === "dark";
  themeToggle.textContent = dark ? "日间" : "夜间";
  themeToggle.setAttribute("aria-pressed", String(dark));
  safeSet("zhl-theme", theme);
}

const savedTheme = safeGet("zhl-theme");
if (savedTheme === "dark" || savedTheme === "light") {
  setTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  setTheme("dark");
} else {
  setTheme("light");
}

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

navToggle.addEventListener("click", () => {
  const open = !navMenu.classList.contains("open");
  navMenu.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

function updateProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

function updateActiveNav() {
  const fromTop = window.scrollY + 120;
  let activeId = "posts";
  document.querySelectorAll("main section[id]").forEach((section) => {
    if (section.offsetTop <= fromTop) {
      activeId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
  });
}

function filterPosts() {
  const active = document.querySelector(".filter.active").dataset.filter;
  const query = searchInput.value.trim().toLowerCase();
  let count = 0;

  cards.forEach((card) => {
    const categoryMatch = active === "all" || card.dataset.category === active;
    const haystack = `${card.dataset.title} ${card.dataset.summary} ${card.textContent}`.toLowerCase();
    const searchMatch = !query || haystack.includes(query);
    const visible = categoryMatch && searchMatch;
    card.hidden = !visible;
    if (visible) count += 1;
  });

  emptyState.hidden = count !== 0;
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle("active", active);
      candidate.setAttribute("aria-pressed", String(active));
    });
    filterPosts();
  });
});

searchInput.addEventListener("input", filterPosts);

function typeSubtitle() {
  const text = typingText.dataset.text || "";
  let index = 0;
  const timer = window.setInterval(() => {
    typingText.textContent = `${text.slice(0, index)}${index < text.length ? "_" : ""}`;
    index += 1;
    if (index > text.length) {
      window.clearInterval(timer);
      typingText.textContent = text;
    }
  }, 70);
}

window.addEventListener("scroll", () => {
  updateProgress();
  updateActiveNav();
}, { passive: true });

window.addEventListener("resize", updateProgress);

typeSubtitle();
filterPosts();
updateProgress();
updateActiveNav();
