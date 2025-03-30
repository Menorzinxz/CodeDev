document.addEventListener("DOMContentLoaded", function () {
  // ==================== TOGGLE DE TEMA ====================
  const themeToggle = document.getElementById("themeToggle");
  const themeLabel = document.getElementById("themeLabel");
  const body = document.body;
  const sunIcon = document.querySelector(".sun-icon");
  const moonIcon = document.querySelector(".moon-icon");

  /* ==================== Verifica e aplica a preferência de tema salva ou do sistema ==================== */
  function checkThemePreference() {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  }

  /* ==================== Ativa o modo escuro ==================== */
  function enableDarkMode() {
    body.classList.add("dark-mode");
    themeLabel.textContent = "Modo Escuro";
    sunIcon.style.opacity = "1";
    moonIcon.style.opacity = "0";
    localStorage.setItem("theme", "dark");
  }

  /* ==================== Desativa o modo escuro ==================== */
  function disableDarkMode() {
    body.classList.remove("dark-mode");
    themeLabel.textContent = "Modo Claro";
    sunIcon.style.opacity = "0";
    moonIcon.style.opacity = "1";
    localStorage.setItem("theme", "light");
  }

  // ==================== Evento de clique no toggle de tema ====================
  themeToggle.addEventListener("click", function () {
    if (body.classList.contains("dark-mode")) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });

  // ==================== INICIALIZAÇÃO ====================
  checkThemePreference();
});
